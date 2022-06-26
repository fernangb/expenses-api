import { BadRequestException, Injectable } from '@nestjs/common';
import BCryptHashProvider from '../../infra/providers/hash/bcrypt/bcrypt-hash.provider';
import { UserService } from '../users/user.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UserOutput } from '../users/dto/user-output';
import { SessionOutput } from './dto/session-output';
import JSONWebTokenProvider from '../../infra/providers/token/jsonwebtoken/jsonwebtoken.provider';
import { InvalidLoginCredentialsException } from '../@shared/exceptions/invalid-login-credentials.exception';

@Injectable()
export class SessionService {
  constructor(
    private userService: UserService,
    private hashProvider: BCryptHashProvider,
    private tokenProvider: JSONWebTokenProvider,
  ) {}

  async create(createSessionDto: CreateSessionDto): Promise<SessionOutput> {
    const findUser = await this.userService.findByEmail(createSessionDto.email);

    if (!findUser) throw new InvalidLoginCredentialsException();

    const passwordIsValid = await this.hashProvider.compareHash(
      createSessionDto.password,
      findUser.password,
    );

    if (!passwordIsValid) throw new InvalidLoginCredentialsException();

    const token = this.tokenProvider.createToken(findUser.id);

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
