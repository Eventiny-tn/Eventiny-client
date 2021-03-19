// import {
//   Entity,
//   Column,
//   PrimaryGeneratedColumn,
//   ManyToMany,
//   JoinTable,
// } from 'typeorm';
// import { Event } from '../event/event.entity';
// @Entity('category')
// export class Category {
//   @PrimaryGeneratedColumn()
//   id: number;
//   @Column({ length: 25 })
//   name: string;

//   @ManyToMany((type) => Event, { cascade: true })
//   @JoinTable({
//     name: 'Event_Category',
//     joinColumn: { name: 'event_id', referencedColumnName: 'id' },
//     inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' },
//   })
//   Event: Event[];
// }
// export interface CategoryType {
//   id: number;
//   name: string;
// }
import { Event } from './../event/event.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 25 })
  name: string;
  @Column()
  image: string;
  @Column({ type: 'text' })
  description: string;

  @ManyToMany((type) => Event, (event) => event.categories)
  event: Event[];
  // @ManyToMany(() => Events, { cascade: true })
  // @JoinTable({
  //   name: 'event_category',
  //   joinColumn: { name: 'event_id', referencedColumnName: 'id' },
  //   inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' },
  // })
  // event: Events[];
}
export interface CategoryType {
  name: string;
  image: string;
  description: string;
}