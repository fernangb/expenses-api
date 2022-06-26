import { BadRequestException } from '@nestjs/common';

export class InvalidLoginCredentialsException extends BadRequestException {
  constructor() {
    super('Email or password is invalid');
  }
}
