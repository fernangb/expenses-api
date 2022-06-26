import { User } from '../../../../domain/users/entities/user.entity';
import InMemoryUserRepository from './in-memory-user.repository';

describe('In memory user repository Unit Test', () => {
  let repository: InMemoryUserRepository;
  const user = new User({
    id: '1',
    name: 'User 1',
    email: 'user@email.com',
    password: '123',
  });

  beforeEach(async () => {
    repository = new InMemoryUserRepository();
  });

  describe('create', () => {
    it('should create a user', async () => {
      jest.spyOn(repository, 'create');
      await repository.create(user);

      const findUser = await repository.findById('1');

      expect(repository.create).toBeCalled();
      expect(repository.create).toBeCalledWith(user);
      expect(findUser).toStrictEqual(user);
    });
  });

  describe('findById', () => {
    it('should not find a user by id if id is invalid', async () => {
      jest.spyOn(repository, 'findById');

      await repository.create(user);

      const findUser = await repository.findById('2');

      expect(repository.findById).toBeCalled();
      expect(repository.findById).toBeCalledWith('2');
      expect(findUser).toStrictEqual(undefined);
    });
    it('should find a user by id if id is invalid', async () => {
      jest.spyOn(repository, 'findById');
      const invalidId = '2';

      await repository.create(user);

      const findUser = await repository.findById(invalidId);

      expect(repository.findById).toBeCalledWith(invalidId);
      expect(findUser).toBeUndefined();
    });
  });

  describe('findByEmail', () => {
    it('should find a user by email if email is invalid', async () => {
      jest.spyOn(repository, 'findByEmail');
      const invalidEmail = 'invalidemail@email.com';

      await repository.create(user);

      const findUser = await repository.findByEmail(invalidEmail);

      expect(repository.findByEmail).toBeCalledWith(invalidEmail);
      expect(findUser).toBeUndefined();
    });

    it('should find a user by email', async () => {
      jest.spyOn(repository, 'findByEmail');

      await repository.create(user);

      const findUser = await repository.findByEmail(user.email);

      expect(repository.findByEmail).toBeCalled();
      expect(repository.findByEmail).toBeCalledWith(user.email);
      expect(findUser).toStrictEqual(user);
    });
  });
});
