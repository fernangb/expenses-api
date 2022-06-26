import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { UserOutput } from '../users/dto/user-output';
import { SessionOutput } from './dto/session-output';

describe('SessionController Unit Tests', () => {
  let controller: SessionController;
  let service: SessionService;

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
        SessionController,
        {
          provide: SessionService,
          useValue: createMock<SessionService>(),
        },
      ],
    }).compile();

    controller = module.get<SessionController>(SessionController);
    service = module.get<SessionService>(SessionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should login with valid credentials', async () => {
      jest.spyOn(service, 'create').mockReturnValue(Promise.resolve(session));

      expect(
        await controller.create({
          email: 'user@email.com',
          password: '123',
        }),
      ).toStrictEqual(session);
    });
  });
});
