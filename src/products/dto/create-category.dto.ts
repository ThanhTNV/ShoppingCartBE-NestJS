import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'name must not be empty' })
  @IsString({ message: 'name is invalid' })
  name: string;

  @IsNotEmpty({ message: 'description must not be empty' })
  @IsString({ message: 'description is invalid' })
  description: string;

  @IsString({ message: 'parents_id is invalid' })
  parents: string;
}
