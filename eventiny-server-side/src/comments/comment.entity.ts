import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
@Entity('comments')
export class Comments {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar', { length: 255 })
  comment: string;
}
export interface Comment {
  comment: string;
}
