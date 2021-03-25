import { Images } from '../images/images.entity';
import { Category } from 'src/category/category.entity';
import { User } from 'src/user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  OneToMany,
} from 'typeorm';
// import { Participant } from 'src/participant/participant.entity';
@Entity('event')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 25 })
  name: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  time: string;
  @Column({ default: false })
  dateStart: string;
  @Column({ default: false })
  dateEnds: string;
  @Column()
  location: string;
  @Column({ default: 'Free' })
  price: string;
  @Column()
  caption: string;
  @Column()
  cover: string;
  @Column()
  ticket: number;

  @Column({ default: false })
  pending: boolean;

  @ManyToMany(() => Category, { cascade: true })
  @JoinTable({
    name: 'event_category',
    joinColumn: { name: 'category_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'event_id', referencedColumnName: 'id' },
  })
  categories: Category[];

  @ManyToOne(() => User, (user) => user.events)
  user: User;


  @ManyToMany(() => User,(user)=>user.event , { cascade: true })
  @JoinTable({
    name: 'participant',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'event_id', referencedColumnName: 'id' },
  })
  participants: User[];

  @OneToMany(() => Images, (image) => image.images)
  images: Images[];
  // @OneToMany(() => Participant, (participant) => participant.events)
  // participants: Participant[];
  constructor(
    name: string,
    time: string,
    dateStart: string,
    dateEnds: string,
    location: string,
    price: string,
    caption: string,
    cover: string,
    ticket: number,
  ) {
    this.name = name;
    this.time = time;
    this.dateStart = dateStart;
    this.dateEnds = dateEnds;
    this.location = location;
    this.price = price;
    this.caption = caption;
    this.cover = cover;
    this.ticket = ticket;
  }
}
