import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { User } from '../../domain/users/entities/user.entity';
import BCryptHashProvider from '../../infra/providers/hash/bcrypt/bcrypt-hash.provider';
import InMemoryUserRepository from '../../infra/repositories/users/in-memory/in-memory-user.repository';
import { EmailAlreadyUsedException } from '../@shared/exceptions/email-already-used.exception';
import { CreateUserDto } from './dto/create-user.dto';
import { UserOutput } from './dto/user-output';

@Injectable()
export class UserService {
  constructor(
    @Inject(InMemoryUserRepository)
    private userRepository: InMemoryUserRepository,
    private hashProvider: BCryptHashProvider,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserOutput> {
    try {
      const foundUser = await this.findByEmail(createUserDto.email);

      if (foundUser) throw new EmailAlreadyUsedException();

      const hashedPassword = await this.hashProvider.createHash(
        createUserDto.password,
      );

      const user = new User({
        name: createUserDto.name,
        email: createUserDto.email,
        password: hashedPassword,
      });

      await this.userRepository.create(user);

      return new UserOutput({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string): Promise<UserOutput> {
    try {
      const user = await this.userRepository.findById(id);

      if (!user) return undefined;

      return new UserOutput({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findByEmail(email);
  }
}
