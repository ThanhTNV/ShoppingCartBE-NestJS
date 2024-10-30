import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UnprocessableEntityException,
  ValidationPipe,
  NotImplementedException,
  UsePipes,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  CreateProductDto,
  CreateProductInstanceDto,
} from './dto/create-product.dto';
import {
  UpdateProductDto,
  UpdateProductInstanceDto,
} from './dto/update-product.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CategoriesService } from './categories.service';
import { Category } from 'src/database/models/schemas/categories.schemas';
import { ValidateParamsPipe } from 'src/utils/paramsValidation.pipe';
import { ApiBody, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { ValidateQueryPipe } from 'src/utils/querysValidation.pipe';
import { ProductInstance } from 'src/database/models/schemas/products.schemas';

@Controller('products')
@UsePipes(new ValidationPipe({ transform: true }))
// @UseGuards(AuthGuard)
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService,
  ) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Products found' })
  async findAll() {
    const products = await this.productsService.findAllProducts();
    const products_id = products.map(({ _id }) => _id.toString());
    const productInstances = await Promise.all(
      products_id.map((id) => this.productsService.findAllProductInstances(id)),
    );
    return products.map((product, index) => ({
      ...product,
      productInstances: productInstances[index],
    }));
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Product ID(MongoDB ObjectId)',
  })
  @ApiQuery({
    name: 'product_instance_id',
    required: false,
    type: String,
    description: 'Product Instance ID(MongoDB ObjectId)',
  })
  @ApiResponse({ status: 200, description: 'Product found' })
  @ApiResponse({ status: 422, description: 'Invalid input' })
  async findOne(
    @Param('id', new ValidateParamsPipe()) id: string,
    @Query('product_instance_id', new ValidateQueryPipe())
    product_instance_id?: string,
  ) {
    const product = await this.productsService.findProduct(id);
    if (!product) {
      throw new UnprocessableEntityException('Product not found');
    }
    if (!product_instance_id) {
      const productInstances =
        await this.productsService.findAllProductInstances(id);
      return { ...product, productInstances };
    } else {
      const productInstance = await this.productsService.findProductInstance({
        product_id: id,
        _id: product_instance_id,
      });
      if (!productInstance) {
        throw new UnprocessableEntityException('Product not found');
      }
      return productInstance;
    }
  }

  @Post()
  @ApiBody({ type: CreateProductDto, description: 'Product Data' })
  @ApiResponse({ status: 201, description: 'Product created' })
  @ApiResponse({ status: 422, description: 'Invalid input' })
  async create(
    @Body()
    createProductDto: CreateProductDto,
  ) {
    const { model, category_id } = createProductDto;
    const isExists = await this.productsService.findModelOfProduct(model);
    if (isExists) {
      throw new UnprocessableEntityException('Model already exists');
    }
    const Categories: Category[] = await Promise.all(
      category_id.map((id) => this.categoriesService.findCategory(id)),
    );
    const isNotExists = Categories.some((category) => !category);
    if (isNotExists) {
      throw new UnprocessableEntityException('Category not found');
    }
    return await this.productsService.insertProduct(createProductDto);
  }

  @Post(':id')
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Product ID(MongoDB ObjectId)',
  })
  @ApiBody({
    type: CreateProductInstanceDto,
    description: 'Product Instance Data',
  })
  async createItem(
    @Param('id', new ValidateParamsPipe()) id: string,
    @Body('productInstance') productInstance: CreateProductInstanceDto,
  ) {
    const isExists = await this.productsService.findProduct(id);
    if (!isExists) {
      throw new UnprocessableEntityException('Product not found');
    }
    const isExistsInstance =
      await this.productsService.findExistProductInstance({
        product_id: id,
        productInstance,
      });
    if (isExistsInstance) {
      throw new UnprocessableEntityException('Product Instance already exists');
    }
    const result = await this.productsService.insertProductInstance({
      product_id: id,
      productInstance: productInstance,
    });
    return result;
  }

  @Patch('instance/:id')
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Product Instance ID(MongoDB ObjectId)',
  })
  @ApiBody({
    type: UpdateProductInstanceDto,
    description: 'Product Instance Data',
  })
  @ApiResponse({ status: 200, description: 'Product updated' })
  @ApiResponse({ status: 422, description: 'Invalid input' })
  async updateItem(
    @Param('id', new ValidateParamsPipe()) product_instance_id: string,
    @Body() updateProductInstanceDto: UpdateProductInstanceDto,
  ) {
    const isExists = await this.productsService.findProductInstance({
      _id: product_instance_id,
    });
    if (!isExists) {
      throw new NotFoundException('Product not found');
    }
    if (Object.keys(updateProductInstanceDto).length === 0) {
      throw new UnprocessableEntityException('Invalid data');
    }
    return await this.productsService.updateProductInstance({
      id: product_instance_id,
      updateProductInstanceDto,
    });
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Product ID(MongoDB ObjectId)',
  })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({ status: 200, description: 'Product updated' })
  @ApiResponse({ status: 422, description: 'Invalid input' })
  async update(
    @Param('id', new ValidateParamsPipe()) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const { category_id } = updateProductDto;
    const isExists = await this.productsService.findProduct(id);
    if (!isExists) {
      throw new NotFoundException('Product not found');
    }
    if (Object.keys(updateProductDto).length === 0) {
      throw new UnprocessableEntityException('Invalid data');
    }
    if (category_id) {
      const Categories: Category[] = await Promise.all(
        category_id.map((id) => this.categoriesService.findCategory(id)),
      );
      const isNotExists = Categories.some((category) => !category);
      if (isNotExists) {
        throw new UnprocessableEntityException('Category not found');
      }
    } else {
      updateProductDto.category_id = isExists.category_id.map((id) =>
        id.toString(),
      );
    }
    return await this.productsService.updateProduct({ id, updateProductDto });
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Product ID(MongoDB ObjectId)',
  })
  remove(@Param('id') id: string) {
    throw new NotImplementedException('Method not implemented.');
  }
}
