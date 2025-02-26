import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { create } from 'domain';
import { connect } from 'http2';

@Injectable()
export class InvoiceRepository {
    constructor(private prismaService: PrismaService) {}

    // async findAll(): Promise<UserReponse[]> {
    //     return this.prismaService.user.findMany();
    // }

    async create(data: any) {
        console.log('in invoice repository data:', data);

        const invoice = {
            status: 'Paid',
            userId: data.userId,
            totalAmount: data.totalAmount,
            products: { create: data.products.map((product) => ({ product: { connect: { productId: product.productId } } })) },
        };
        console.log('finall invoice:', invoice);

        return this.prismaService.invoice.create({ data: invoice });
    }
}
