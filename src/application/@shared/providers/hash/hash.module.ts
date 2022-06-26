import { Module } from '@nestjs/common';
import BCryptHashProvider from 'src/infra/providers/hash/bcrypt/bcrypt-hash.provider';

@Module({
  imports: [],
  providers: [BCryptHashProvider],
  exports: [BCryptHashProvider],
})
export class HashModule {}
