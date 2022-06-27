import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserOutput } from '../../../application/users/dto/user-output';

interface ExpenseOutputProps {
  id: string;
  name: string;
  description?: string;
  value: number;
  dueDate: Date;
  user: UserOutput;
  isActive: boolean;
}

export class ExpenseOutput {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsNumber()
  value: number;

  @ApiProperty()
  @IsDate()
  dueDate: Date;

  @ApiProperty()
  @IsObject()
  user: UserOutput;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;

  constructor(props: ExpenseOutputProps) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.value = props.value;
    this.dueDate = props.dueDate;
    this.user = props.user;
    this.isActive = props.isActive;
  }
}
