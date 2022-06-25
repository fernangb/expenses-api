interface UserOutputProps {
  id: string;
  name: string;
  email: string;
}

export class UserOutput {
  id: string;
  name: string;
  email: string;

  constructor(props: UserOutputProps) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
  }
}
