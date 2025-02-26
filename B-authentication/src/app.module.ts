import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { DSvcModule } from './d-svc/d-svc.module';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule, ConfigModule, DSvcModule],

  controllers: [],
  providers: [],
})
export class AppModule {}
