import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserOutput } from './dto/user-output';

describe('UserController Unit Tests', () => {
  let controller: UserController;
  let service: UserService;

  const userOutput = new UserOutput({
    id: '1',
    name: 'User1',
    email: 'user@email.com',
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserController,
        {
          provide: UserService,
          useValue: createMock<UserService>(),
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      jest
        .spyOn(service, 'create')
        .mockReturnValue(Promise.resolve(userOutput));
      expect(
        await controller.create({
          name: userOutput.name,
          email: userOutput.email,
          password: '123',
        }),
      ).toStrictEqual(userOutput);
    });
  });
});
