import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export default class ExceptionOutput {
  @ApiProperty()
  @IsNumber()
  statusCode: number;

  @ApiProperty()
  @IsString()
  message: string;

  @ApiProperty()
  @IsString()
  error: string;
}
