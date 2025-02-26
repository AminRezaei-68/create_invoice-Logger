/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Inject, Injectable } from '@nestjs/common';
import { RegisterDto } from './common/dto/register.dto';
import { LoginDto } from './common/dto/login.dto';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { UserResponse } from './common/type/user.response.type';

@Injectable()
export class BSvcService {
  constructor(@Inject('MICRO_B') private readonly clientB: ClientProxy) {}

  register(registerDto: RegisterDto): Promise<RegisterResponse> {
    const pattern = { cmd: 'register' };
    console.log('hit register B-svc service.');

    const response = firstValueFrom(this.clientB.send(pattern, registerDto));
    console.log('hit register B-svc service.', response);

    return response;
  }

  login(loginDto: LoginDto): Promise<TokenResponse> {
    console.log('hit b-svc service.');
    const pattern = { cmd: 'login' };
    const tokens = firstValueFrom(this.clientB.send(pattern, loginDto));
    console.log('in micro A, tokens:', tokens);
    return tokens;
  }

  logout(refreshToken: string): void {
    console.log('hit b-svc service. token:', refreshToken);
    const pattern = { cmd: 'logout' };
    firstValueFrom(this.clientB.emit(pattern, refreshToken));
    console.log('it should sent.');
  }

  findAll(): Promise<[UserResponse]> {
    const pattern = { cmd: 'findAll' };
    console.log('hit register B-svc service.');

    const response = firstValueFrom(
      this.clientB.send(pattern, { message: 'get all' }),
    );
    return response;
  }
}
