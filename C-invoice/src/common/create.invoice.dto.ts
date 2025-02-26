import { IsNotEmpty } from '@nestjs/class-validator';

export class CreateInvoiceDto {
    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    products: number[];
}
