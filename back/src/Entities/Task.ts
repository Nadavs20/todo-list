import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("tasks")
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 255 })
  description: string;

  @Column("date")
  dueDate: string;

  @Column("varchar", { length: 50 })
  status: string;
}
