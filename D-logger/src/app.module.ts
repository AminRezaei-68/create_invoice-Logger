import { Module } from '@nestjs/common';
import { LoggerController } from './logger/logger.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from './logger/logger.module';
import { ASvcModule } from './a-svc/a-svc.module';
// import { LogRepository } from './database/repositories/log.repository';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
    ASvcModule,
    DatabaseModule,
  ],
  controllers: [LoggerController],
  providers: [],
})
export class AppModule {}
