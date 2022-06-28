import { User } from '../../../domain/users/entities/user.entity';

export default interface UserRepositoryInterface {
  create(data: User): Promise<void>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
}
