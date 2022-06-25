import { User } from 'src/domain/users/user.entity';

export default interface UserRepositoryInterface {
  findByEmail(email: string): Promise<User>;
}
