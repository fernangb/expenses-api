import { ExpenseOutput } from './expense-output';

interface ListExpenseOutputProps {
  items: ExpenseOutput[];
  total: number;
}

export class ListExpenseOutput {
  items: ExpenseOutput[];
  total: number;

  constructor(props: ListExpenseOutputProps) {
    this.items = props.items;
    this.total = props.total;
  }
}
