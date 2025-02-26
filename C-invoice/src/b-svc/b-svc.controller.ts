import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BSvcService } from './b-svc.service';
import { CreateBSvcDto } from './common/dto/create-b-svc.dto';
import { UpdateBSvcDto } from './common/dto/update-b-svc.dto';

@Controller()
export class BSvcController {
    constructor(private readonly bSvcService: BSvcService) {}

    @MessagePattern('createBSvc')
    create(@Payload() createBSvcDto: CreateBSvcDto) {
        return this.bSvcService.create(createBSvcDto);
    }
}
