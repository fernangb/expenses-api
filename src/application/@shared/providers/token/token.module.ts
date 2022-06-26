import { Module } from '@nestjs/common';
import JSONWebTokenProvider from 'src/infra/providers/token/jsonwebtoken/jsonwebtoken.provider';

@Module({
  imports: [],
  providers: [JSONWebTokenProvider],
  exports: [JSONWebTokenProvider],
})
export class TokenModule {}
