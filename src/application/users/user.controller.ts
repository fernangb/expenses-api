import { Controller, Post, Body, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserOutput } from './dto/user-output';
import ExceptionOutput from '../@shared/exceptions/dto/exception-output';

@Controller('users')
@ApiTags('User')
export class UserController {
  private logger = new Logger('User');

  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({
    status: 201,
    description: 'Created user',
    type: UserOutput,
  })
  @ApiBadRequestResponse({
    description: 'It happens when some data is invalid',
    type: ExceptionOutput,
  })
  create(@Body() createUserDto: CreateUserDto) {
    try {
      return this.userService.create(createUserDto);
    } catch (error) {
      this.logger.error(`[create] error: ${error.message}`);
    }
  }
}
