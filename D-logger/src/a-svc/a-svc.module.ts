import { Module } from '@nestjs/common';
import { ASvcService } from './a-svc.service';
import { ASvcController } from './a-svc.controller';
// import { ClientsModule } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { Log, LogSchema } from 'src/database/models/log.model';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }]),
  ],
  controllers: [ASvcController],
  providers: [ASvcService],
})
export class ASvcModule {}
