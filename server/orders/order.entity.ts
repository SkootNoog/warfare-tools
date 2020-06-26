import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Order {
  constructor(order: Partial<Order> = {}) {
    Object.assign(this, order);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  cost: number;

}
