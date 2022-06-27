import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsString } from 'class-validator';
import { UserOutput } from 'src/application/users/dto/user-output';

interface SessionOutputProps {
  user: UserOutput;
  token: string;
}

export class SessionOutput {
  @ApiProperty()
  @IsObject()
  user: UserOutput;

  @ApiProperty()
  @IsString()
  token: string;

  constructor(props: SessionOutputProps) {
    this.user = props.user;
    this.token = props.token;
  }
}
