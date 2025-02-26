import { PartialType } from '@nestjs/mapped-types';
import { CreateBSvcDto } from './create-b-svc.dto';

export class UpdateBSvcDto extends PartialType(CreateBSvcDto) {
  id: number;
}
