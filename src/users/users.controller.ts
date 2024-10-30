import {
  Body,
  Controller,
  Post,
  Res,
  UnauthorizedException,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginReqBody, RegisterReqBody } from './models/users.requests';
import { Response } from 'express';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('login')
  @ApiBody({ type: LoginReqBody, description: 'Login Data' })
  @ApiResponse({ status: 200, description: 'User logged in' })
  @ApiResponse({ status: 401, description: 'Invalid email or password' })
  async login(@Body(new ValidationPipe()) body: LoginReqBody) {
    const { email, password } = body;
    const result = await this.usersService.login({ email, password });
    if (!result) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return result;
  }

  @Post('register')
  @ApiBody({ type: RegisterReqBody, description: 'Register Data' })
  @ApiResponse({ status: 201, description: 'User registered' })
  @ApiResponse({ status: 422, description: 'Invalid input' })
  async register(@Body(new ValidationPipe()) body: RegisterReqBody) {
    const { password, confirm_password } = body;
    if (password !== confirm_password) {
      throw new UnprocessableEntityException('Passwords do not match');
    }
    const { email } = body;
    const isExists = await this.usersService.checkEmailExists(email);
    if (isExists) {
      throw new UnprocessableEntityException('Email already exists');
    }
    const result = await this.usersService.register(body);
    return result;
  }
}
