/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
// import { Controller, Get, Post, Query } from '@nestjs/common';

import { DSvcService } from './d-svc.service';
// import { PaginationQueryDto } from './common/dto/pagination_query.dto';
// import { query } from 'express';
// import { JwtGuard } from 'src/common/guards/jwt.guard';
import { UserResponse } from './common/dto/user.response.type';
import { InvoiceResponse } from 'src/c-svc/common/dto/type/invoice.response.type';
import { JwtGuard } from 'src/jwt-guard/jwt.guard';

@Controller('d-svc')
export class DSvcController {
  constructor(private readonly dSvcService: DSvcService) {}

  // @Post('getReport')
  // createLog(): Promise<InvoiceResponse> {
  //   const response = this.dSvcService.createReport();
  //   return response;
  // }

  @Get('find')
  @UseGuards(JwtGuard)
  getUser(
    @Query('action') query: string,
    @Query('limit')
    limit: string,
  ): Promise<UserResponse> {
    // console.log('Hit d controller in A MICRO');
    // console.log('the data is: ', query);
    const data = { limit: limit, action: query };
    const users = this.dSvcService.findByField(data);
    return users;
  }
}
