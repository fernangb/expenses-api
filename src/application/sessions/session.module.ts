import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { UserModule } from '../users/user.module';
import { HashModule } from '../@shared/providers/hash/hash.module';
import { TokenModule } from '../@shared/providers/token/token.module';

@Module({
  imports: [UserModule, HashModule, TokenModule],
  controllers: [SessionController],
  providers: [SessionService],
})
export class SessionModule {}
