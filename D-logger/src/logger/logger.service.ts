/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { LogRepository } from 'src/database/repositories/log.repository';

@Injectable()
export class LoggerService {
  constructor(private readonly logRepository: LogRepository) {}

  // async saveLog(data: {
  //   name: string;
  //   id: string;
  //   action: string;
  // }): Promise<void> {
  async saveLog(data: any) {
    const dataToSave = {
      service_name: data.svName,
      action: data.action,
      issuer_id: data.userId,
    };
    console.log('in logger service data:', dataToSave);
    await this.logRepository.create({ ...dataToSave });
  }
}
