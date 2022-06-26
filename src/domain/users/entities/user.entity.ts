import { UniqueEntityId } from 'src/domain/@shared/entities/unique-entity';

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
  }
}
