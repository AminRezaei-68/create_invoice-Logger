import { Controller } from '@nestjs/common';
// import { MessagePattern, Payload } from '@nestjs/microservices';
import { DSvcService } from './d-svc.service';
// import { CreateDSvcDto } from './common/dto/create-d-svc.dto';
// import { UpdateDSvcDto } from './common/dto/update-d-svc.dto';

@Controller()
export class DSvcController {
  constructor(private readonly dSvcService: DSvcService) {}

  // @MessagePattern('createDSvc')
  // create(@Payload() createDSvcDto: CreateDSvcDto) {
  //   return this.dSvcService.create(createDSvcDto);
  // }

  // @MessagePattern('findAllDSvc')
  //   findAll() {
  //     return this.dSvcService.findAll();
  //   }

  //   @MessagePattern('findOneDSvc')
  //   findOne(@Payload() id: number) {
  //     return this.dSvcService.findOne(id);
  //   }

  //   @MessagePattern('updateDSvc')
  //   update(@Payload() updateDSvcDto: UpdateDSvcDto) {
  //     return this.dSvcService.update(updateDSvcDto.id, updateDSvcDto);
  //   }

  //   @MessagePattern('removeDSvc')
  //   remove(@Payload() id: number) {
  //     return this.dSvcService.remove(id);
  // }
}
