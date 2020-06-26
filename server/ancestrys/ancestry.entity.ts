import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Ancestry {
  constructor(ancestry: Partial<Ancestry> = {}) {
    Object.assign(this, ancestry);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
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
  cost: number;

}
