import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { User } from 'src/domain/users/user.entity';
import InMemoryUserRepository from 'src/infra/repositories/users/in-memory/in-memory-user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserOutput } from './dto/user-output';

@Injectable()
export class UserService {
  constructor(
    @Inject(InMemoryUserRepository)
    private userRepository: InMemoryUserRepository,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserOutput> {
    const foundUser = await this.findByEmail(createUserDto.email);

    if (foundUser) {
      throw new BadRequestException('This email is already used');
    }

    const user = new User({
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password,
    });

    await this.userRepository.create(user);

    return new UserOutput({ id: user.id, name: user.name, email: user.email });
  }

  async findOne(id: string): Promise<UserOutput> {
    const user = await this.userRepository.findById(id);

    return new UserOutput({ id: user.id, name: user.name, email: user.email });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findByEmail(email: string): Promise<UserOutput> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) return undefined;

    return new UserOutput({ id: user.id, name: user.name, email: user.email });
  }
}
