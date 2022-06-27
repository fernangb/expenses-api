import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsString } from 'class-validator';
import { UserOutput } from '../../../application/users/dto/user-output';

interface LoginOutputProps {
  user: UserOutput;
  token: string;
}

export class LoginOutput {
  @ApiProperty()
  @IsObject()
  user: UserOutput;

  @ApiProperty()
  @IsString()
  token: string;

  constructor(props: LoginOutputProps) {
    this.user = props.user;
    this.token = props.token;
  }
}
