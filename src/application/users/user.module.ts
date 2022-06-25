import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import InMemoryUserRepository from 'src/infra/repositories/users/in-memory/in-memory-user.repository';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, InMemoryUserRepository],
})
export class UserModule {}
