import { UserOutput } from '../../../application/users/dto/user-output';
import { UniqueEntityId } from '../../@shared/entities/unique-entity';

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
    this.dueDate = new Date(props.dueDate);
    this.user = props.user;
    this.isActive = true;

    this.validate();
  }

  validate() {
    if (this.name === null || this.name === undefined || this.name === '')
      throw new Error('Name is required');
    if (this.value === null || this.value === undefined)
      throw new Error('Value is required');
    if (this.value < 0) throw new Error('Value must be greater than zero');
    if (this.dueDate === null || this.dueDate === undefined)
      throw new Error('Due date is required');
    if (this.dueDate < new Date(Date.now()))
      throw new Error('Due date must be greater than actual date');

    if (this.user === null || this.user === undefined)
      throw new Error('User is required');
  }
}
