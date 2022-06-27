import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

interface UserOutputProps {
  id: string;
  name: string;
  email: string;
}

export class UserOutput {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  constructor(props: UserOutputProps) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
  }
}
