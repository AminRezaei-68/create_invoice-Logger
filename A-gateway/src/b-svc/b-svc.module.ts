import { Module } from '@nestjs/common';
import { BSvcService } from './b-svc.service';
import { BSvcController } from './b-svc.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MICRO_B',
        transport: Transport.TCP,
        options: { port: 5555 },
      },
    ]),
  ],
  controllers: [BSvcController],
  providers: [BSvcService],
})
export class BSvcModule {}
