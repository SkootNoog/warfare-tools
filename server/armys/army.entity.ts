import {Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import { User } from '../users/user.entity';
import {Unit} from '../units/unit.entity';
import {IsNotEmpty} from 'class-validator';

@Entity()
export class Army {
  constructor(army: Partial<Army> = {}) {
    Object.assign(this, army);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column({
    nullable: true
  })
  description: string;

  @ManyToOne(type => User, user => user.armys)
  user: User;

  @Column({
    nullable: true
  })
  cost: number;

  @ManyToMany(type => Unit,{
    eager: true
  })
  @JoinTable({name: 'army_units'})
  units: Unit[];
}
