import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import JSONWebTokenProvider from '../../infra/providers/token/jsonwebtoken/jsonwebtoken.provider';
import BCryptHashProvider from '../../infra/providers/hash/bcrypt/bcrypt-hash.provider';
import { SessionService } from './session.service';
import { UserService } from '../users/user.service';
import { InvalidLoginCredentialsException } from '../@shared/exceptions/invalid-login-credentials.exception';
import { User } from '../../domain/users/entities/user.entity';
import { UserOutput } from '../users/dto/user-output';
import { SessionOutput } from './dto/session-output';

describe('SessionService Unit Tests', () => {
  let service: SessionService;
  let userService: UserService;
  let hashProvider: BCryptHashProvider;
  let tokenProvider: JSONWebTokenProvider;

  const user = new User({
    id: '1',
    name: 'User 1',
    email: 'user@email.com',
    password: '123',
  });

  const userOutput = new UserOutput({
    id: '1',
    name: 'User 1',
    email: 'user@email.com',
  });

  const token = 'jskljlkshdjshjdhsjhdsjhsj';

  const session = new SessionOutput({
    user: userOutput,
    token,
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SessionService,
        {
          provide: UserService,
          useValue: createMock<UserService>(),
        },
        {
          provide: BCryptHashProvider,
          useValue: createMock<BCryptHashProvider>(),
        },
        {
          provide: JSONWebTokenProvider,
          useValue: createMock<JSONWebTokenProvider>(),
        },
      ],
    }).compile();

    service = module.get<SessionService>(SessionService);
    userService = module.get<UserService>(UserService);
    hashProvider = module.get<BCryptHashProvider>(BCryptHashProvider);
    tokenProvider = module.get<JSONWebTokenProvider>(JSONWebTokenProvider);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should not login if email does not exists', async () => {
      jest
        .spyOn(userService, 'findByEmail')
        .mockReturnValue(Promise.resolve(undefined));

      await expect(
        service.create({
          email: user.email,
          password: user.password,
        }),
      ).rejects.toThrow(new InvalidLoginCredentialsException());
    });

    it('should not login if password is wrong', async () => {
      jest
        .spyOn(userService, 'findByEmail')
        .mockReturnValue(Promise.resolve(user));
      jest
        .spyOn(hashProvider, 'compareHash')
        .mockReturnValue(Promise.resolve(false));

      await expect(
        service.create({
          email: user.email,
          password: 'jsdjhsjdhjshdshjh',
        }),
      ).rejects.toThrow(new InvalidLoginCredentialsException());
    });

    it('should login with valid credentials', async () => {
      jest
        .spyOn(userService, 'findByEmail')
        .mockReturnValue(Promise.resolve(user));
      jest
        .spyOn(hashProvider, 'compareHash')
        .mockReturnValue(Promise.resolve(true));
      jest.spyOn(tokenProvider, 'createToken').mockReturnValue(token);

      expect(
        await service.create({
          email: user.email,
          password: user.password,
        }),
      ).toStrictEqual(session);
    });
  });
});
