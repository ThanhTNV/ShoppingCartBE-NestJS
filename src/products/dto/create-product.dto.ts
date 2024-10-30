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
  @IsNotEmpty({ message: 'category_id must not be empty' })
  @IsArray({ message: 'category_id must be an array of strings' })
  @Matches(/^[0-9a-fA-F]{24}$/, { each: true, message: 'category_id is invalid' })
  category_id: string[];

  @IsNotEmpty({ message: 'model must not be empty' })
  @IsString({ message: 'model is invalid' })
  model: string;

  @IsNotEmpty({ message: 'description must not be empty' })
  @IsString({ message: 'description is invalid' })
  description: string;
}

export class CreateProductInstanceDto {
  @IsNotEmpty({ message: 'product_id must not be empty' })
  @IsString({ message: 'product_id is invalid' })
  product_id: string;

  @IsNotEmpty({ message: 'name must not be empty' })
  @IsString({ message: 'name is invalid' })
  name: string;

  @IsNotEmpty({ message: 'price must not be empty' })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'price is invalid. 2 digits max after decimal point' },
  )
  price: number;

  @IsNotEmpty({ message: 'color must not be empty' })
  @IsString({ message: 'color is invalid' })
  color: string;

  @IsNotEmpty({ message: 'stock must not be empty' })
  @IsNumber(
    { maxDecimalPlaces: 0 },
    { message: 'stock is invalid. Stock must be an integer' },
  )
  stock: number;
}
