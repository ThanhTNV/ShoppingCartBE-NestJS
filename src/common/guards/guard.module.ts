import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { AuthGuard } from "./auth.guard";

@Module({
    imports: [JwtModule, ConfigModule.forRoot({
        envFilePath: ['.env'],
    })],
    providers: [AuthGuard],
})

export class GuardModule {}