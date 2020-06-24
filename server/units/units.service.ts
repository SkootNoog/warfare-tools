import {Injectable, NotFoundException} from '@nestjs/common';
import { uniqueNamesGenerator, adjectives, animals } from 'unique-names-generator';
import {CreateUnitDto} from './dto/create-unit.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {createQueryBuilder, Repository} from 'typeorm';
import { Unit } from './unit.entity';
import {UnitInterface} from './unit.interface';
import {User} from '../users/user.entity';
import {Ancestry} from '../ancestrys/ancestry.entity';
import {Order} from '../orders/order.entity';
import {Trait} from '../traits/traits.entity';
import {CreateAncestryDto} from '../ancestrys/dto/create-ancestry.dto';
import {CreateOrderDto} from '../orders/dto/create-order.dto';
import {CreateTraitDto} from '../traits/dto/create-trait.dto';

@Injectable()
export class UnitsService {
  constructor(
    @InjectRepository(Unit) private readonly unitsRepository: Repository<Unit>
  ) {}

  async createUnit(user: User,
                   unitData: CreateUnitDto,
                   ancestryData: CreateAncestryDto,
                   orders: CreateOrderDto[],
                   traits: CreateTraitDto[]
  ): Promise<Unit>{
    const unit = new Unit();
    unit.name = unitData.name;
    unit.attack = unitData.attack;
    unit.power = unitData.power;
    unit.morale = unitData.morale;
    unit.defense = unitData.defense;
    unit.toughness = unitData.toughness;
    unit.size = unitData.size;
    unit.experience = unitData.experience;
    unit.equipment = unitData.equipment;
    unit.unitType = unitData.unitType;
    unit.cost = unitData.cost;
    unit.ownerId = user.id;
    unit.owner = user;

    console.log(user);

    const ancestry = new Ancestry();
    ancestry.name = ancestryData.name;
    ancestry.attack = ancestryData.attack;
    ancestry.power = ancestryData.power;
    ancestry.morale = ancestryData.morale;
    ancestry.defense = ancestryData.defense;
    ancestry.toughness = ancestryData.toughness;
    ancestry.cost = ancestryData.cost;

    unit.ancestry = ancestry;

    const orderArray = [];

    for( const newOrder of orders){
      const order = new Order();
      order.name = newOrder.name;
      order.description = newOrder.description;
      order.cost = newOrder.cost;

      orderArray.push(order);
    }
    unit.orders = orderArray;



    const traitArray = [];

    for (const newTrait of traits){
      const trait = new Trait();
      trait.name = newTrait.name;
      trait.description = newTrait.description;
      trait.cost = newTrait.cost;

      traitArray.push(trait);
    }
    unit.traits = traitArray;

    return this.unitsRepository.save(unit);
  }

  async getUnits(user: User): Promise<Unit[]>{
    return this.unitsRepository.find({where: {users: user}});
  }

  async getSingleUnit(id: number): Promise<Unit>{
    return this.unitsRepository.findOne(id);
  }

  async updateUnit(id: number,
                   user: User,
                   unitData: CreateUnitDto,
                   ancestryData: CreateAncestryDto,
                   orders: CreateOrderDto[],
                   traits: CreateTraitDto[]
  ): Promise<Unit>{
    const unit = await this.unitsRepository.findOne(id);

    // unit.name = unitData.name || unit.name;
    // unit.attack = unitData.attack || unit.attack;
    // unit.power = unitData.power || unit.power;
    // unit.morale = unitData.morale || unit.morale;
    // unit.defense = unitData.defense || unit.defense;
    // unit.toughness = unitData.toughness || unit.toughness;
    // unit.size = unitData.size || unit.size;
    // unit.experience = unitData.experience || unit.experience;
    // unit.equipment = unitData.equipment || unit.equipment;
    // unit.unitType = unitData.unitType || unit.unitType;
    // unit.cost = unitData.cost || unit.cost;
    // unit.ancestry = Object.assign(unit.ancestry, unitData.ancestry || {});
    // unit.orders = Object.assign(unit.orders, unitData.orders || {});
    // unit.traits = Object.assign(unit.traits, unitData.traits || {});

    return this.unitsRepository.save(unit);
  }

  async remove(id: number): Promise<void> {
    await this.unitsRepository.delete(id);
  }
}
