import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import InMemoryExpenseRepository from 'src/infra/repositories/expenses/in-memory/in-memory-expense.repository';
import { UserModule } from '../users/user.module';

@Module({
  imports: [UserModule],
  controllers: [ExpenseController],
  providers: [ExpenseService, InMemoryExpenseRepository],
  exports: [ExpenseService],
})
export class ExpenseModule {}
