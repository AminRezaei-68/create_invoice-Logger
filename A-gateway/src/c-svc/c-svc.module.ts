import { CSvcService } from './c-svc.service';
import { CSvcController } from './c-svc.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
// import { JwtGuardModule } from 'src/jwt-guard/jwt-guard.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MICRO_B',
        transport: Transport.TCP,
        options: { port: 5555 },
      },
    ]),
    ClientsModule.register([
      { name: 'MICRO_C', transport: Transport.TCP, options: { port: 5557 } },
    ]),
  ],
  controllers: [CSvcController],
  providers: [CSvcService],
})
export class CSvcModule {}
