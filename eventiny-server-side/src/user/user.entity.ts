import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('user')
@Unique(['username'])
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 25 })
  username: string;
  @Column()
  password: string;
  @Column()
  email: string;
  @Column()
  address: string;
  @Column()
  address2: string;
  @Column()
  phone: string;
  @Column()
  birthday: string;
  @Column()
  city: string;
  @Column()
  isBanned: false;
  @Column()
  plannerDemand: false;
  @Column()
  reportCounter: 0;
}



export interface Userinfo {
  username: string;
  password: string;
  email: string;
  address: string;
  address2: string;
  phone: string;
  birthday: string;
  city: string;
}



export interface UserLog {
  email: string;
  password: string;
}

