import { PartialType } from '@nestjs/mapped-types';
import {
  CreateProductDto,
  CreateProductInstanceDto,
} from './create-product.dto';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsArray({ message: 'category_id must be an array of strings' })
  @Matches(/^[0-9a-fA-F]{24}$/, {
    each: true,
    message: 'category_id is invalid',
  })
  category_id: string[];

  @IsString({ message: 'model is invalid' })
  model: string;

  @IsString({ message: 'description is invalid' })
  description: string;
}

export class UpdateProductInstanceDto extends PartialType(
  CreateProductInstanceDto,
) {
  @IsString({ message: 'product_id is invalid' })
  name: string;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'price is invalid. 2 digits max after decimal point' },
  )
  price: number;

  @IsString({ message: 'color is invalid' })
  color: string;

  @IsNumber(
    { maxDecimalPlaces: 0 },
    { message: 'stock is invalid. Stock must be an integer' },
  )
  stock: number;
}
