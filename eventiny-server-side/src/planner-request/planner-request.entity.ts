import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('plannerRequest')
export class PlannerRequest {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nameoncard: string;
  @Column()
  creditcardnumber: number;
  @Column()
  expmonth: string;
  @Column()
  expyear: number;
  @Column()
  cvc: number;
  @Column()
  interest: string;
}

export interface PlannerRequestinfo {
  nameoncard: string;
  creditcardnumber: number;
  expmonth: string;
  expyear: number;
  cvc: number;
  interest: string;
}
