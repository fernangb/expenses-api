import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import InMemoryUserRepository from 'src/infra/repositories/users/in-memory/in-memory-user.repository';
import { HashModule } from '../@shared/providers/hash/hash.module';

@Module({
  imports: [HashModule],
  controllers: [UserController],
  providers: [UserService, InMemoryUserRepository],
  exports: [UserService],
})
export class UserModule {}
