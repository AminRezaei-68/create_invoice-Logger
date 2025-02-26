/* eslint-disable @typescript-eslint/no-unused-vars */
import { forwardRef, Module } from '@nestjs/common';
import { BSvcService } from './b-svc.service';
import { BSvcController } from './b-svc.controller';
import { JwtGuard } from 'src/jwt-guard/jwt.guard';
import { JwtGuardModule } from 'src/jwt-guard/jwt-guard.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    JwtGuardModule,
    // ClientsModule.register([
    //   {
    //     name: 'MICRO_B',
    //     transport: Transport.TCP,
    //     options: { port: 5555 },
    //   },
    // ]),
  ],
  controllers: [BSvcController],
  providers: [BSvcService],
})
export class BSvcModule {}
