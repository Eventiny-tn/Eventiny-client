import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Event } from '../event/event.entity';
@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 25 })
  name: string;

  @ManyToMany((type) => Event, { cascade: true })
  @JoinTable({
    name: 'Event_Category',
    joinColumn: { name: 'event_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' },
  })
  Event: Event[];
}
export interface CategoryType {
  id: number;
  name: string;
}
