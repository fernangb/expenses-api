import { User } from 'src/domain/users/entities/user.entity';

export default interface UserRepositoryInterface {
  findByEmail(email: string): Promise<User>;
}
