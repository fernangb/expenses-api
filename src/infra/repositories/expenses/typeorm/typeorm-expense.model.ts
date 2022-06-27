import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TypeormUserModel } from '../../users/typeorm/typeorm-user.model';

@Entity({ name: 'expenses' })
export class TypeormExpenseModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  value: number;

  @Column({ name: 'due_date' })
  dueDate: Date;

  @Column({ name: 'is_active' })
  isActive: Date;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => TypeormUserModel, (model) => model.name, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: TypeormUserModel;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
