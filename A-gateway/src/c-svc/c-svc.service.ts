/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateInvoiceDto } from './common/dto/create.invoice.dto';
import { Observable } from 'rxjs';
import { InvoiceResponse } from './common/dto/type/invoice.response.type';

@Injectable()
export class CSvcService {
  constructor(@Inject('MICRO_C') private readonly clientC: ClientProxy) {}

  sendMessage(createInvoiceDto: CreateInvoiceDto): Observable<InvoiceResponse> {
    // console.log('in micro A data: ', data);
    console.log('in c-svc service data is :', createInvoiceDto);
    const pattern = { cmd: 'send_data' };
    const response = this.clientC.send(pattern, createInvoiceDto);
    return response;
  }
}
