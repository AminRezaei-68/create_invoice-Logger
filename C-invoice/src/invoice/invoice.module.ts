import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';
import { ProductsRepository } from 'src/prisma/repositories/products.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { BSvcService } from 'src/b-svc/b-svc.service';
import { ProductsService } from 'src/products/products.service';
import { InvoiceRepository } from 'src/prisma/repositories/invoices.repository';
import { DSvcService } from 'src/d-svc/d-svc.service';
import { DSvcModule } from 'src/d-svc/d-svc.module';

@Module({
    imports: [
        DSvcModule,
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
    controllers: [InvoiceController],
    providers: [InvoiceService, BSvcService, ProductsService, ProductsRepository, PrismaService, InvoiceRepository, DSvcService],
})
export class InvoiceModule {}
