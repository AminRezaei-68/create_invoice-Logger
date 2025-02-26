/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common';
import { DSvcModule } from '../d-svc/d-svc.module';
import { CSvcModule } from '../c-svc/c-svc.module';
import { BSvcModule } from '../b-svc/b-svc.module';
import { JwtGuard } from '../jwt-guard/jwt.guard';
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
  controllers: [],
  providers: [JwtGuard],
  exports: [ClientsModule],
})
export class JwtGuardModule {}
