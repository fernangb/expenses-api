import { UnauthorizedException } from '@nestjs/common';

export class InvalidLoginCredentialsException extends UnauthorizedException {
  constructor() {
    super('Email or password is invalid');
  }
}
