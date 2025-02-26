/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ASvcService } from './a-svc.service';
import { ReportResponse } from './common/type/report.response.type';
// import { PaginationQueryDto } from './dto/pagination_query.dto';
// import { CreateASvcDto } from './dto/create-a-svc.dto';
// import { UpdateASvcDto } from './dto/update-a-svc.dto';

@Controller()
export class ASvcController {
  constructor(private readonly aSvcService: ASvcService) {}

  @MessagePattern('find')
  findLoginUser(@Payload() data): Promise<ReportResponse[]> {
    // findLoginUser(paginationQueryDto: PaginationQueryDto, action: string) {
    // const { PaginationQueryDto, action } = data;
    console.log(data);
    const { limit, action } = data;
    console.log('Hit a controller in D MICRO');
    console.log('action in D:', action);
    return this.aSvcService.findByField(limit, action);
  }
  // @MessagePattern('createASvc')
  // create(@Payload() createASvcDto: CreateASvcDto) {
  //   return this.aSvcService.create(createASvcDto);
  // }

  // @MessagePattern('findOneASvc')
  // findOne(@Payload() id: number) {
  //   return this.aSvcService.findOne(id);
  // }

  // @MessagePattern('updateASvc')
  // update(@Payload() updateASvcDto: UpdateASvcDto) {
  //   return this.aSvcService.update(updateASvcDto.id, updateASvcDto);
  // }

  // @MessagePattern('removeASvc')
  // remove(@Payload() id: number) {
  //   return this.aSvcService.remove(id);
  // }
}
