import { BadRequestException } from '@nestjs/common';

export class EmailAlreadyUsedException extends BadRequestException {
  constructor() {
    super('This email is already used');
  }
}
