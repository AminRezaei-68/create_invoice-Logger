/*
import { Module } from '@nestjs/common';
import { DSvcModule } from './d-svc/d-svc.module';
import { CSvcModule } from './c-svc/c-svc.module';
import { BSvcModule } from './b-svc/b-svc.module';
import { JwtGuard } from './common/guards/jwt.guard';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtGuardModule } from './jwt-guard/jwt-guard.module';
import { JwtGuardModule } from './jwt-guard/jwt-guard.module';
import { JwtGuardModule } from './jwt-guard/jwt-guard.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

*/

// /*

import { Module } from '@nestjs/common';
import { DSvcModule } from './d-svc/d-svc.module';
import { CSvcModule } from './c-svc/c-svc.module';
import { BSvcModule } from './b-svc/b-svc.module';
import { JwtGuard } from './jwt-guard/jwt.guard';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtGuardModule } from './jwt-guard/jwt-guard.module';

@Module({
  imports: [
    DSvcModule,
    CSvcModule,
    BSvcModule,
    ClientsModule.register([
      {
        name: 'MICRO_B',
        transport: Transport.TCP,
        options: { port: 5555 },
      },
    ]),
    JwtGuardModule,
  ],
  controllers: [],
  providers: [JwtGuard],
})
export class AppModule {}

//  */

/*

@Module({
  imports: [
    ConfigModule.forRoot(),
    DSvcModule,
    CSvcModule,
    BSvcModule,
    ClientsModule.registerAsync([
      {
        name: 'MICRO_B',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('ADMIN_AUTH_SVC_TCP_HOST'),
            port: configService.get<number>('ADMIN_AUTH_SVC_TCP_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [],
  providers: [
    {
      // provide: 'MICRO_B',
      provide: 'CLIENT_PROXY',

      useExisting: 'MICRO_B',
    },
    // {
    //   provide: 'CLIENT_PROXY',
    //   useFactory: (client: ClientProxy) => {
    //     return client;
    //   },
    //   inject: ['MICRO_B'],
    // },
    JwtGuard,
  ],
  exports: ['CLIENT_PROXY'],
})
export class AppModule {}

*/
