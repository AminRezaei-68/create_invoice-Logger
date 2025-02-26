import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductsRepository } from 'src/prisma/repositories/products.repository';
import { ProductsResponse } from './common/type/products.response.type';
import { UserResponse } from 'src/b-svc/common/type/user.response.type';

@Injectable()
export class ProductsService {
    constructor(private readonly productsRepository: ProductsRepository) {}

    async validateProduct(products: number[]): Promise<ProductsResponse[]> {
        console.log('hit validate Product');
        const productEntities = await Promise.all(products.map((productId) => this.productsRepository.findOne(productId)));

        productEntities.forEach((product) => {
            console.log('product is:', product);
            if (!product) {
                throw new BadRequestException('Product Not found.');
            }

            if (!product.isAvailable || product.stock === 0) {
                throw new BadRequestException('Please select in stock products.');
            }
        });

        const newProducts = await this.productsRepository.findSome(products);

        return newProducts;
    }

    // async calculateTotalPrice(productIds: number[]): Promise<number> {
    //     let totalAmount = 0;

    //     for (const productId of productIds) {
    //         const product = await this.productsRepository.findOne(productId);
    //         if (!product) {
    //             throw new BadRequestException('Product Not found.');
    //         }
    //         console.log('in calculate sum method, product:', product);
    //         console.log('in calculate sum method, totalAmont before sum:', product);

    //         totalAmount += product?.price;
    //     }
    //     return totalAmount;
    // }

    // async calculateTotalPrice(products: any): Promise<number> {
    //     // for (const productId of productIds) {
    //     //     const product = await this.productsRepository.findOne(productId);
    //     //     if (!product) {
    //     //         throw new BadRequestException('Product Not found.');
    //     //     }
    //     //     console.log('in calculate sum method, product:', product);
    //     //     console.log('in calculate sum method, totalAmont before sum:', product);

    //     //     totalAmount += product?.price;
    //     // }

    //     const totalAmount = products.reduce((sum, product) => sum + product.price, 0);
    //     return totalAmount;
    // }

    async create(data: any): Promise<void> {
        await this.productsRepository.create(data);
    }

    async findAll(): Promise<ProductsResponse[]> {
        return await this.productsRepository.findAll();
    }

    // async findSome(productIds: any) {
    //     return await this.productsRepository.findSome(productIds);
    // }

    // async calculateTotalPrice(productIds: number[]): Promise<number> {
    //     const products = await this.productsRepository.findOne({
    //         productId: In(productIds),
    //     });

    //     if (products.length !== productIds.length) {
    //         throw new BadRequestException('One or more products not found.');
    //     }

    //     const totalPrice = products.reduce((sum, product) => sum + product.price, 0);

    //     return totalPrice;
    // }
}
