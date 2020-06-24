import {Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import { User } from '../users/user.entity';
import {Unit} from '../units/unit.entity';

@Entity()
export class Army {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => User, user => user.armys)
  user: User;

  @ManyToMany(type => Unit)
  @JoinTable()
  units: Unit[];
}
