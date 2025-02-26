/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './common/dtos/login.dto';
import * as bcrypt from 'bcrypt';
// import { ClientProxy } from '@nestjs/microservices';
import { TokensRepository } from 'src/prisma/repositories/tokens.repository';
import { UsersRepository } from 'src/prisma/repositories/users.repository';
import { JwtUtil } from './common/utilities/jwt.util';
import { RegisterDto } from './common/dtos/register.dto';
import { DSvcService } from 'src/d-svc/d-svc.service';
import { TokensResponse } from './common/types/tokens.response.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokensRepository: TokensRepository,
    private readonly usersRepository: UsersRepository,
    private readonly jwtUtil: JwtUtil,
    private readonly dSvcService: DSvcService,
    // @Inject('LOGGER_SERVICE') private readonly client: ClientProxy,
  ) {}

  svName = 'Auth';

  async login(loginDto: LoginDto): Promise<TokensResponse> {
    console.log('Hit auth service in B:');
    const { email, password } = loginDto;
    console.log('Hit auth service in B, email:', email);
    console.log('Hit auth service in B, pas:', password);

    const user = await this.usersRepository.findOne({ email });

    console.log('Hit auth service in B, user:', user);

    if (!user) {
      throw new NotFoundException('The user does not exist.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    console.log('Hit auth service in B, isPasswordValid:', isPasswordValid);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credential failed.');
    }

    const payload = { id: user.id, email: user.email };

    console.log('Hit auth service in B, payload:', payload);

    // const { newAccessToken, newRefreshToken } =
    //   await this.jwtUtil.createTokens(payload);

    const newTokens = await this.jwtUtil.createTokens(payload);

    // console.log('Hit auth service in B, refreshtoken:', newRefreshToken);

    const data = { userId: user.id, action: 'login', svName: this.svName };
    this.dSvcService.sendMessage(data);
    // console.log('data send to logger.');

    // return { accessToken, refreshToken };
    return newTokens;
  }

  async register(registerDto: RegisterDto): Promise<RegisterResponse> {
    try {
      const { email, password, confirmPassword, name, role } = registerDto;

      if (password !== confirmPassword) {
        throw new BadRequestException('Please enter the same password.');
      }

      const user = await this.usersRepository.findOne({ email });

      console.log('in auth service user:', user);

      if (user) {
        throw new BadRequestException(`The user with email ${email} is exist.`);
      }
      const hashedPassword = await this.hashPassword(password);
      const crateUserData = {
        email: email,
        password: hashedPassword,
        name: name,
        role: role,
      };
      const newUser = await this.usersRepository.create(crateUserData);

      // this.client.emit('log', { action: 'register', email });
      console.log('the user is created.');
      const returnUser = { id: newUser.id, email: newUser.email };

      const data = {
        userId: newUser.id,
        action: 'register',
        svName: this.svName,
      };
      this.dSvcService.sendMessage(data);

      return { message: 'You register successfully.', returnUser };
    } catch (error) {
      // throw new Error('Something wrong. The user does not create.');
      throw error;
    }
  }

  async logout(refreshToken: string): Promise<void> {
    console.log('hit B micro in service refresh:', refreshToken);
    const decodedRefreshToken =
      await this.jwtUtil.validateRefreshToken(refreshToken);
    const { id, email } = decodedRefreshToken;
    console.log(`The user with email : ${email} is logout.`);
    console.log('the id is: ', id);
    const deletedRefreshToken = await this.tokensRepository.deleteToken(id);
    console.log(`the "${deletedRefreshToken}" refresh token deleted.`);

    const data = {
      userId: decodedRefreshToken.id,
      action: 'logout',
      svName: this.svName,
    };
    this.dSvcService.sendMessage(data);
  }

  async findAll(message: string): Promise<UserReponse[]> {
    console.log('The message:', message);
    const result = await this.usersRepository.findAll();
    console.log('In auth service the result is:', result);
    return result;
  }

  async getAllTokens(): Promise<RefreshToken[]> {
    return this.tokensRepository.findAll();
  }

  async validateAndCreateTokens(tokens: TokensType): Promise<TokensResponse> {
    console.log('hit, tokens:', tokens);
    const decodedRefreshToken = await this.jwtUtil.validateTokens(tokens);
    console.log('decode refresh token:', decodedRefreshToken);
    const payload = {
      id: decodedRefreshToken.id,
      email: decodedRefreshToken.email,
    };
    const newTokens = await this.jwtUtil.createTokens(payload);
    console.log('token to return:', newTokens);
    return newTokens;
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}
