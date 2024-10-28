import { Injectable } from '@nestjs/common';
import { RegisterReqBody } from './models/users.requests';
import { User } from 'src/database/models/schemas/users.schemas';
import { DatabaseService } from 'src/database/database.service';
import { CryptoService } from 'src/utils/crypto.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    private databaseService: DatabaseService,
    private cryptoService: CryptoService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  private async generateTokens(user: { _id: string }) {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(
        { sub: user._id },
        {
          expiresIn: this.configService.get<string>('ACCESS_TOKEN_EXPIRES_IN'),
          algorithm: 'HS256',
          secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
        },
      ),
      this.jwtService.signAsync(
        { sub: user._id },
        {
          expiresIn: this.configService.get<string>('REFRESH_TOKEN_EXPIRES_IN'),
          algorithm: 'HS256',
          secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
        },
      ),
    ]);

    return { access_token, refresh_token };
  }

  async login(payload: { email: string; password: string }) {
    const { email, password } = payload;
    const passwordHash = await this.cryptoService.hashPassword(password);
    const result = await this.databaseService.users.findOne({ email });
    if (!result || result.password !== passwordHash) {
      return null;
    }

    const { access_token, refresh_token } = await this.generateTokens({
      _id: result._id.toString(),
    });

    return { access_token, refresh_token };
  }

  async register(payload: RegisterReqBody) {
    const result = await this.databaseService.users.insertOne(
      new User({
        ...payload,
        date_of_birth: new Date(payload.date_of_birth),
        password: await this.cryptoService.hashPassword(payload.password),
      }),
    );

    const { access_token, refresh_token } = await this.generateTokens({
      _id: result.insertedId.toString(),
    });

    return { access_token, refresh_token };
  }

  async checkEmailExists(email: string) {
    const user = await this.databaseService.users.findOne({ email });
    return Boolean(user);
  }
}
