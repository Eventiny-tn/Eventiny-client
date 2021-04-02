import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('user')
export class MarketingSolution {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  pagename: string;
  @Column()
  pagelink: string;
  @Column()
  price: string;
  @Column()
  userId: number;
}
