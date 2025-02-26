import { BadRequestException, Injectable } from '@nestjs/common';
// import { ClientProxy } from '@nestjs/microservices';
// import { firstValueFrom } from 'rxjs';
import { BSvcService } from 'src/b-svc/b-svc.service';
import { CreateInvoiceDto } from 'src/common/create.invoice.dto';
import { DSvcService } from 'src/d-svc/d-svc.service';
import { InvoiceRepository } from 'src/prisma/repositories/invoices.repository';
// import { ProductsRepository } from 'src/prisma/repositories/products.repository';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class InvoiceService {
    constructor(
        private readonly bSvcService: BSvcService,
        private readonly invoiceRepository: InvoiceRepository,
        private readonly productsService: ProductsService,
        private readonly dSvcService: DSvcService,
    ) {}
    async createInvoice(createInvoiceDto: CreateInvoiceDto) {
        console.log('message:', createInvoiceDto);

        const { userId, products } = createInvoiceDto;

        console.log('in invoice service the userid is: ', userId);
        console.log('in invoice service the productIds is: ', products);

        const existUser = await this.bSvcService.findUser(userId);

        console.log('in invoice service :', existUser);

        if (!existUser) {
            throw new BadRequestException('Operation not allowed.');
        }

        const newProducts = await this.productsService.validateProduct(products);

        console.log('in invoice service products:', products);

        if (!newProducts) {
            throw new BadRequestException('You should select valid products.');
        }

        // const newProducts = await this.productsService.findSome(products);

        // const totalAmount = await this.productsService.calculateTotalPrice(products);
        const totalAmount = newProducts.reduce((sum, product) => sum + product.price, 0);

        console.log('in totalAmount:', totalAmount);

        const data = { totalAmount: totalAmount, userId: userId, products: newProducts };

        console.log('in invoice service data to send is:', data);

        const invoice = await this.invoiceRepository.create(data);
        this.dSvcService.sendMessage(data.userId);

        return { message: 'Your invoice created.', invoice };
    }
}
