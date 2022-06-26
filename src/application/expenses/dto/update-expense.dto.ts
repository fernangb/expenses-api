export class UpdateExpenseDto {
  name: string;
  description?: string;
  value: number;
  dueDate: Date;
  userId: string;
}
