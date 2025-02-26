/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BSvcService } from './b-svc.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { LoginDto } from './common/dto/login.dto';
import { RegisterDto } from './common/dto/register.dto';
import { MessageResponse } from './common/type/message.response.type';
import { UserResponse } from './common/type/user.response.type';
import { JwtGuard } from '../jwt-guard/jwt.guard';
import { MessageResponseWithTokens } from './common/type/message.response.with.tokens.type';

@Controller('b-svc')
export class BSvcController {
  constructor(private readonly bSvcService: BSvcService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<RegisterResponse> {
    console.log('hit register B-svc controller.');
    return await this.bSvcService.register(registerDto);
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res() res: Response,
  ): Promise<Response<MessageResponseWithTokens>> {
    console.log('hit login B-svc controller.');
    const tokens = await this.bSvcService.login(loginDto);

    const { accessToken, refreshToken } = tokens;

    console.log('hit auth controller- access token :', accessToken);
    console.log('hit auth controller- refresh_token :', refreshToken);

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3 * 60 * 1000,
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.send({ message: 'Login successful', tokens });
    // return { message: 'Login successful' };
  }

  @Post('logout')
  @UseGuards(JwtGuard)
  logout(@Req() req: Request, @Res() res: Response): MessageResponse {
    // ) {
    const refreshToken = req.cookies['refresh_token'];
    // const decodedRefreshToken = await this.authService.validateRefreshToken(refreshToken);

    // const logoutData = { email: decodedRefreshToken.email, userId: decodedRefreshToken.sub };
    this.bSvcService.logout(refreshToken);
    res.cookie('access_token', '', { expires: new Date(0) });
    res.cookie('refresh_token', '', { expires: new Date(0) });
    // return res.send({ message: 'Logout successful' });
    return { message: 'Logout successful' };
  }

  @Get()
  async findAll(): Promise<[UserResponse]> {
    const result = await this.bSvcService.findAll();
    return result;
  }
}
