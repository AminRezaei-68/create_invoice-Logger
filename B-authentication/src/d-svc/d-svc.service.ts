/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
// import { CreateDSvcDto } from './common/dto/create-d-svc.dto';
// import { UpdateDSvcDto } from './common/dto/update-d-svc.dto';

@Injectable()
export class DSvcService {
  constructor(@Inject('send_to_logger') private readonly client: ClientProxy) {}

  sendMessage(data: any): void {
    console.log('in b service dsvc', data);
    this.client.emit('log', data);
  }
}
