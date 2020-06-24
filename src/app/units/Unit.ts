import {Ability} from './Ability';

export interface Unit {
  id: number;
  unitName: string;
  experience: string;
  ancestry: string;
  equipment: string;
  unitType: string;
  unitSize: number;
  // abilities: Ability[];
}
