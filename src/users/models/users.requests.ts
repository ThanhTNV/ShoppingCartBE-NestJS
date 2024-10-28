import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  IsISO8601,
} from 'class-validator';
import { Match } from 'src/decorators/match.decorator';

export class RegisterReqBody {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

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

  @Match('password', { message: 'confirm password does not match password' })
  confirm_password: string;

  @IsISO8601()
  @IsNotEmpty()
  date_of_birth: string;
}

export class LoginReqBody {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
