/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(private readonly usersServive: UsersService) {}

  // @Get('find_by_email')
  // findByEmail(@Query('email') email: string) {
  //     console.log('in user controller email is:', email);
  //     return this.usersServive.findByEmail(email);
  // }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserReponse> {
    const nummericalId = parseInt(id);
    return this.usersServive.findOne(nummericalId);
  }

  @Get()
  findAll(): Promise<UserReponse[]> {
    return this.usersServive.findAll();
  }

  @MessagePattern({ cmd: 'finding_user' })
  findUser(@Payload() data: { id: number }): Promise<UserReponse> {
    const { id } = data;
    console.log('in b micro:', data);
    console.log('id is:', id);
    return this.usersServive.findUser(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
  //     return this.usersServive.update(id, updateUserDto);
  // }
}
