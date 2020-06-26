import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { IsEmail, IsDate} from 'class-validator';
import {Army} from '../armys/army.entity';
import {Unit} from '../units/unit.entity';
import {Ancestry} from '../ancestrys/ancestry.entity';
import {Trait} from '../traits/traits.entity';
import {Order} from '../orders/order.entity';

export enum UserRole {
  ADMIN = 'admin',
  MOD = 'moderator',
  NONE = 'none'
}

@Entity()
export class User {
  constructor(user: Partial<User> = {}) {
    Object.assign(this, user);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail()
  email: string;

  @Column({type: 'varchar', length: 20, unique: true})
  username: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.NONE
  })
  role: UserRole;

  @OneToMany(type => Army, army => army.user)
  armys: Army[];

  @OneToMany(type => Unit, unit => unit.owner)
  ownedUnits: Unit[];

  @ManyToMany(type => Unit, unit => unit.users)
  @JoinTable({name: 'user_units'})
  units: Unit[];

  @ManyToMany(type => Ancestry)
  @JoinTable({name: 'user_ancestrys'})
  ancestrys: Ancestry[];

  @ManyToMany(type => Trait)
  @JoinTable({name: 'user_traits'})
  traits: Trait[];

  @ManyToMany(type => Order)
  @JoinTable({name: 'user_orders'})
  orders: Order[];

  @ManyToMany(type => User)
  @JoinTable({name: 'user_friends'})
  friends: User[];
}
