import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  IsISO8601,
} from 'class-validator';
import { Match } from 'src/decorators/match.decorator';

export class RegisterReqBody {
  @ApiProperty({
    required: true,
    name: 'name',
    description: 'Name of the user',
    example: 'John Doe',
    type: 'string',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: true,
    name: 'email',
    description: 'Email of the user',
    example: 'abcxyz@example.co',
    type: 'string',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    required: true,
    name: 'password',
    description: 'Password of the user',
    example: 'Password@123',
    type: 'string',
  })
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'password requires at least 8 characters, 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
    },
  )
  password: string;

  @ApiProperty({
    required: true,
    name: 'confirm_password',
    description: 'Confirm Password of the user',
    example: 'Password@123',
    type: 'string',
  })
  @Match('password', { message: 'confirm password does not match password' })
  confirm_password: string;

  @ApiProperty({
    required: true,
    name: 'date_of_birth',
    description: 'Date of Birth of the user',
    example: '2000-01-01',
    type: 'string',
  })
  @IsISO8601()
  @IsNotEmpty()
  date_of_birth: string;
}

export class LoginReqBody {
  @ApiProperty({
    required: true,
    name: 'email',
    description: 'Email of the user',
    type: 'string',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    required: true,
    name: 'password',
    description: 'Password of the user',
    type: 'string',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
