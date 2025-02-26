import { Injectable } from '@nestjs/common';
import { AbstractRepository } from './abstract.repository';
import { InjectModel } from '@nestjs/mongoose';
import { LogError, LogErrorDocument } from '../models/log.error.model';
import { Model } from 'mongoose';

@Injectable()
export class LogErrorRepository extends AbstractRepository<LogErrorDocument> {
  constructor(
    @InjectModel(LogError.name) logErrorModel: Model<LogErrorDocument>,
  ) {
    super(logErrorModel);
  }
}
