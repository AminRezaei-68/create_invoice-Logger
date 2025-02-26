import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { BSvcModule } from './b-svc/b-svc.module';
import { DSvcModule } from './d-svc/d-svc.module';
import { InvoiceModule } from './invoice/invoice.module';
import { PrismaService } from './prisma/prisma.service';
import { BSvcService } from './b-svc/b-svc.service';
import { ProductsModule } from './products/products.module';

@Module({
    imports: [PrismaModule, BSvcModule, DSvcModule, InvoiceModule, ProductsModule],
    controllers: [],
    providers: [PrismaService],
})
export class AppModule {}
