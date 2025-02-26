import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class DSvcService {
    constructor(@Inject('send_to_logger') private readonly client: ClientProxy) {}

    sendMessage(userId: number): void {
        const data = { userId: userId, action: 'create_invoice', svName: 'invoice' };
        // const pattern = { cmd: 'log' };
        this.client.emit('log', data);
        console.log('hit dsvc in c micro, data:', data);
    }
}
