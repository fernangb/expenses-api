import { v4 as uuidv4 } from 'uuid';

export abstract class UniqueEntityId {
  static create(): string {
    return uuidv4();
  }
}
