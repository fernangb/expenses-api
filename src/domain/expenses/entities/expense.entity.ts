import { UserOutput } from 'src/application/users/dto/user-output';
import { UniqueEntityId } from 'src/domain/@shared/entities/unique-entity';

interface ExpenseProps {
  id?: string;
  name: string;
  description?: string;
  value: number;
  dueDate: Date;
  user: UserOutput;
}

export class Expense {
  id: string;
  name: string;
  description?: string;
  value: number;
  dueDate: Date;
  user: UserOutput;
  isActive: boolean;

  constructor(props: ExpenseProps) {
    this.id = props.id ? props.id : UniqueEntityId.create();
    this.name = props.name;
    this.description = props.description;
    this.value = props.value;
    this.dueDate = props.dueDate;
    this.user = props.user;
    this.isActive = true;
  }
}
