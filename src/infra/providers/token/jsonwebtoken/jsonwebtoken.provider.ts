import TokenInterface from '../../../../domain/@shared/providers/token/token.interface';
import authConfig from '../../../../config/auth';
import { sign } from 'jsonwebtoken';

export default class JSONWebTokenProvider implements TokenInterface {
  createToken(userId: string): string {
    const { secret, expiresIn } = authConfig.jwt;

    return sign({}, secret, {
      subject: userId,
      expiresIn,
    });
  }
}
