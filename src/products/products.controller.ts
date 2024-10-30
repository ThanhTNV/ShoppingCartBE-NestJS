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
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CategoriesService } from './categories.service';
import { Category } from 'src/database/models/schemas/categories.schemas';
import { ValidateParamsPipe } from 'src/utils/paramsValidation.pipe';

@Controller('products')
@UsePipes(new ValidationPipe({ transform: true }))
// @UseGuards(AuthGuard)
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService,
  ) {}

  @Get()
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
  async findOne(@Param('id', new ValidateParamsPipe()) id: string) {
    const result = await this.productsService.findProduct(id);
    if (!result) {
      throw new UnprocessableEntityException('Product not found');
    }
    const productInstances =
      await this.productsService.findAllProductInstances(id);
    return { ...result, productInstances };
  }

  @Post()
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

  @Patch(':id')
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
  remove(@Param('id') id: string) {
    throw new NotImplementedException('Method not implemented.');
  }
}
