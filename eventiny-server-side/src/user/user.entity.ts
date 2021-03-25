// import { Participant } from 'src/participant/participant.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Event } from '../event/event.entity';
@Entity('user')
@Unique(['username'])
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 25, default: null })
  username: string; //required
  @Column()
  firstname: string; //required
  @Column()
  lastname: string; //required
  @Column({ default: null })
  password: string; //required
  @Column()
  email: string; //required
  @Column({ default: null })
  address: string;
  @Column({ default: null })
  phone: string;
  @Column({ default: null })
  birthday: string;
  @Column({ default: null })
  city: string;
  @Column({ default: null })
  country: string;
  @Column({ default: null })
  postalcode: string;
  @Column({ default: null })
  userimg: string;
  @Column({ default: false })
  isBanned: boolean;
  @Column({ default: false })
  plannerDemand: boolean;
  @Column({ default: 0 })
  reportCounter: number;

  @OneToMany(() => Event, (event) => event.user)
  events: Event[];
  // @OneToMany(() => Participant, (participant) => participant.users)
  // participant: Participant[];
  @ManyToMany((type) => Event, (event) => event.participants)
  event: Event[];
}

export interface Userinfo {
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  address: string;
  phone: string;
  birthday: string;
  city: string;
  country: string;
  userimg: string;
  postalcode: string;
  isBanned: boolean;
  plannerDemand: boolean;
  reportCounter: number;
}

export interface UserLog {
  email: string;
  password: string;
}

export interface UserRelations {
  email: string;
  username: string;
}
