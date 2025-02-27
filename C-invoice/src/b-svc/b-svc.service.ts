import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBSvcDto } from './common/dto/create-b-svc.dto';
import { UpdateBSvcDto } from './common/dto/update-b-svc.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { UserResponse } from './common/type/user.response.type';

@Injectable()
export class BSvcService {
    constructor(@Inject('user_queue') private readonly client: ClientProxy) {}
    create(createBSvcDto: CreateBSvcDto) {
        return 'This action adds a new bSvc';
    }

    async findUser(userId: number): Promise<UserResponse> {
        const pattern = { cmd: 'finding_user' };
        const data = { id: userId };
        const existUser = await firstValueFrom(this.client.send(pattern, data));

        if (!existUser) {
            throw new NotFoundException('The user not Found.');
        }

        console.log('the user:', existUser);

        return existUser;
    }
}
