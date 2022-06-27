import TokenInterface from '../../../../domain/@shared/providers/token/token.interface';
import authConfig from '../../../../config/auth';
import { sign, verify } from 'jsonwebtoken';
import validateTokenInputDto from 'src/domain/@shared/providers/token/dto/validate-token-input.dto';
import { UnauthorizedException } from '@nestjs/common';

export default class JSONWebTokenProvider implements TokenInterface {
  validateToken({ token }: validateTokenInputDto): boolean {
    if (!token) throw new UnauthorizedException('Invalid token');

    try {
      const decoded = verify(token, authConfig.jwt.secret);

      if (!decoded) throw new UnauthorizedException('Invalid token');
      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

  createToken(userId: string): string {
    const { secret, expiresIn } = authConfig.jwt;

    return sign({}, secret, {
      subject: userId,
      expiresIn,
    });
  }
}
