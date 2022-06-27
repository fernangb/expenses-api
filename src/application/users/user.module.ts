import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import InMemoryUserRepository from 'src/infra/repositories/users/in-memory/in-memory-user.repository';
import { HashModule } from '../@shared/providers/hash/hash.module';
import TypeormUserRepository from 'src/infra/repositories/users/typeorm/typeorm-user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormUserModel } from 'src/infra/repositories/users/typeorm/typeorm-user.model';

@Module({
  imports: [HashModule],
  controllers: [UserController],
  providers: [UserService, InMemoryUserRepository, TypeormUserRepository],
  exports: [UserService],
})
export class UserModule {}
