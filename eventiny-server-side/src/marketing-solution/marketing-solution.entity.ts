import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('marketing_solution')
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

export interface MarketingSolutioninfo {
  pagename: string;
  pagelink: string;
  price: string;
  userId: number;
}
