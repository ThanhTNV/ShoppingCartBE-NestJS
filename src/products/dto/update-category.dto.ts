import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { IsString } from 'class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @IsString({ message: 'name is invalid' })
  name: string;

  @IsString({ message: 'description is invalid' })
  description: string;

  @IsString({ message: 'parents is invalid' })
  parents: string;
}
