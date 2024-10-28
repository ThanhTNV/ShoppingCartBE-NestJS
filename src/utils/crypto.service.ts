import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CryptoService {
  constructor(private configService: ConfigService) {}
  private async sha256(content: string) {
    const res = await crypto.subtle.digest(
      'SHA-256',
      new TextEncoder().encode(content),
    );
    return Array.from(new Uint8Array(res))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }

  async hashPassword(password: string) {
    return this.sha256(
      password + this.configService.get<string>('PASSWORD_SECRET'),
    );
  }
}
