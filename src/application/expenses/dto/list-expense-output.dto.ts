import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, ValidateNested } from 'class-validator';
import { ExpenseOutput } from './expense-output';

interface ListExpenseOutputProps {
  items: ExpenseOutput[];
  total: number;
}

export class ListExpenseOutput {
  @ApiProperty({ isArray: true, type: ExpenseOutput })
  @IsArray({ each: true })
  @ValidateNested({ each: true })
  items: ExpenseOutput[];

  @ApiProperty()
  @IsNumber()
  total: number;

  constructor(props: ListExpenseOutputProps) {
    this.items = props.items;
    this.total = props.total;
  }
}
