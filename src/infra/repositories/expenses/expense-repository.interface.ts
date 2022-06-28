import { Expense } from '../../../domain/expenses/entities/expense.entity';

export default interface ExpenseRepositoryInterface {
  create(expense: Expense): Promise<void>;
  findById(id: string): Promise<Expense>;
  findAllByUser(userId: string): Promise<Expense[]>;
  update(expense: Expense): Promise<void>;
  delete(id: string): Promise<void>;
}
