/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import {
  Controller,
  /*
  Req,
  Body,
  Post,
  UseGuards,
  */
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { LoginDto } from './common/dtos/login.dto';
import { RegisterDto } from './common/dtos/register.dto';
import { TokensResponse } from './common/types/tokens.response.type';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'validateTokens' })
  async validateTokensHandler(
    @Payload() tokens: TokensType,
  ): Promise<TokensResponse> {
    // async validateTokensHandler(@Payload() tokens: any) {
    console.log('hit the validate tokens in B:');
    const newTokens = await this.authService.validateAndCreateTokens(tokens);
    // const newTokens = await this.authService.validateCreateTokens(tokens);

    console.log('token to return:', newTokens);
    return newTokens;
  }

  // @MessagePattern({ cmd: 'createTokens' })
  // async createTokensHandler(@Payload() userData: CreateToken) {
  //   const newTokens = await this.authService.validateTokens(userData);
  //   return newTokens;
  // }

  @MessagePattern({ cmd: 'login' })
  async loginHandler(@Payload() loginDto: LoginDto): Promise<TokensResponse> {
    console.log('Hit auth controller in B:');
    const newTokens = await this.authService.login(loginDto);

    // console.log('hit auth controller- access token :', accessToken);
    // console.log('hit auth controller- refresh_token :', refreshToken);

    // res.cookie('access_token', accessToken, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production',
    //   maxAge: 3 * 60 * 1000,
    // });

    // res.cookie('refresh_token', refreshToken, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production',
    //   maxAge: 7 * 24 * 60 * 60 * 1000,
    // });

    // return res.send({ message: 'Login successful' });
    console.log('tokens to retun in controller:', newTokens);
    return newTokens;
  }

  @EventPattern({ cmd: 'logout' })
  async logoutHandler(token: string): Promise<MessageResponse> {
    console.log('hit controller B, token:', token);

    await this.authService.logout(token);
    return { message: 'Logout successfully' };
  }

  @MessagePattern({ cmd: 'register' })
  async registerHandler(
    @Payload() registerDto: RegisterDto,
  ): Promise<RegisterResponse> {
    console.log('hit register Auth controller.');
    const response = await this.authService.register(registerDto);
    console.log('responce Auth controller.', response);
    return response;
  }

  @MessagePattern({ cmd: 'findAll' })
  async findAllHandler(@Payload() message: string): Promise<UserReponse[]> {
    const users = await this.authService.findAll(message);
    return users;
  }

  // @Post('register')
  // async register(@Body() registerDto: RegisterDto): Promise<RegisterResponse> {
  //   return this.authService.register(registerDto);
  // }

  // @Post('login')
  // async login(
  //   @Body() loginDto: LoginDto,
  //   @Res() res: Response,
  // ): Promise<Response<MessageResponse>> {
  //   const response = await this.authService.login(loginDto);

  //   const { accessToken, refreshToken } = response;

  //   console.log('hit auth controller- access token :', accessToken);
  //   console.log('hit auth controller- refresh_token :', refreshToken);

  //   res.cookie('access_token', accessToken, {
  //     httpOnly: true,
  //     secure: process.env.NODE_ENV === 'production',
  //     maxAge: 3 * 60 * 1000,
  //   });

  //   res.cookie('refresh_token', refreshToken, {
  //     httpOnly: true,
  //     secure: process.env.NODE_ENV === 'production',
  //     maxAge: 7 * 24 * 60 * 60 * 1000,
  //   });

  //   return res.send({ message: 'Login successful' });
  // }

  // @UseGuards(JwtGuard)
  // @Post('logout')
  // async logout(
  //   @Req() req: Request,
  //   @Res() res: Response,
  // ): Promise<Response<MessageResponse>> {
  //   const refreshToken = req.cookies['refresh_token'];
  //   // const decodedRefreshToken = await this.authService.validateRefreshToken(refreshToken);

  //   // const logoutData = { email: decodedRefreshToken.email, userId: decodedRefreshToken.sub };
  //   await this.authService.logout(refreshToken);
  //   res.cookie('access_token', '', { expires: new Date(0) });
  //   res.cookie('refresh_token', '', { expires: new Date(0) });
  //   return res.send({ message: 'Logout successful' });
  // }

  @Get('tokens')
  async getTokens(): Promise<RefreshToken[]> {
    return await this.authService.getAllTokens();
  }
}
