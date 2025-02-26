import { Module } from '@nestjs/common';
import { DSvcService } from './d-svc.service';
import { DSvcController } from './d-svc.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'send_to_logger',
        transport: Transport.RMQ,
        options: {
          queue: 'logger_queue',
          urls: ['amqp://localhost:5672'],
          queueOptions: { durable: false },
        },
      },
    ]),
  ],
  controllers: [DSvcController],
  providers: [DSvcService],
  exports: [DSvcService, ClientsModule],
})
export class DSvcModule {}
