import { Expense } from 'src/domain/expenses/entities/expense.entity';
import { User } from 'src/domain/users/entities/user.entity';
import { Repository } from 'typeorm';
import ExpenseRepositoryInterface from '../expense-repository.interface';
import { TypeormExpenseModel } from './typeorm-expense.model';

export default class TypeormExpenseRepository
  implements ExpenseRepositoryInterface
{
  constructor(private repository: Repository<TypeormExpenseModel>) {}

  async create(expense: Expense): Promise<void> {
    await this.repository.save(this.repository.create(expense));
  }

  async findById(id: string): Promise<Expense> {
    const expenseModel = await this.repository.findOne({ where: { id } });

    if (!expenseModel) return undefined;

    return this.convertToExpense(expenseModel);
  }

  async findAllByUser(userId: string): Promise<Expense[]> {
    const expenseModelList = await this.repository.find({
      user: { id: userId },
    });

    const expenseList = expenseModelList.map((expenseModel) =>
      this.convertToExpense(expenseModel),
    );

    return expenseList;
  }

  async update(expense: Expense): Promise<void> {
    await this.repository.save(expense);
  }
  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  convertToExpense(expenseModel: TypeormExpenseModel): Expense {
    const userModel = new User({
      id: expenseModel.user.id,
      name: expenseModel.user.name,
      email: expenseModel.user.email,
      password: expenseModel.user.password,
    });

    return new Expense({
      id: expenseModel.id,
      name: expenseModel.name,
      description: expenseModel.description,
      value: expenseModel.value,
      dueDate: expenseModel.dueDate,
      user: userModel,
    });
  }
}
