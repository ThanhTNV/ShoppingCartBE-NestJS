import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    required: true,
    name: 'category_id',
    description: 'Categories of the product',
    example: ['60f8d7f3b6f5b3001f9a1e8d'],
    type: 'array',
  })
  @IsNotEmpty({ message: 'category_id must not be empty' })
  @IsArray({ message: 'category_id must be an array of strings' })
  @Matches(/^[0-9a-fA-F]{24}$/, { each: true, message: 'category_id is invalid' })
  category_id: string[];

  @ApiProperty({
    required: true,
    name: 'model',
    description: 'Product Model',
    example: 'Product Model',
    type: 'string',
  })
  @IsNotEmpty({ message: 'model must not be empty' })
  @IsString({ message: 'model is invalid' })
  model: string;

  @ApiProperty({
    required: true,
    name: 'description',
    description: 'Product Description',
    example: 'Product Description',
    type: 'string',
  })
  @IsNotEmpty({ message: 'description must not be empty' })
  @IsString({ message: 'description is invalid' })
  description: string;
}

export class CreateProductInstanceDto {
  @ApiProperty({
    required: true,
    name: 'product_id',
    description: 'Product ID',
    example: '60f8d7f3b6f5b3001f9a1e8d',
    type: 'string',
  })
  @IsNotEmpty({ message: 'product_id must not be empty' })
  @IsString({ message: 'product_id is invalid' })
  product_id: string;

  @ApiProperty({
    required: true,
    name: 'name',
    description: 'Name of the product',
    example: 'Product Name',
    type: 'string',
  })
  @IsNotEmpty({ message: 'name must not be empty' })
  @IsString({ message: 'name is invalid' })
  name: string;

  @ApiProperty({
    required: true,
    name: 'price',
    description: 'Price of the product',
    example: 100.0,
    type: 'number',
  })
  @IsNotEmpty({ message: 'price must not be empty' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'price is invalid. 2 digits max after decimal point' },
  )
  price: number;

  @ApiProperty({
    required: true,
    name: 'color',
    description: 'Color of the product',
    example: 'Product Color',
    type: 'string',
  })
  @IsNotEmpty({ message: 'color must not be empty' })
  @IsString({ message: 'color is invalid' })
  color: string;

  @ApiProperty({
    required: true,
    name: 'stock',
    description: 'Product quantity',
    example: 100,
    type: 'number',
  })
  @IsNotEmpty({ message: 'stock must not be empty' })
  @IsNumber(
    { maxDecimalPlaces: 0 },
    { message: 'stock is invalid. Stock must be an integer' },
  )
  stock: number;
}
