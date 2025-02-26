/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokensRepository } from '../../../prisma/repositories/tokens.repository';
import { TokensResponse } from '../types/tokens.response.type';

@Injectable()
export class JwtUtil {
  constructor(
    readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly tokensRepository: TokensRepository,
  ) {}

  async createTokens(payload: CreateToken): Promise<TokensResponse> {
    // const { id, email } = data;
    // const payload = { sub: id, email: email };
    console.log('Hit auth service in jwtutil.');

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '3m',
      secret: this.configService.get('JWT_SECRET_ACCESS_TOKEN'),
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
      secret: this.configService.get('JWT_SECRET_REFRESH_TOKEN'),
    });

    const saveData = { id: payload.id, token: refreshToken };
    console.log('Data before save at token repository:', saveData);
    const savedData = await this.tokensRepository.saveToken(saveData);

    console.log('in jwt util, create token:', savedData);

    console.log('after save in repository, access token:', accessToken);
    console.log('after save in repository, refresh token:', refreshToken);

    return { newAccessToken: accessToken, newRefreshToken: refreshToken };
  }

  async validateTokens(tokens: TokensType) {
    console.log('hit validateTokens1:', tokens);

    const { accessToken, refreshToken } = tokens;

    console.log('hit validateTokens2 accessToken:', accessToken);
    console.log('hit validateTokens2 refreshToken:', refreshToken);

    const decodedAccessToken = await this.validateAccessToken(accessToken);
    const decodedRefreshToken = await this.validateRefreshToken(refreshToken);

    // const decodedAccessToken = await this.jwtService.verifyAsync(accessToken, {
    //   secret: this.configService.get('JWT_SECRET_ACCESS_TOKEN'),
    // });
    // const decodedRefreshToken = await this.jwtService.verifyAsync(
    //   refreshToken,
    //   {
    //     secret: this.configService.get('JWT_SECRET_REFRESH_TOKEN'),
    //   },
    // );

    if (decodedAccessToken && decodedRefreshToken) {
      console.log('Access Token does not expired go ahead.');

      if (decodedAccessToken.id !== decodedRefreshToken.id) {
        throw new UnauthorizedException('Credential failed.');
      }
    }
    // if (decodedRefreshToken) {
    //   console.log('Refresh Token does not expired.');
    //   console.log('decode refresh token:', decodedRefreshToken);
    //   console.log('refresh token:', refreshToken);
    //   const databaseRefrshToken = await this.tokensRepository.findOne(
    //     decodedRefreshToken.id,
    //   );

    //   console.log('database refresh token:', databaseRefrshToken);

    //   if (!databaseRefrshToken || refreshToken !== databaseRefrshToken.token) {
    //     console.log('data base refresh token is not valid.');
    //     throw new UnauthorizedException('Invalid Refresh Token.');
    //   }

    //   console.log('decode refresh token was sent.');
    //   return decodedRefreshToken;
    // }
    return decodedRefreshToken;
  }

  //   async validateAccessToken(token: string): Promise<DecodeToken> {
  async validateAccessToken(token: string): Promise<any> {
    try {
      const validToken = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET_ACCESS_TOKEN'),
      });
      return validToken;
    } catch (error) {
      console.log('error', error);
    }
  }

  async validateRefreshToken(
    refreshToken: string,
    //   ): Promise<DecodeToken> {
  ): Promise<any> {
    // const decodedRefreshToken = await this.validateToken(refreshToken);
    try {
      const decodedRefreshToken = await this.jwtService.verifyAsync(
        refreshToken,
        {
          secret: this.configService.get('JWT_SECRET_REFRESH_TOKEN'),
        },
      );

      if (decodedRefreshToken) {
        console.log('Refresh Token does not expired.');
        console.log('decode refresh token:', decodedRefreshToken);
        console.log('refresh token:', refreshToken);
        const databaseRefrshToken = await this.tokensRepository.findOne(
          decodedRefreshToken.id,
        );

        console.log('database refresh token:', databaseRefrshToken);

        if (
          !databaseRefrshToken ||
          refreshToken !== databaseRefrshToken.token
        ) {
          console.log('data base refresh token is not valid.');
          throw new UnauthorizedException('Invalid Refresh Token.');
        }

        console.log('decode refresh token was sent.');
        return decodedRefreshToken;
      }
    } catch (error) {
      // throw new BadRequestException('You should login again.');
      throw error;
    }
  }

  // private async validateRefreshToken(
  //   refreshToken: string,
  //   // ): Promise<DecodeToken> {
  // ): Promise<any> {
  //   try {
  //     const validToken = await this.jwtService.verifyAsync(refreshToken, {
  //       secret: this.configService.get('JWT_SECRET_REFRESH_TOKEN'),
  //     });
  //     console.log('in validate refresh token: ', validToken);
  //     return validToken;
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // }
}
