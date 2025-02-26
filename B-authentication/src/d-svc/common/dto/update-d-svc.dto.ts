import { PartialType } from '@nestjs/mapped-types';
import { CreateDSvcDto } from './create-d-svc.dto';

export class UpdateDSvcDto extends PartialType(CreateDSvcDto) {
  id: number;
}
