import { Inject, Injectable } from '@nestjs/common';
import { CreateDSvcDto } from './common/dto/create-d-svc.dto';
import { UpdateDSvcDto } from './common/dto/update-d-svc.dto';
import { ClientProxy } from '@nestjs/microservices';
import { UserResponse } from 'src/b-svc/common/type/user.response.type';

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
