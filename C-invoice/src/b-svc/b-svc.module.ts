import { Module } from '@nestjs/common';
import { BSvcService } from './b-svc.service';
import { BSvcController } from './b-svc.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'user_queue',
                transport: Transport.RMQ,
                options: {
                    queue: 'auth_queue',
                    urls: ['amqp://localhost:5672'],
                    queueOptions: { durable: false },
                },
            },
        ]),
    ],
    controllers: [BSvcController],
    providers: [BSvcService],
})
export class BSvcModule {}
