import { User } from '../../../../domain/users/entities/user.entity';
import { Expense } from '../../../../domain/expenses/entities/expense.entity';
import InMemoryExpenseRepository from './in-memory-expense.repository';

describe('In memory expense repository Unit Test', () => {
  let repository: InMemoryExpenseRepository;
  const user = new User({
    id: '1',
    name: 'User 1',
    email: 'user@email.com',
    password: '123',
  });

  const user2 = new User({
    id: '2',
    name: 'User 2',
    email: 'user2@email.com',
    password: '123',
  });

  const expense = new Expense({
    id: '1',
    name: 'Description 1',
    value: 10,
    dueDate: new Date('01-01-2023'),
    user,
  });

  const expense2 = new Expense({
    id: '2',
    name: 'Description 2',
    value: 10,
    dueDate: new Date('01-01-2023'),
    user: user2,
  });

  const expense3 = new Expense({
    id: '2',
    name: 'Description 2',
    value: 10,
    dueDate: new Date('01-01-2023'),
    user,
  });

  beforeEach(async () => {
    repository = new InMemoryExpenseRepository();
  });

  describe('create', () => {
    it('should create an expense', async () => {
      jest.spyOn(repository, 'create');
      await repository.create(expense);

      const findExpense = await repository.findById('1');

      expect(repository.create).toBeCalled();
      expect(repository.create).toBeCalledWith(expense);
      expect(findExpense).toStrictEqual(expense);
    });
  });

  describe('findById', () => {
    it('should not find an expense by id if id is invalid', async () => {
      jest.spyOn(repository, 'findById');

      await repository.create(expense);

      const findByExpense = await repository.findById('22');

      expect(repository.findById).toBeCalled();
      expect(repository.findById).toBeCalledWith('22');
      expect(findByExpense).toStrictEqual(undefined);
    });
    it('should find a expense by id if id is invalid', async () => {
      jest.spyOn(repository, 'findById');
      const invalidId = '22';

      await repository.create(expense);

      const findByExpense = await repository.findById(invalidId);

      expect(repository.findById).toBeCalledWith(invalidId);
      expect(findByExpense).toBeUndefined();
    });
  });

  describe('findAllByUser', () => {
    it('should not find expenses if id is invalid', async () => {
      jest.spyOn(repository, 'findAllByUser');

      await repository.create(expense);
      await repository.create(expense2);
      await repository.create(expense3);

      const userExpenses = await repository.findAllByUser('3');
      expect(repository.findAllByUser).toBeCalled();
      expect(repository.findAllByUser).toBeCalledWith('3');
      expect(userExpenses).toStrictEqual([]);
    });
    it('should find all expenses by user', async () => {
      jest.spyOn(repository, 'findAllByUser');

      await repository.create(expense);
      await repository.create(expense2);
      await repository.create(expense3);

      const userExpenses = await repository.findAllByUser(user.id);
      expect(repository.findAllByUser).toBeCalled();
      expect(repository.findAllByUser).toBeCalledWith(user.id);
      expect(userExpenses).toStrictEqual([expense, expense3]);

      const userExpenses2 = await repository.findAllByUser(user2.id);
      expect(repository.findAllByUser).toBeCalled();
      expect(repository.findAllByUser).toBeCalledWith(user2.id);
      expect(userExpenses2).toStrictEqual([expense2]);
    });
  });

  describe('update', () => {
    it('should not update an expense if id is invalid', async () => {
      jest.spyOn(repository, 'update');

      const newExpense = new Expense({
        id: '2',
        name: 'New Description 1',
        value: 100,
        dueDate: new Date('01-01-2023'),
        user,
      });

      await repository.create(expense);

      await repository.update(newExpense);

      const updatedExpense = await repository.findById(expense.id);

      expect(repository.update).toBeCalled();
      expect(repository.update).toBeCalledWith(newExpense);
      expect(updatedExpense).toStrictEqual(expense);
    });
    it('should update an expense', async () => {
      jest.spyOn(repository, 'update');

      const newExpense = new Expense({
        id: '1',
        name: 'New Description 1',
        value: 100,
        dueDate: new Date('01-01-2023'),
        user,
      });

      await repository.create(expense);

      await repository.update(newExpense);

      const updatedExpense = await repository.findById(expense.id);

      expect(repository.update).toBeCalled();
      expect(repository.update).toBeCalledWith(newExpense);
      expect(updatedExpense).toStrictEqual(newExpense);
    });
  });

  describe('delete', () => {
    it('should not delete an expense if id is invalid', async () => {
      jest.spyOn(repository, 'delete');

      await repository.create(expense);

      await repository.delete('2');

      const expenseAfterDeleted = await repository.findById(expense.id);

      expect(repository.delete).toBeCalled();
      expect(repository.delete).toBeCalledWith('2');
      expect(expenseAfterDeleted).toStrictEqual(expense);
    });
    it('should update an expense', async () => {
      jest.spyOn(repository, 'delete');

      await repository.create(expense);

      await repository.delete(expense.id);

      const expenseAfterDeleted = await repository.findById(expense.id);

      expect(repository.delete).toBeCalled();
      expect(repository.delete).toBeCalledWith(expense.id);
      expect(expenseAfterDeleted).toBeUndefined();
    });
  });
});
