import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { UserOutput } from '../users/dto/user-output';
import { Expense } from '../../domain/expenses/entities/expense.entity';
import { ExpenseOutput } from './dto/expense-output';
import { ListExpenseOutput } from './dto/list-expense-output.dto';

describe('ExpenseController Unit Tests', () => {
  let controller: ExpenseController;
  let service: ExpenseService;

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
        ExpenseController,
        {
          provide: ExpenseService,
          useValue: createMock<ExpenseService>(),
        },
      ],
    }).compile();

    controller = module.get<ExpenseController>(ExpenseController);
    service = module.get<ExpenseService>(ExpenseService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an expense', async () => {
      jest
        .spyOn(service, 'create')
        .mockReturnValue(Promise.resolve(expenseOutput));

      expect(
        await controller.create({
          name: expense.name,
          description: expense.description,
          value: expense.value,
          dueDate: expense.dueDate,
          userId: expense.user.id,
        }),
      ).toStrictEqual(expenseOutput);
    });
  });

  describe('findOne', () => {
    it('should find an expense by id', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockReturnValue(Promise.resolve(expenseOutput));

      expect(await controller.findOne(expense.id)).toStrictEqual(expenseOutput);
    });
  });

  describe('findAllByUser', () => {
    it('should find expenses by user id', async () => {
      jest
        .spyOn(service, 'findAllByUser')
        .mockReturnValue(Promise.resolve(listExpenseOutput));

      expect(await controller.findAllByUser(expense.user.id)).toStrictEqual(
        listExpenseOutput,
      );
    });
  });

  describe('update', () => {
    it('should update an expense', async () => {
      const updatedOutput = new ExpenseOutput({
        id: expense.id,
        name: 'new name',
        value: expense.value * 2,
        description: expense.description,
        dueDate: expense.dueDate,
        user: expense.user,
        isActive: true,
      });

      jest
        .spyOn(service, 'update')
        .mockReturnValue(Promise.resolve(updatedOutput));

      expect(
        await controller.update(expense.user.id, {
          name: updatedOutput.name,
          description: updatedOutput.description,
          value: updatedOutput.value,
          userId: updatedOutput.user.id,
          dueDate: updatedOutput.dueDate,
        }),
      ).toStrictEqual(updatedOutput);
    });
  });

  describe('remove', () => {
    it('should remove an expense', async () => {
      jest.spyOn(service, 'remove');

      await controller.remove(expense.id);

      expect(service.remove).toBeCalled();
    });
  });
});
