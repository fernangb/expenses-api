import { User } from '../../users/entities/user.entity';
import { Expense } from './expense.entity';

describe('Expense Entity Unit Tests', () => {
  const user = new User({
    name: 'User 1',
    email: 'user@email.com',
    password: '123',
  });
  const dueDate = new Date('01-01-2023');

  it('should throw error when name is empty', () => {
    expect(() => {
      new Expense({
        name: undefined,
        description: 'Description 1',
        value: 100,
        dueDate,
        user,
      });
    }).toThrowError('Name is required');
    expect(() => {
      new Expense({
        name: null,
        description: 'Description 1',
        value: 100,
        dueDate,
        user,
      });
    }).toThrowError('Name is required');
    expect(() => {
      new Expense({
        name: '',
        description: 'Description 1',
        value: 100,
        dueDate,
        user,
      });
    }).toThrowError('Name is required');
  });

  it('should throw error when value is empty', () => {
    expect(() => {
      new Expense({
        name: 'Expense 1',
        description: 'Description 1',
        value: undefined,
        dueDate,
        user,
      });
    }).toThrowError('Value is required');
    expect(() => {
      new Expense({
        name: 'Expense 1',
        description: 'Description 1',
        value: null,
        dueDate,
        user,
      });
    }).toThrowError('Value is required');
  });

  it('should throw error when value is negative', () => {
    expect(() => {
      new Expense({
        name: 'Expense 1',
        description: 'Description 1',
        value: -10,
        dueDate,
        user,
      });
    }).toThrowError('Value must be greater than zero');
  });

  it('should throw error when due date is empty', () => {
    expect(() => {
      new Expense({
        name: 'Expense 1',
        description: 'Description 1',
        value: 10,
        dueDate: undefined,
        user,
      });
    }).toThrowError('Due date is required');
    expect(() => {
      new Expense({
        name: 'Expense 1',
        description: 'Description 1',
        value: 10,
        dueDate: null,
        user,
      });
    }).toThrowError('Due date is required');
  });

  it('should throw error when user is empty', () => {
    expect(() => {
      new Expense({
        name: 'Expense 1',
        description: 'Description 1',
        value: 10,
        dueDate,
        user: undefined,
      });
    }).toThrowError('User is required');
    expect(() => {
      new Expense({
        name: 'Expense 1',
        description: 'Description 1',
        value: 10,
        dueDate,
        user: null,
      });
    }).toThrowError('User is required');
  });

  it('should create an expense', () => {
    const expense = new Expense({
      name: 'Expense 1',
      description: 'Description 1',
      value: 100,
      dueDate,
      user,
    });

    expect(expense.id).toBeDefined();
    expect(expense.name).toBe('Expense 1');
    expect(expense.description).toBe('Description 1');
    expect(expense.value).toBe(100);
    expect(expense.dueDate).toBe(dueDate);
    expect(expense.name).toBe('Expense 1');
    expect(expense.user).toStrictEqual(user);
    expect(expense.isActive).toBe(true);
  });

  it('should create an expense with empty description', () => {
    const expense = new Expense({
      name: 'Expense 1',
      value: 100,
      dueDate,
      user,
    });

    expect(expense.id).toBeDefined();
    expect(expense.name).toBe('Expense 1');
    expect(expense.description).toBeUndefined();
    expect(expense.value).toBe(100);
    expect(expense.dueDate).toBe(dueDate);
    expect(expense.name).toBe('Expense 1');
    expect(expense.user).toStrictEqual(user);
    expect(expense.isActive).toBe(true);
  });
});
