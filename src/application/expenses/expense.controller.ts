import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ExpenseOutput } from './dto/expense-output';
import { ListExpenseOutput } from './dto/list-expense-output.dto';

@Controller('expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  async create(
    @Body() createExpenseDto: CreateExpenseDto,
  ): Promise<ExpenseOutput> {
    return this.expenseService.create(createExpenseDto);
  }

  @Get('/user/:userId')
  async findAllByUser(
    @Param('userId') userId: string,
  ): Promise<ListExpenseOutput> {
    return this.expenseService.findAllByUser(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ExpenseOutput> {
    return this.expenseService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ): Promise<ExpenseOutput> {
    return this.expenseService.update(id, updateExpenseDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.expenseService.remove(id);
  }
}
