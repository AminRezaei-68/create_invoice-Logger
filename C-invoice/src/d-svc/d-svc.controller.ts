import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DSvcService } from './d-svc.service';
import { CreateDSvcDto } from './common/dto/create-d-svc.dto';
import { UpdateDSvcDto } from './common/dto/update-d-svc.dto';

@Controller()
export class DSvcController {
    constructor(private readonly dSvcService: DSvcService) {}
}
