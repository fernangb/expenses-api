import { Controller, Post, Body } from '@nestjs/common';
import { SessionService } from './session.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SessionOutput } from './dto/session-output';

@Controller('sessions')
@ApiTags('Session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a session to authenticate a user' })
  @ApiResponse({
    status: 200,
    description: 'Login response',
    type: SessionOutput,
  })
  create(@Body() createSessionDto: CreateSessionDto) {
    return this.sessionService.create(createSessionDto);
  }
}
