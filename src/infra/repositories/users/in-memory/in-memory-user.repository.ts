import UserRepositoryInterface from '../user-repository.interface';
import { Injectable } from '@nestjs/common';
import { User } from 'src/domain/users/entities/user.entity';

@Injectable()
export default class InMemoryUserRepository implements UserRepositoryInterface {
  private repository: User[];

  constructor() {
    this.repository = [];
  }

  async create(data: User) {
    this.repository.push(data);
  }

  async findById(id: string): Promise<User> {
    return this.repository.find((user) => user.id === id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.repository.find((user) => user.email === email);
  }
}
