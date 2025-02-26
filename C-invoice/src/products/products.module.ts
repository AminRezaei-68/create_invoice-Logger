import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepository } from 'src/prisma/repositories/products.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    controllers: [ProductsController],
    providers: [ProductsService, ProductsRepository, PrismaService],
})
export class ProductsModule {}
