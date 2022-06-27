import { Module } from '@nestjs/common';

import { UserModule } from '../users/user.module';
import { HashModule } from '../@shared/providers/hash/hash.module';
import { TokenModule } from '../@shared/providers/token/token.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { RolesAuthGuard } from './guard/roles.guard';

@Module({
  imports: [UserModule, HashModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService, RolesAuthGuard],
  exports: [AuthService],
})
export class AuthModule {}
