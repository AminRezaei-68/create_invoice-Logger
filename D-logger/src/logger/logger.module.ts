import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerService } from './logger.service';
import { LoggerController } from './logger.controller';
import { Log, LogSchema } from 'src/database/models/log.model';
import { LogRepository } from 'src/database/repositories/log.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }])],
  providers: [LoggerService, LogRepository],
  controllers: [LoggerController],
  exports: [LoggerService],
})
export class LoggerModule {}
