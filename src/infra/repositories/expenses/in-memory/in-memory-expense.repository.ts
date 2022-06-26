import { Expense } from '../../../../domain/expenses/entities/expense.entity';
import ExpenseRepositoryInterface from '../expense-repository.interface';

export default class InMemoryExpenseRepository
  implements ExpenseRepositoryInterface
{
  private expenses: Expense[];

  constructor() {
    this.expenses = [];
  }

  async create(expense: Expense): Promise<void> {
    this.expenses.push(expense);
  }

  async findById(id: string): Promise<Expense> {
    return this.expenses.find((expense) => expense.id === id);
  }

  async findAllByUser(userId: string): Promise<Expense[]> {
    return this.expenses.filter((expense) => expense.user.id === userId);
  }

  async update(newExpense: Expense): Promise<void> {
    const expenseIndex = this.expenses.findIndex(
      (expense) => expense.id === newExpense.id,
    );

    if (expenseIndex !== -1) {
      const updatedExpense = new Expense({
        id: newExpense.id,
        name: newExpense.name,
        description: newExpense.description,
        value: newExpense.value,
        dueDate: newExpense.dueDate,
        user: newExpense.user,
      });
      this.expenses[expenseIndex] = updatedExpense;
    }
  }

  async delete(id: string): Promise<void> {
    const expenseIndex = this.expenses.findIndex(
      (expense) => expense.id === id,
    );

    if (expenseIndex !== -1) this.expenses.splice(expenseIndex, 1);
  }
}
