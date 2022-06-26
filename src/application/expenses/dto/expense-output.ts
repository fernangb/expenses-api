import { UserOutput } from 'src/application/users/dto/user-output';

interface ExpenseOutputProps {
  id: string;
  name: string;
  description?: string;
  value: number;
  dueDate: Date;
  user: UserOutput;
}

export class ExpenseOutput {
  id: string;
  name: string;
  description?: string;
  value: number;
  dueDate: Date;
  user: UserOutput;

  constructor(props: ExpenseOutputProps) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.value = props.value;
    this.dueDate = props.dueDate;
    this.user = props.user;
  }
}
