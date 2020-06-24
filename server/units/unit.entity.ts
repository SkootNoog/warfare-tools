import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable, ManyToMany} from 'typeorm';
import {Ancestry} from '../ancestrys/ancestry.entity';
import {Order } from '../orders/order.entity';
import {User} from '../users/user.entity';
import {Trait} from '../traits/traits.entity';

@Entity()
export class Unit {
  constructor(unit: Partial<Unit> = {}) {
    Object.assign(this, unit);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 40, nullable: true})
  name: string;

  @Column()
  attack: number;

  @Column()
  power: number;

  @Column()
  morale: number;

  @Column()
  defense: number;

  @Column()
  toughness: number;

  @Column()
  size: number;

  @ManyToOne(type => Ancestry, {
    eager: true,
    cascade: ['insert', 'update']
  })
  ancestry: Ancestry;

  @Column()
  experience: string;

  @Column()
  equipment: string;

  @Column()
  unitType: string;

  @Column()
  cost: number;

  @Column()
  ownerId: number;

  @ManyToOne(type => User, user => user.ownedUnits)
  owner: User;

  @ManyToMany(type => User)
  @JoinTable()
  users: User[];

  @ManyToMany(type => Trait, {
    eager: true,
    cascade: ['insert', 'update']
  })
  @JoinTable()
  traits: Trait[];

  @ManyToMany(type => Order, {
    eager: true,
    cascade: ['insert', 'update']
  })
  @JoinTable()
  orders: Order[];


}
