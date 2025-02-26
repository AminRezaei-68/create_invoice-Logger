/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { UserResponse } from './common/dto/user.response.type';
import { InvoiceResponse } from 'src/c-svc/common/dto/type/invoice.response.type';
import { FindWithFeild } from './common/dto/find.with.field.type';

@Injectable()
export class DSvcService {
  constructor(@Inject('logger') private readonly RabbitClient: ClientProxy) {}

  // createReport(): Promise<InvoiceResponse> {
  //   const pattern = { cmd: 'log' };
  //   const data = { message: 'message recived in D micro.' };
  //   console.log('in gateway service.');
  //   const response = firstValueFrom(this.RabbitClient.send(pattern, data));
  //   return response;
  // }

  findByField(data: FindWithFeild): Promise<UserResponse> {
    console.log('Hit d service in A MICRO');
    console.log('in A befor send to D:', data);
    const users = firstValueFrom(this.RabbitClient.send('find', data));
    return users;
  }
}
