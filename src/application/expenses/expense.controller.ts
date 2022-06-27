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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('expenses')
@ApiTags('Expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  @ApiOperation({ summary: 'Create an expense' })
  @ApiResponse({
    status: 201,
    description: 'Created expense',
    type: ExpenseOutput,
  })
  async create(
    @Body() createExpenseDto: CreateExpenseDto,
  ): Promise<ExpenseOutput> {
    return this.expenseService.create(createExpenseDto);
  }

  @Get('/user/:userId')
  @ApiOperation({ summary: 'Get all expenses by user id' })
  @ApiResponse({
    status: 200,
    description: 'Expenses by user',
    type: ListExpenseOutput,
  })
  async findAllByUser(
    @Param('userId') userId: string,
  ): Promise<ListExpenseOutput> {
    return this.expenseService.findAllByUser(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an expense by id' })
  @ApiResponse({
    status: 200,
    description: 'Expense by id',
    type: ExpenseOutput,
  })
  async findOne(@Param('id') id: string): Promise<ExpenseOutput> {
    return this.expenseService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an expense by id' })
  @ApiResponse({
    status: 200,
    description: 'Update expense',
    type: ListExpenseOutput,
  })
  async update(
    @Param('id') id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ): Promise<ExpenseOutput> {
    return this.expenseService.update(id, updateExpenseDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove an expense' })
  @ApiResponse({
    status: 200,
    description: 'Remove an expense',
  })
  async remove(@Param('id') id: string): Promise<void> {
    await this.expenseService.remove(id);
  }
}
