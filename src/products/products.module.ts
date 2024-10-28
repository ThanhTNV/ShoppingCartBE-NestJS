import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { GuardModule } from 'src/common/guards/guard.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    GuardModule,
    JwtModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    DatabaseModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
