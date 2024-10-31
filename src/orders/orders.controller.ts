import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import {
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ValidateParamsPipe } from 'src/utils/paramsValidation.pipe';
import { ValidateQueryPipe } from 'src/utils/querysValidation.pipe';
import { CreateOrderDto, CreateOrderItemDto } from './dto/create-order.dto';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';
import { Order } from 'src/database/models/schemas/orders.schemas';

@Controller('orders')
@ApiTags('Orders')
@UsePipes(new ValidationPipe())
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
  ) {}

  @Get()
  @ApiQuery({
    required: false,
    name: 'user_id',
    example: '60f1c9e6e2e4e6f9b6f0d5d6',
    description: 'User ID of the user who made the order',
  })
  @ApiResponse({ status: 200, description: 'Get orders successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 422, description: 'Invalid input' })
  async findAll(@Query('user_id', new ValidateQueryPipe()) user_id?: string) {
    if (user_id) {
      const isExists = await this.usersService.checkUserExists(user_id);
      if (!isExists) {
        throw new NotFoundException('User not found');
      }
      return await this.ordersService.getOrdersOfUser(user_id);
    }
    return await this.ordersService.getOrders();
  }

  @Get(':id')
  @ApiParam({
    required: true,
    name: 'id',
    example: '60f1c9e6e2e4e6f9b6f0d5d6',
    description: 'Order ID',
    type: String,
  })
  @ApiQuery({
    required: false,
    name: 'product_item_id',
    example: '60f1c9e6e2e4e6f9b6f0d5d6',
    description: 'Order Item ID',
    type: String,
  })
  @ApiResponse({ status: 200, description: 'Get order successfully' })
  @ApiResponse({ status: 404, description: 'Order or OrderItem not found' })
  @ApiResponse({ status: 422, description: 'Invalid input' })
  async findOne(
    @Param('id', new ValidateParamsPipe()) id: string,
    @Query('product_item_id', new ValidateQueryPipe()) product_item_id?: string,
  ) {
    const order = await this.ordersService.getOrder(id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    if (!product_item_id) {
      const product_items = await this.ordersService.getOrderItems(id);
      return { ...order, product_items };
    }
    const product_item = await this.ordersService.getOrderItem(product_item_id);
    if (!product_item) {
      throw new NotFoundException('Order Item not found');
    }
    return { ...order, product_item };
  }

  @Post()
  @ApiBody({
    type: CreateOrderDto,
    description: 'Order Data',
    required: true,
  })
  @ApiResponse({ status: 201, description: 'Order created' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 422, description: 'Invalid input' })
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    const { user_id } = createOrderDto;
    const isExists = await this.usersService.checkUserExists(user_id);
    if (!isExists) {
      throw new NotFoundException('User not found');
    }
    return await this.ordersService.createOrder(createOrderDto);
  }

  @Post('items')
  @ApiBody({
    required: true,
    type: [CreateOrderItemDto],
    description: 'Order Item Data',
  })
  @ApiResponse({ status: 201, description: 'Order Item created' })
  @ApiResponse({ status: 404, description: 'Order/Product not found' })
  @ApiResponse({ status: 422, description: 'Invalid input' })
  async createOrderItem(@Body() createOrderItemDto: CreateOrderItemDto[]) {
    const orders_id = createOrderItemDto.map((orderItem) => orderItem.order_id);
    const orders: Order[] = await Promise.all(
      orders_id.map((id) => this.ordersService.getOrder(id)),
    ); //Promise<WithId<Order>>
    const isNotExists = orders.some((order) => !order);
    if (isNotExists) {
      const order_id_not_exist = orders.find((order) => !order)._id.toString();
      throw new NotFoundException(
        `Order with ID ${order_id_not_exist} not found`,
      );
    }

    const products_id = createOrderItemDto.map(
      (orderItem) => orderItem.product_id,
    );
    const products = await Promise.all(
      products_id.map((id) => this.productsService.findProduct(id)),
    );
    const isNotExistsProduct = products.some((product) => !product);
    if (isNotExistsProduct) {
      const product_id_not_exist = products.find((product) => !product)._id;
      throw new NotFoundException(
        `Product with ID ${product_id_not_exist} not found`,
      );
    }
    return await this.ordersService.createOrderItems(createOrderItemDto);
  }
}
