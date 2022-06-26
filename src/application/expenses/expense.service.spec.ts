import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import InMemoryExpenseRepository from '../../infra/repositories/expenses/in-memory/in-memory-expense.repository';
import { UserService } from '../users/user.service';
import { ExpenseService } from './expense.service';

describe('ExpenseService Unit Tests', () => {
  let service: ExpenseService;
  let expenseRepository: InMemoryExpenseRepository;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpenseService,
        {
          provide: InMemoryExpenseRepository,
          useValue: createMock<InMemoryExpenseRepository>(),
        },
        {
          provide: UserService,
          useValue: createMock<UserService>(),
        },
      ],
    }).compile();

    service = module.get<ExpenseService>(ExpenseService);
    expenseRepository = module.get<InMemoryExpenseRepository>(
      InMemoryExpenseRepository,
    );
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
