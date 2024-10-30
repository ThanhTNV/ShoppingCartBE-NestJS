import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @ApiProperty({
    required: false,
    name: 'name',
    description: 'Name of the category',
    example: 'Category Name',
    type: 'string',
  })
  @IsString({ message: 'name is invalid' })
  name: string;

  @ApiProperty({
    required: false,
    name: 'description',
    description: 'Description of the category',
    example: 'Category Description',
    type: 'string',
  })
  @IsString({ message: 'description is invalid' })
  description: string;

  @ApiProperty({
    required: false,
    name: 'parents',
    description: 'Parents of the category',
    example: 'Parents',
    type: 'string',
  })
  @IsString({ message: 'parents is invalid' })
  parents: string;
}
