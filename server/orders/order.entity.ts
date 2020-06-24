import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Order {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  cost: number;

}
