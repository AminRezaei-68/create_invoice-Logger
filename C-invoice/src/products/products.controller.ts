import { Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    create() {
        return this.productsService.create({ data: { name: 'labtop', description: 'asus', price: 900, stock: 10, isAvailable: true } });
    }

    @Get()
    findAll() {
        return this.productsService.findAll();
    }
}
