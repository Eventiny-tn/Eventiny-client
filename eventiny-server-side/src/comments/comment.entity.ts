import { Event } from 'src/event/event.entity';
import { User } from 'src/user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('varchar', { length: 255 })
  comment: string;

  @ManyToOne(() => User, (user) => user.comments)
  commentator: User;

  @ManyToOne(() => Event, (event) => event.comments)
  event: Event;
}
export interface Comment {
  comment: string;
}
