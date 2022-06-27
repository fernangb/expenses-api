import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import InMemoryExpenseRepository from 'src/infra/repositories/expenses/in-memory/in-memory-expense.repository';
import { UserModule } from '../users/user.module';
import { TypeormExpenseModel } from 'src/infra/repositories/expenses/typeorm/typeorm-expense.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import TypeormExpenseRepository from 'src/infra/repositories/expenses/typeorm/typeorm-expense.repository';

@Module({
  imports: [UserModule],
  controllers: [ExpenseController],
  providers: [
    ExpenseService,
    InMemoryExpenseRepository,
    TypeormExpenseRepository,
  ],
  exports: [ExpenseService],
})
export class ExpenseModule {}
