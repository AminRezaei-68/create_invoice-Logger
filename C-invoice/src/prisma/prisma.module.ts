/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { InvoiceRepository } from './repositories/invoices.repository';
import { ProductsRepository } from './repositories/products.repository';

@Module({
    providers: [PrismaService, InvoiceRepository, ProductsRepository],
    exports: [PrismaService, InvoiceRepository, ProductsRepository],
})
export class PrismaModule {}
