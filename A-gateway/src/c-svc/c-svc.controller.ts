/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CSvcService } from './c-svc.service';
import { CreateInvoiceDto } from './common/dto/create.invoice.dto';
import { InvoiceResponse } from './common/dto/type/invoice.response.type';
import { firstValueFrom, Observable } from 'rxjs';
import { JwtGuard } from '../jwt-guard/jwt.guard';

@Controller('c-svc')
export class CSvcController {
  constructor(private readonly cSvcService: CSvcService) {}

  @Post('invoice')
  @UseGuards(JwtGuard)
  async createInvoice(
    @Body() createInvoiceDto: CreateInvoiceDto,
  ): Promise<InvoiceResponse> {
    const response = await firstValueFrom(
      this.cSvcService.sendMessage(createInvoiceDto),
    );
    return response;
  }
}
