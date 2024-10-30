import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    required: true,
    name: 'name',
    description: 'Name of the category',
    example: 'Category Name',
    type: 'string',
  })
  @IsNotEmpty({ message: 'name must not be empty' })
  @IsString({ message: 'name is invalid' })
  name: string;

  @ApiProperty({
    required: true,
    name: 'description',
    description: 'Description of the category',
    example: 'Category Description',
    type: 'string',
  })
  @IsNotEmpty({ message: 'description must not be empty' })
  @IsString({ message: 'description is invalid' })
  description: string;

  @ApiProperty({
    required: false,
    name: 'parents',
    description: 'Parents of the category',
    example: 'Parents',
    type: 'string',
  })
  @IsOptional()
  @IsString({ message: 'parents_id is invalid' })
  parents: string;
}
