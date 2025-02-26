import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProductsRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async create(data: any) {
        console.log(data);
        await this.prismaService.product.create(data);
    }

    async findAll() {
        return await this.prismaService.product.findMany();
    }

    async findSome(productIds: any) {
        return await this.prismaService.product.findMany({ where: { productId: { in: productIds } } });
    }

    //     async saveToken(data: SaveToken): Promise<RefreshToken> {
    //         const { id, token } = data;
    //         console.log('the id is:', id);
    //         console.log('the refresh token is:', token);

    //         return await this.prismaService.refreshToken.upsert({
    //             where: { userId: id },
    //             update: { token: token },
    //             create: { userId: id, token: token },
    //         });
    //     }

    //     async deleteToken(id: number): Promise<RefreshToken> {
    //         const deleteRefreshToken = await this.prismaService.refreshToken.delete({ where: { userId: id } });
    //         return deleteRefreshToken;
    //     }

    //     async findOne(id: number): Promise<RefreshToken> {
    //         return await this.prismaService.refreshToken.findUnique({ where: { userId: id } });
    //     }

    //     async findAll(): Promise<RefreshToken[]> {
    //         return await this.prismaService.refreshToken.findMany();
    //     }

    async findOne(id: number) {
        return await this.prismaService.product.findUnique({ where: { productId: id } });
    }
}
