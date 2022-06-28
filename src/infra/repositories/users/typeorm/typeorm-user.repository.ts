import { User } from '../../../../domain/users/entities/user.entity';
import { Repository } from 'typeorm';
import UserRepositoryInterface from '../user-repository.interface';
import { TypeormUserModel } from './typeorm-user.model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export default class TypeormUserRepository implements UserRepositoryInterface {
  constructor(
    @InjectRepository(TypeormUserModel)
    private repository: Repository<TypeormUserModel>,
  ) {}

  async create(data: User): Promise<void> {
    await this.repository.save(this.repository.create(data));
  }

  async findById(id: string): Promise<User> {
    const userModel = await this.repository.findOne({ id });

    if (!userModel) return undefined;

    return new User({
      id: userModel.id,
      name: userModel.name,
      email: userModel.email,
      password: userModel.password,
    });
  }

  async findByEmail(email: string): Promise<User> {
    const userModel = await this.repository.findOne({ email });

    if (!userModel) return undefined;

    return new User({
      id: userModel.id,
      name: userModel.name,
      email: userModel.email,
      password: userModel.password,
    });
  }
}
