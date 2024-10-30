import { PartialType } from '@nestjs/mapped-types';
import {
  CreateProductDto,
  CreateProductInstanceDto,
} from './create-product.dto';
import { IsArray, IsNumber, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({
    required: false,
    name: 'category_id',
    description: 'Categories of the product',
    example: 'Product Name',
    type: [String],
  })
  @IsArray({ message: 'category_id must be an array of strings' })
  @Matches(/^[0-9a-fA-F]{24}$/, {
    each: true,
    message: 'category_id is invalid',
  })
  category_id: string[];

  @ApiProperty({
    required: false,
    name: 'model',
    description: 'Product Model',
    example: 'Product Model',
    type: 'string',
  })
  @IsString({ message: 'model is invalid' })
  model: string;

  @ApiProperty({
    required: false,
    name: 'description',
    description: 'Product Description',
    example: 'Product Description',
    type: 'string',
  })
  @IsString({ message: 'description is invalid' })
  description: string;
}

export class UpdateProductInstanceDto extends PartialType(
  CreateProductInstanceDto,
) {
  @ApiProperty({
    required: false,
    name: 'name',
    description: 'Product Name',
    example: 'Iphone 15 Pro Max',
    type: 'string',
  })
  @IsString({ message: 'Product name is invalid' })
  name: string;

  @ApiProperty({
    required: false,
    name: 'price',
    description: 'Product Price',
    example: 100,
    type: 'number',
  })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'price is invalid. 2 digits max after decimal point' },
  )
  price: number;

  @ApiProperty({
    required: false,
    name: 'color',
    description: 'Product Color',
    example: 'Red',
    type: 'string',
  })
  @IsString({ message: 'color is invalid' })
  color: string;

  @ApiProperty({
    required: false,
    name: 'stock',
    description: 'Product quantity',
    example: 100,
    type: 'number',
  })
  @IsNumber(
    { maxDecimalPlaces: 0 },
    { message: 'stock is invalid. Stock must be an integer' },
  )
  stock: number;
}
