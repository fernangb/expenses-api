import { UserOutput } from 'src/application/users/dto/user-output';

interface SessionOutputProps {
  user: UserOutput;
  token: string;
}

export class SessionOutput {
  user: UserOutput;
  token: string;

  constructor(props: SessionOutputProps) {
    this.user = props.user;
    this.token = props.token;
  }
}
