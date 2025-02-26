/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { AbstractRepository } from './abstract.repository';
import { Log, LogDocument } from '../models/log.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationQueryDto } from 'src/a-svc/dto/pagination_query.dto';

@Injectable()
export class LogRepository extends AbstractRepository<LogDocument> {
  constructor(@InjectModel(Log.name) private logModel: Model<LogDocument>) {
    super(logModel);
  }

  async findByField(paginationQueryDto: PaginationQueryDto, action: string) {
    console.log('in log repository', action);
    const { limit = 10 } = paginationQueryDto;

    const result = await this.logModel.aggregate([
      { $match: { action: action } },
      { $limit: limit },
    ]);
    return result;
  }
}
