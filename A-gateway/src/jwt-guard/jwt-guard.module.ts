import { Module } from '@nestjs/common';
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
