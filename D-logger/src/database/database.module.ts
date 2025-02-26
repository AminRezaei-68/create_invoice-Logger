import { Module } from '@nestjs/common';
import { LogRepository } from './repositories/log.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Log, LogSchema } from './models/log.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }])],
  controllers: [],
  providers: [LogRepository],
  exports: [LogRepository],
})
export class DatabaseModule {}
