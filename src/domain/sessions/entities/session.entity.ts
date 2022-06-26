interface SessionProps {
  email: string;
  password: string;
}

export class Session {
  email: string;
  password: string;

  constructor(props: SessionProps) {
    this.email = props.email;
    this.password = props.password;
  }
}
