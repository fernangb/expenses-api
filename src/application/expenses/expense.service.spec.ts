import { createMock } from '@golevelup/ts-jest';
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UniqueEntityId } from '../../domain/@shared/entities/unique-entity';
import { Expense } from '../../domain/expenses/entities/expense.entity';
import { ExpenseOutput } from './dto/expense-output';
import { ListExpenseOutput } from './dto/list-expense-output.dto';
import InMemoryExpenseRepository from '../../infra/repositories/expenses/in-memory/in-memory-expense.repository';
import { UserOutput } from '../users/dto/user-output';
import { UserService } from '../users/user.service';
import { ExpenseService } from './expense.service';

describe('ExpenseService Unit Tests', () => {
  let service: ExpenseService;
  let repository: InMemoryExpenseRepository;
  let userService: UserService;

  const expense = new Expense({
    id: '1',
    name: 'Expense 1',
    description: 'Expense 1',
    value: 10,
    user: new UserOutput({
      id: '1',
      email: 'user@email.com',
      name: 'User 1',
    }),
    dueDate: new Date('01-01-2023'),
  });

  const expenseOutput = new ExpenseOutput({
    id: expense.id,
    name: expense.name,
    description: expense.description,
    dueDate: expense.dueDate,
    value: expense.value,
    user: expense.user,
    isActive: true,
  });

  const expense2 = new Expense({
    id: '2',
    name: 'Expense 2',
    description: 'Expense 2',
    value: 15,
    user: new UserOutput({
      id: '1',
      email: 'user@email.com',
      name: 'User 1',
    }),
    dueDate: new Date('01-01-2023'),
  });

  const expenseOutput2 = new ExpenseOutput({
    id: expense2.id,
    name: expense2.name,
    description: expense2.description,
    dueDate: expense2.dueDate,
    value: expense2.value,
    user: expense2.user,
    isActive: true,
  });

  const listExpenseOutput = new ListExpenseOutput({
    items: [expenseOutput, expenseOutput2],
    total: expenseOutput.value + expenseOutput2.value,
  });

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
    repository = module.get<InMemoryExpenseRepository>(
      InMemoryExpenseRepository,
    );
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should not create an expense if user is invalid', async () => {
      jest
        .spyOn(userService, 'findOne')
        .mockReturnValue(Promise.resolve(undefined));

      await expect(
        service.create({
          name: 'Expense 1',
          description: 'Description 1',
          value: 10,
          dueDate: new Date('01-01-2023'),
          userId: '123',
        }),
      ).rejects.toThrow(new BadRequestException('User not found'));
    });

    it('should throw error when  expense is invalid', async () => {
      jest
        .spyOn(userService, 'findOne')
        .mockReturnValue(Promise.resolve(expense.user));

      await expect(
        service.create({
          name: '',
          description: expense.description,
          value: expense.value,
          dueDate: expense.dueDate,
          userId: expense.user.id,
        }),
      ).rejects.toThrow(new BadRequestException('Name is required'));
    });

    it('should create an expense', async () => {
      jest
        .spyOn(userService, 'findOne')
        .mockReturnValue(Promise.resolve(expense.user));
      jest.spyOn(UniqueEntityId, 'create').mockReturnValue('1');

      expect(
        await service.create({
          name: expense.name,
          description: expense.description,
          value: expense.value,
          dueDate: expense.dueDate,
          userId: expense.user.id,
        }),
      ).toStrictEqual(expenseOutput);
      expect(repository.create).toBeCalled();
    });
  });

  describe('toListOutput', () => {
    it('should list expenses output', () => {
      expect(service.toListOutput([expense, expense2])).toStrictEqual(
        listExpenseOutput,
      );
    });
  });

  describe('findAllByUser', () => {
    it('should find expenses by user', async () => {
      jest
        .spyOn(repository, 'findAllByUser')
        .mockReturnValue(Promise.resolve([expense, expense2]));

      jest.spyOn(service, 'toListOutput').mockReturnValue(listExpenseOutput);

      expect(await service.findAllByUser(expense.id)).toStrictEqual(
        listExpenseOutput,
      );
    });

    describe('findOne', () => {
      it('should not find an expense if it does not exists', async () => {
        const id = '123';

        jest
          .spyOn(repository, 'findById')
          .mockReturnValue(Promise.resolve(undefined));

        await expect(service.findOne(id)).rejects.toThrow(
          new BadRequestException('This expense not exists'),
        );
      });

      it('should find an expense by id', async () => {
        const id = expense.id;

        jest
          .spyOn(repository, 'findById')
          .mockReturnValue(Promise.resolve(expense));

        expect(await service.findOne(id)).toStrictEqual(expenseOutput);
      });
    });

    describe('update', () => {
      it('should not update an expense if expense does not exists', async () => {
        const id = '123';

        jest
          .spyOn(repository, 'findById')
          .mockReturnValue(Promise.resolve(undefined));

        await expect(
          service.update(id, {
            name: 'Updated expense',
            description: 'Description 1',
            value: 10,
            dueDate: new Date('01-01-2023'),
            userId: expense.user.id,
          }),
        ).rejects.toThrow(new BadRequestException('Invalid Id'));
      });

      it('should not update an expense if user does not exists', async () => {
        const id = expense.id;

        jest
          .spyOn(repository, 'findById')
          .mockReturnValue(Promise.resolve(expense));

        jest
          .spyOn(userService, 'findOne')
          .mockReturnValue(Promise.resolve(undefined));

        await expect(
          service.update(id, {
            name: 'Update Expense 1',
            description: 'Description 1',
            value: 10,
            dueDate: new Date('01-01-2023'),
            userId: '123',
          }),
        ).rejects.toThrow(new BadRequestException('User not found'));
      });

      it('should update an expense', async () => {
        const id = expense.id;
        const updatedExpense = new ExpenseOutput({
          id,
          name: 'New name 1',
          description: '',
          value: 100,
          dueDate: expense.dueDate,
          user: expense.user,
          isActive: true,
        });

        jest
          .spyOn(repository, 'findById')
          .mockReturnValue(Promise.resolve(expense));

        jest
          .spyOn(userService, 'findOne')
          .mockReturnValue(Promise.resolve(expense.user));

        expect(
          await service.update(id, {
            name: updatedExpense.name,
            description: updatedExpense.description,
            value: updatedExpense.value,
            dueDate: updatedExpense.dueDate,
            userId: updatedExpense.user.id,
          }),
        ).toStrictEqual(updatedExpense);
      });
    });

    describe('remove', () => {
      it('should not remove an expense if it does not exists', async () => {
        const id = '123';

        jest
          .spyOn(repository, 'findById')
          .mockReturnValue(Promise.resolve(undefined));

        await expect(service.remove(id)).rejects.toThrow(
          new BadRequestException('Invalid Id'),
        );
      });

      it('should remove an expense', async () => {
        const id = expense.id;

        jest
          .spyOn(repository, 'findById')
          .mockReturnValue(Promise.resolve(expense));

        jest.spyOn(repository, 'delete');

        await service.remove(id);

        expect(repository.delete).toBeCalled();
      });
    });
  });
});
