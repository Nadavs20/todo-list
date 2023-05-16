import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("tasks")
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  dueDate: string;

  @Column()
  status: string;
}
