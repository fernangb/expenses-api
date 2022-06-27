import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { UserOutput } from '../users/dto/user-output';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginOutput } from './dto/login-output.dto';

describe('AuthController Unit Tests', () => {
  let controller: AuthController;
  let service: AuthService;

  const userOutput = new UserOutput({
    id: '1',
    name: 'User 1',
    email: 'user@email.com',
  });

  const token = 'jskljlkshdjshjdhsjhdsjhsj';

  const session = new LoginOutput({
    user: userOutput,
    token,
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthController,
        {
          provide: AuthService,
          useValue: createMock<AuthService>(),
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should login with valid credentials', async () => {
      jest.spyOn(service, 'login').mockReturnValue(Promise.resolve(session));

      expect(
        await controller.login({
          email: 'user@email.com',
          password: '123',
        }),
      ).toStrictEqual(session);
    });
  });
});
