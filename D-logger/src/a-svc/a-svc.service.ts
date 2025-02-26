/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from './dto/pagination_query.dto';
import { LogRepository } from 'src/database/repositories/log.repository';
import { ReportResponse } from './common/type/report.response.type';
// import { CreateASvcDto } from './dto/create-a-svc.dto';
// import { UpdateASvcDto } from './dto/update-a-svc.dto';

@Injectable()
export class ASvcService {
  constructor(private readonly logRepository: LogRepository) {}

  // create(createASvcDto: CreateASvcDto) {
  //   return 'This action adds a new aSvc';
  // }

  findByField(
    paginationQueryDto: PaginationQueryDto,
    action: string,
  ): Promise<ReportResponse[]> {
    console.log('Hit a service in D MICRO');
    console.log(action);
    return this.logRepository.findByField(paginationQueryDto, action);
  }
}

// findOne(id: number) {
//   return `This action returns a #${id} aSvc`;
// }
// update(id: number, updateASvcDto: UpdateASvcDto) {
//   return `This action updates a #${id} aSvc`;
// }
// remove(id: number) {
//   return `This action removes a #${id} aSvc`;
// }
// }
