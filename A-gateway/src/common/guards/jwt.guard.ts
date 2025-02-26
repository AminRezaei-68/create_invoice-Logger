// /* eslint-disable no-useless-catch */
// /* eslint-disable @typescript-eslint/no-unsafe-call */
// /* eslint-disable @typescript-eslint/no-unsafe-member-access */
// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
// import {
//   CanActivate,
//   ExecutionContext,
//   Inject,
//   Injectable,
//   InternalServerErrorException,
// } from '@nestjs/common';
// import { ClientProxy } from '@nestjs/microservices';
// import { firstValueFrom } from 'rxjs';

// @Injectable()
// export class JwtGuard implements CanActivate {
//   constructor(@Inject('MICRO_B') private readonly clientB: ClientProxy) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest();

//     try {
//       console.log('hit the jwt guard.');
//       const accessToken = request.cookies['access_token'];
//       const refreshToken = request.cookies['refresh_token'];

//       const tokens = [accessToken, refreshToken];
//       console.log('in jwt guard:', tokens);

//       const newTokens = await firstValueFrom(
//         this.clientB.send({ cmd: 'validateTokens' }, tokens),
//       );

//       console.log('new tokens:', newTokens);

//       const { newAccessToken, newRefreshToken } = newTokens;

//       if (!newAccessToken || !newRefreshToken) {
//         throw new InternalServerErrorException('Somethings went wrong.');
//       }

//       request.res.cookie('access_token', newAccessToken, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         maxAge: 1 * 60 * 1000,
//       });

//       request.res.cookie('refresh_token', newRefreshToken, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         maxAge: 7 * 24 * 60 * 60 * 1000,
//       });

//       return true;
//     } catch (error) {
//       throw error;
//     }
//   }
// }
