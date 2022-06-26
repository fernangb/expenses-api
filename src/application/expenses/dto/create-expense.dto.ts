export class CreateExpenseDto {
  name: string;
  description?: string;
  value: number;
  dueDate: Date;
  userId: string;
}
