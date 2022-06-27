import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ExpenseOutput } from './dto/expense-output';
import { ListExpenseOutput } from './dto/list-expense-output.dto';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RolesAuthGuard } from '../auth/guard/roles.guard';
import ExceptionOutput from '../@shared/exceptions/dto/exception-output';

@Controller('expenses')
@ApiTags('Expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @ApiOperation({ summary: 'Create an expense' })
  @ApiResponse({
    status: 201,
    description: 'Created expense',
    type: ExpenseOutput,
  })
  @ApiResponse({
    description: 'It happens when you provide a invalid token',
    status: 401,
    type: ExceptionOutput,
  })
  @ApiBadRequestResponse({
    description: 'It happens when some data is invalid',
    type: ExceptionOutput,
  })
  @UseGuards(RolesAuthGuard)
  @Post()
  async create(
    @Body() createExpenseDto: CreateExpenseDto,
  ): Promise<ExpenseOutput> {
    return this.expenseService.create(createExpenseDto);
  }

  @ApiOperation({ summary: 'Get all expenses by user id' })
  @ApiResponse({
    status: 200,
    description: 'Expenses by user',
    type: ListExpenseOutput,
  })
  @ApiResponse({
    description: 'It happens when you provide a invalid token',
    status: 401,
    type: ExceptionOutput,
  })
  @ApiBadRequestResponse({
    description: 'It happens when some data is invalid',
    type: ExceptionOutput,
  })
  @UseGuards(RolesAuthGuard)
  @Get('/user/:userId')
  async findAllByUser(
    @Param('userId') userId: string,
  ): Promise<ListExpenseOutput> {
    return this.expenseService.findAllByUser(userId);
  }

  @ApiOperation({ summary: 'Get an expense by id' })
  @ApiResponse({
    status: 200,
    description: 'Expense by id',
    type: ExpenseOutput,
  })
  @ApiResponse({
    description: 'It happens when you provide a invalid token',
    status: 401,
    type: ExceptionOutput,
  })
  @ApiBadRequestResponse({
    description: 'It happens when some data is invalid',
    type: ExceptionOutput,
  })
  @UseGuards(RolesAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ExpenseOutput> {
    return this.expenseService.findOne(id);
  }

  @ApiOperation({ summary: 'Update an expense by id' })
  @ApiResponse({
    status: 200,
    description: 'Update expense',
    type: ListExpenseOutput,
  })
  @ApiResponse({
    description: 'It happens when you provide a invalid token',
    status: 401,
    type: ExceptionOutput,
  })
  @ApiBadRequestResponse({
    description: 'It happens when some data is invalid',
    type: ExceptionOutput,
  })
  @UseGuards(RolesAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ): Promise<ExpenseOutput> {
    return this.expenseService.update(id, updateExpenseDto);
  }

  @UseGuards(RolesAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Remove an expense' })
  @ApiResponse({
    status: 200,
    description: 'Remove an expense',
  })
  @ApiResponse({
    description: 'It happens when you provide a invalid token',
    status: 401,
    type: ExceptionOutput,
  })
  @ApiBadRequestResponse({
    description: 'It happens when some data is invalid',
    type: ExceptionOutput,
  })
  @UseGuards(RolesAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.expenseService.remove(id);
  }
}
