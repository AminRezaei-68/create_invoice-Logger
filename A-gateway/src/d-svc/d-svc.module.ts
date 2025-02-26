/* eslint-disable @typescript-eslint/no-unused-vars */
// import { forwardRef, Module } from '@nestjs/common';
import { DSvcService } from './d-svc.service';
import { DSvcController } from './d-svc.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { forwardRef, Module } from '@nestjs/common';
import { JwtGuardModule } from 'src/jwt-guard/jwt-guard.module';
import { JwtGuard } from 'src/jwt-guard/jwt.guard';
// import { JwtGuardModule } from '../jwt-guard/jwt-guard.module';
// import { JwtGuard } from 'src/common/guards/jwt.guard';

@Module({
  imports: [
    // ClientsModule.register([
    //   {
    //     name: 'MICRO_B',
    //     transport: Transport.TCP,
    //     options: { port: 5555 },
    //   },
    // ]),
    JwtGuardModule,
    ClientsModule.register([
      {
        name: 'logger',
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
  providers: [DSvcService, ClientsModule],
  exports: [ClientsModule],
})
export class DSvcModule {}
