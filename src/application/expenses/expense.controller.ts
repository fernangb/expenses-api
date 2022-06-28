import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Logger,
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
  private logger = new Logger('Expense');
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
    try {
      return this.expenseService.create(createExpenseDto);
    } catch (error) {
      this.logger.error(`[create] error: ${error.message}`);
    }
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
    try {
      return this.expenseService.findAllByUser(userId);
    } catch (error) {
      this.logger.error(`[find-by-user] error: ${error.message}`);
    }
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
    try {
      return this.expenseService.findOne(id);
    } catch (error) {
      this.logger.error(`[find-by-id] error: ${error.message}`);
    }
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
    try {
      return this.expenseService.update(id, updateExpenseDto);
    } catch (error) {
      this.logger.error(`[update] error: ${error.message}`);
    }
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
    try {
      await this.expenseService.remove(id);
    } catch (error) {
      this.logger.error(`[remove] error: ${error.message}`);
    }
  }
}
