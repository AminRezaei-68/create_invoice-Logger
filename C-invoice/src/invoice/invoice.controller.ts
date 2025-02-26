import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from 'src/common/create.invoice.dto';

@Controller('invoice')
export class InvoiceController {
    constructor(private readonly invoiceService: InvoiceService) {}
    @MessagePattern({ cmd: 'send_data' })
    async handler(createInvoiceDto: CreateInvoiceDto) {
        // console.log('im micro B data: ', data);
        const response = await this.invoiceService.createInvoice(createInvoiceDto);
        return response;
    }
}
