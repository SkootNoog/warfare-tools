
export interface UnitInterface {
  id: number;
  name: string;
  attack: number;
  power: number;
  morale: number;
  defense: number;
  toughness: number;
  size: number;
  experience: string;
  equipment: string;
  unitType: string;
  cost: number;
  ancestry?: AncestryRO;
  orders?: OrdersRO;
  traits?: TraitRO;
}

export interface AncestryRO {
  id: number;
  name: string;
  attack: number;
  power: number;
  morale: number;
  defense: number;
  toughness: number;
  cost: number;
}

export interface OrdersRO {
  id: number;
  name: string;
  description: string;
  cost: number;
}

export interface TraitRO {
  id: number;
  name: string;
  description: string;
  cost: number;
}
