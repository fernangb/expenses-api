import { BadRequestException, Injectable } from '@nestjs/common';
import BCryptHashProvider from 'src/infra/providers/hash/bcrypt/bcrypt-hash.provider';
import { UserService } from '../users/user.service';
import { CreateSessionDto } from './dto/create-session.dto';
import authConfig from 'src/config/auth';
import { sign } from 'jsonwebtoken';
import { UserOutput } from '../users/dto/user-output';
import { SessionOutput } from './dto/session-output';

@Injectable()
export class SessionService {
  constructor(
    private userService: UserService,
    private hashProvider: BCryptHashProvider,
  ) {}

  async create(createSessionDto: CreateSessionDto) {
    const findUser = await this.userService.findByEmail(createSessionDto.email);

    if (!findUser)
      throw new BadRequestException('Email or password is invalid');

    const passwordIsValid = await this.hashProvider.compareHash(
      createSessionDto.password,
      findUser.password,
    );

    if (!passwordIsValid)
      throw new BadRequestException('Email or password is invalid');

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: findUser.id,
      expiresIn,
    });

    const userOutput = new UserOutput({
      id: findUser.id,
      name: findUser.name,
      email: findUser.email,
    });

    return new SessionOutput({
      user: userOutput,
      token,
    });
  }
}
