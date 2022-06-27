import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import ExceptionOutput from '../@shared/exceptions/dto/exception-output';
import { AuthService } from './auth.service';
import { LoginInputDto } from './dto/login-input.dto';
import { LoginOutput } from './dto/login-output.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: 'Login into the API' })
  @ApiResponse({
    status: 201,
    description: 'Login response',
    type: LoginOutput,
  })
  @ApiResponse({
    description: 'It happens when some data of credentials is invalid',
    status: 401,
    type: ExceptionOutput,
  })
  login(@Body() createAuthDto: LoginInputDto) {
    return this.authService.login(createAuthDto);
  }
}
