import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Trait {
  constructor(trait: Partial<Trait> = {}) {
    Object.assign(this, trait);
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
