import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UnprocessableEntityException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ValidateParamsPipe } from 'src/utils/paramsValidation.pipe';

@Controller('categories')
@UsePipes(new ValidationPipe({ transform: true }))
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  async findAllCategories() {
    return await this.categoriesService.findAllCategories();
  }

  @Get(':id')
  async findCategory(@Param('id', new ValidateParamsPipe()) id: string) {
    const result = await this.categoriesService.findCategory(id);
    if (!result) {
      throw new NotFoundException('Category not found');
    }
    return result;
  }

  @Post()
  async insertCategory(@Body() createCategoryDto: CreateCategoryDto) {
    const { name } = createCategoryDto;
    const isExists = await this.categoriesService.findNameOfCategory(name);
    if (isExists) {
      throw new UnprocessableEntityException('Name already exists');
    }
    return await this.categoriesService.insertCategory(createCategoryDto);
  }

  @Patch(':id')
  async updateCategory(
    @Param('id', new ValidateParamsPipe()) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const { parents } = updateCategoryDto;
    const isExists = await this.categoriesService.findCategory(id);
    if (!isExists) {
      throw new NotFoundException('Category not found');
    }
    if (Object.keys(updateCategoryDto).length === 0) {
      throw new UnprocessableEntityException('Invalid data');
    }
    if (!parents) {
      if (parents === '') {
        updateCategoryDto.parents = null;
      } else {
        updateCategoryDto.parents = isExists.parents
          ? isExists.parents.toString()
          : null;
      }
    }
    return await this.categoriesService.updateCategory({
      id,
      updateCategoryDto,
    });
  }

  @Delete(':id')
  async deleteCategory(@Param('id', new ValidateParamsPipe()) id: string) {
    const isExists = await this.categoriesService.findCategory(id);
    if (!isExists) {
      throw new NotFoundException('Category not found');
    }
    return await this.categoriesService.deleteCategory(id);
  }
}
