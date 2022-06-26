import HashProviderInterface from '../../../../domain/@shared/providers/hash/hash-provider.interface';
import { hash, compare } from 'bcryptjs';

export default class BCryptHashProvider implements HashProviderInterface {
  createHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }
  compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}
