import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import TypeormExpenseRepository from 'src/infra/repositories/expenses/typeorm/typeorm-expense.repository';
import { Expense } from '../../domain/expenses/entities/expense.entity';
import InMemoryExpenseRepository from '../../infra/repositories/expenses/in-memory/in-memory-expense.repository';
import { UserService } from '../users/user.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { ExpenseOutput } from './dto/expense-output';
import { ListExpenseOutput } from './dto/list-expense-output.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpenseService {
  constructor(
    @Inject(TypeormExpenseRepository)
    private expenseRepository: TypeormExpenseRepository,
    @Inject(UserService)
    private userService: UserService,
  ) {}

  async create(createExpenseDto: CreateExpenseDto): Promise<ExpenseOutput> {
    try {
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
        isActive: expense.isActive,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAllByUser(userId: string): Promise<ListExpenseOutput> {
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
      isActive: expense.isActive,
    });
  }

  async update(
    id: string,
    updateExpenseDto: UpdateExpenseDto,
  ): Promise<ExpenseOutput> {
    try {
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
        isActive: expense.isActive,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string): Promise<void> {
    const findExpense = await this.expenseRepository.findById(id);

    if (!findExpense) throw new BadRequestException('Invalid Id');

    await this.expenseRepository.delete(id);
  }

  toListOutput(expenses: Expense[]): ListExpenseOutput {
    const expenseOutputs = expenses.map(
      (expense) =>
        new ExpenseOutput({
          id: expense.id,
          name: expense.name,
          description: expense.description,
          value: expense.value,
          dueDate: expense.dueDate,
          user: expense.user,
          isActive: expense.isActive,
        }),
    );

    const total = expenseOutputs.reduce(
      (accumulate, expense) => expense.value + accumulate,
      0,
    );

    return new ListExpenseOutput({
      items: expenseOutputs,
      total,
    });
  }
}
