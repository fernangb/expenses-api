import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Expense } from 'src/domain/expenses/entities/expense.entity';
import InMemoryExpenseRepository from 'src/infra/repositories/expenses/in-memory/in-memory-expense.repository';
import { UserService } from '../users/user.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { ExpenseOutput } from './dto/expense-output';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpenseService {
  constructor(
    @Inject(InMemoryExpenseRepository)
    private expenseRepository: InMemoryExpenseRepository,
    @Inject(UserService)
    private userService: UserService,
  ) {}

  async create(createExpenseDto: CreateExpenseDto) {
    const findUser = await this.userService.findOne(createExpenseDto.userId);

    if (!findUser) throw new BadRequestException('User not found');

    const expense = new Expense({
      name: createExpenseDto.name,
      description: createExpenseDto.description,
      value: createExpenseDto.value,
      user: findUser,
      dueDate: createExpenseDto.dueDate,
    });

    await this.expenseRepository.create(expense);

    return new ExpenseOutput({
      id: expense.id,
      name: expense.name,
      description: expense.description,
      value: expense.value,
      dueDate: expense.dueDate,
      user: expense.user,
    });
  }

  async findAllByUser(userId: string): Promise<ExpenseOutput[]> {
    const expensesByUser = await this.expenseRepository.findAllByUser(userId);

    return this.toListOutput(expensesByUser);
  }

  async findOne(id: string): Promise<ExpenseOutput> {
    const expense = await this.expenseRepository.findById(id);

    if (!expense) throw new BadRequestException('This expense not exists');

    return new ExpenseOutput({
      id: expense.id,
      name: expense.name,
      description: expense.description,
      value: expense.value,
      dueDate: expense.dueDate,
      user: expense.user,
    });
  }

  async update(
    id: string,
    updateExpenseDto: UpdateExpenseDto,
  ): Promise<ExpenseOutput> {
    const findExpense = await this.expenseRepository.findById(id);

    if (!findExpense) throw new BadRequestException('Invalid Id');

    const findUser = await this.userService.findOne(updateExpenseDto.userId);

    if (!findUser) throw new BadRequestException('User not found');

    const expense = new Expense({
      id,
      name: updateExpenseDto.name,
      description: updateExpenseDto.description,
      value: updateExpenseDto.value,
      dueDate: updateExpenseDto.dueDate,
      user: findUser,
    });

    await this.expenseRepository.update(expense);

    return new ExpenseOutput({
      id: expense.id,
      name: expense.name,
      description: expense.description,
      value: expense.value,
      dueDate: expense.dueDate,
      user: expense.user,
    });
  }

  async remove(id: string): Promise<void> {
    const findExpense = await this.expenseRepository.findById(id);

    if (!findExpense) throw new BadRequestException('Invalid Id');

    await this.expenseRepository.delete(id);
  }

  toListOutput(expenses: Expense[]): ExpenseOutput[] {
    return expenses.map(
      (expense) =>
        new ExpenseOutput({
          id: expense.id,
          name: expense.name,
          description: expense.description,
          value: expense.value,
          dueDate: expense.dueDate,
          user: expense.user,
        }),
    );
  }
}
