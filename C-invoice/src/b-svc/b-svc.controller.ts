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

    // @MessagePattern('findAllBSvc')
    // findAll() {
    //     return this.bSvcService.findAll();
    // }

    // @MessagePattern('findOneBSvc')
    // findOne(@Payload() id: number) {
    //     return this.bSvcService.findOne(id);
    // }

    // @MessagePattern('updateBSvc')
    // update(@Payload() updateBSvcDto: UpdateBSvcDto) {
    //     return this.bSvcService.update(updateBSvcDto.id, updateBSvcDto);
    // }

    // @MessagePattern('removeBSvc')
    // remove(@Payload() id: number) {
    //     return this.bSvcService.remove(id);
    // }
}
