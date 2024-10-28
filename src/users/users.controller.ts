import { Body, Controller, Post, Res, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginReqBody, RegisterReqBody } from './models/users.requests';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('login')
  async login(
    @Body(new ValidationPipe()) body: LoginReqBody,
    @Res() res: Response,
  ) {
    const { email, password } = body;
    const user = await this.usersService.login({ email, password });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    return res.status(200).json(user);
  }

  @Post('register')
  async register(
    @Body(new ValidationPipe()) body: RegisterReqBody,
    @Res() res: Response,
  ) {
    const { password, confirm_password } = body;
    if (password !== confirm_password) {
      return res.status(422).json({ message: 'Password does not match' });
    }
    const { email } = body;
    const isExists = await this.usersService.checkEmailExists(email);
    if (isExists) {
      return res.status(422).json({ message: 'Email already exists' });
    }
    const userId = await this.usersService.register(body);
    return res.status(201).json({ userId });
  }
}
