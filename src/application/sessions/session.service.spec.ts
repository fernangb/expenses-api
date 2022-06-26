import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import JSONWebTokenProvider from '../../infra/providers/token/jsonwebtoken/jsonwebtoken.provider';
import BCryptHashProvider from '../../infra/providers/hash/bcrypt/bcrypt-hash.provider';
import { SessionService } from './session.service';
import { UserService } from '../users/user.service';

describe('SessionService Unit Tests', () => {
  let service: SessionService;
  let userService: UserService;
  let hashProvider: BCryptHashProvider;
  let tokenProvider: JSONWebTokenProvider;

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
});
