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
  phone: number;
  @Column()
  birthday: string;
  @Column()
  city: string;
}

export interface Userinfo {
  username: string;
  password: string;
  email: string;
  address: string;
  address2: string;
  phone: number;
  birthday: string;
  city: string;
}
