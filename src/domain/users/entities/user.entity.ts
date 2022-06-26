import { UniqueEntityId } from '../../@shared/entities/unique-entity';

interface UserProps {
  id?: string;
  name: string;
  email: string;
  password: string;
}

export class User {
  id: string;
  name: string;
  email: string;
  password: string;

  constructor(props: UserProps) {
    this.id = props.id ? props.id : UniqueEntityId.create();
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.validate();
  }

  validate() {
    if (this.name === null || this.name === undefined || this.name === '')
      throw new Error('Name is required');
    if (this.email === null || this.email === undefined || this.email === '')
      throw new Error('Email is required');
    if (
      this.password === null ||
      this.password === undefined ||
      this.password === ''
    )
      throw new Error('Password is required');
  }
}
