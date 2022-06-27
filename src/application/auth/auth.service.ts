import { Injectable } from '@nestjs/common';
import BCryptHashProvider from '../../infra/providers/hash/bcrypt/bcrypt-hash.provider';
import { UserService } from '../users/user.service';
import { UserOutput } from '../users/dto/user-output';
import JSONWebTokenProvider from '../../infra/providers/token/jsonwebtoken/jsonwebtoken.provider';
import { InvalidLoginCredentialsException } from '../@shared/exceptions/invalid-login-credentials.exception';
import { LoginOutput } from './dto/login-output.dto';
import { LoginInputDto } from './dto/login-input.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private hashProvider: BCryptHashProvider,
    private tokenProvider: JSONWebTokenProvider,
  ) {}

  async login(loginDto: LoginInputDto): Promise<LoginOutput> {
    const findUser = await this.userService.findByEmail(loginDto.email);

    if (!findUser) throw new InvalidLoginCredentialsException();

    const passwordIsValid = await this.hashProvider.compareHash(
      loginDto.password,
      findUser.password,
    );

    if (!passwordIsValid) throw new InvalidLoginCredentialsException();

    const token = this.tokenProvider.createToken(findUser.id);

    const userOutput = new UserOutput({
      id: findUser.id,
      name: findUser.name,
      email: findUser.email,
    });

    return new LoginOutput({
      user: userOutput,
      token,
    });
  }

  async validateToken(token: string): Promise<boolean> {
    return this.tokenProvider.validateToken({ token });
  }
}
