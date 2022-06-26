import { createMock } from '@golevelup/ts-jest';
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UniqueEntityId } from '../../domain/@shared/entities/unique-entity';
import { User } from '../../domain/users/entities/user.entity';
import BCryptHashProvider from '../../infra/providers/hash/bcrypt/bcrypt-hash.provider';
import InMemoryUserRepository from '../../infra/repositories/users/in-memory/in-memory-user.repository';
import { EmailAlreadyUsedException } from '../@shared/exceptions/email-already-used.exception';
import { UserOutput } from './dto/user-output';
import { UserService } from './user.service';

describe('UserService Unit Tests', () => {
  let service: UserService;
  let repository: InMemoryUserRepository;
  let hashProvider: BCryptHashProvider;

  const user = new User({
    id: '1',
    name: 'User 1',
    email: 'user@email.com',
    password: '123',
  });

  const userOutput = new UserOutput({
    id: user.id,
    name: user.name,
    email: user.email,
  });

  const hashedPassword = 'abhjdbhshv';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: InMemoryUserRepository,
          useValue: createMock<InMemoryUserRepository>(),
        },
        {
          provide: BCryptHashProvider,
          useValue: createMock<BCryptHashProvider>(),
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<InMemoryUserRepository>(InMemoryUserRepository);
    hashProvider = module.get<BCryptHashProvider>(BCryptHashProvider);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should throw error when  user is invalid', async () => {
      jest
        .spyOn(service, 'findByEmail')
        .mockReturnValue(Promise.resolve(undefined));

      await expect(
        service.create({
          name: '',
          email: user.email,
          password: user.password,
        }),
      ).rejects.toThrow(new BadRequestException('Name is required'));
    });

    it('should throw error when email already exists', async () => {
      jest.spyOn(service, 'findByEmail').mockReturnValue(Promise.resolve(user));

      await expect(
        service.create({
          name: user.name,
          email: user.email,
          password: user.password,
        }),
      ).rejects.toThrow(new EmailAlreadyUsedException());
    });

    it('should create a user', async () => {
      jest
        .spyOn(service, 'findByEmail')
        .mockReturnValue(Promise.resolve(undefined));
      jest.spyOn(repository, 'create');
      jest
        .spyOn(hashProvider, 'createHash')
        .mockReturnValue(Promise.resolve(hashedPassword));
      jest.spyOn(UniqueEntityId, 'create').mockReturnValue('1');

      const createdUser = await service.create({
        name: user.name,
        email: user.email,
        password: user.password,
      });

      expect(createdUser).toStrictEqual(userOutput);
      expect(repository.create).toBeCalled();
      expect(hashProvider.createHash).toBeCalled();
    });
  });

  describe('findOne', () => {
    it('should not find a user by id', async () => {
      jest
        .spyOn(repository, 'findById')
        .mockReturnValue(Promise.resolve(undefined));

      expect(await service.findOne('1')).toBeUndefined();
    });

    it('should find a user by id', async () => {
      jest.spyOn(repository, 'findById').mockReturnValue(Promise.resolve(user));

      expect(await service.findOne(user.id)).toStrictEqual(userOutput);
    });
  });

  describe('findByEmail', () => {
    it('should not find a user by email', async () => {
      jest
        .spyOn(repository, 'findByEmail')
        .mockReturnValue(Promise.resolve(undefined));

      expect(await service.findByEmail('fake@email.com')).toBeUndefined();
    });

    it('should find a user by email', async () => {
      jest
        .spyOn(repository, 'findByEmail')
        .mockReturnValue(Promise.resolve(user));

      expect(await service.findByEmail(user.email)).toStrictEqual(user);
    });
  });
});
