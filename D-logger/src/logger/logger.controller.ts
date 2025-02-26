import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { LoggerService } from './logger.service';
import { MessageResponse } from './common/type/message.response.type';

@Controller()
export class LoggerController {
  constructor(private readonly loggerService: LoggerService) {}
  // @MessagePattern('log')
  // logHandler(@Payload() data: any) {
  //   console.log('in controller D:', data);
  //   return { message: 'its Done.' };
  // }

  @EventPattern('log')
  logHandler(@Payload() data: any): MessageResponse {
    console.log('in controller D:', data);
    this.loggerService.saveLog(data);
    return { message: 'its Done.' };
  }
}
