import {Injectable, NotFoundException} from '@nestjs/common';
import { uniqueNamesGenerator, adjectives, animals } from 'unique-names-generator';
import {CreateUnitDto} from './dto/create-unit.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {createQueryBuilder, Repository} from 'typeorm';
import { Unit } from './unit.entity';
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
    @InjectRepository(Unit) private readonly unitsRepository: Repository<Unit>,
    @InjectRepository(User) private readonly usersRepository: Repository<User>
  ) {}

  async createUnit(user: User,
                   unitData: CreateUnitDto,
                   ancestryData: CreateAncestryDto,
                   ordersData: CreateOrderDto[],
                   traitsData: CreateTraitDto[]
  ): Promise<Unit>{
    const unit = await this.unitCU(unitData, ancestryData, ordersData, traitsData, user, user.id);

    return this.unitsRepository.save(unit);
  }

  async getUnits(theUser: User
  ): Promise<Unit[]> {
    return await this.unitsRepository.find({ relations: ['users', 'ancestry', 'orders', 'traits']});
  }


  async getSingleUnit(id: number
  ): Promise<Unit>{
    return this.unitsRepository.findOne(id);
  }


  async updateUnit(id: number,
                   user: User,
                   unitData: CreateUnitDto,
                   ancestryData: CreateAncestryDto,
                   orders: CreateOrderDto[],
                   traits: CreateTraitDto[]
  ): Promise<Unit>{
    console.log(id);
    const unit = await this.unitCU(unitData, ancestryData, orders, traits);

    return this.unitsRepository.save(unit);
  }

  async remove(id: number): Promise<void> {
    await this.unitsRepository.delete(id);
  }

  /**
   * Apply unit data to unit entity before creating or updating the unit
   *
   * @param unitData - unit dto object
   * @param ancestryData - ancestry dto object
   * @param ordersData - orders dto object array
   * @param traitsData - traits dto object array
   * @param user - optional parameter, give the unit a user if created
   * @param ownerId - optional parameter, used to create unit but not to update
   */
  async unitCU(unitData: CreateUnitDto,
               ancestryData: CreateAncestryDto,
               ordersData: CreateOrderDto[],
               traitsData: CreateTraitDto[],
               user?: User,
               ownerId?: number
  ): Promise<Unit>{

    const unit = new Unit(unitData);

    if(ownerId) {
      unit.ownerId = ownerId;
      unit.owner = user;

      const addUser = new User(user);
      const users = [];
      users.push(addUser);
      unit.users = users;
    }

    if (ancestryData) {
      const ancestry = new Ancestry(ancestryData);
      unit.ancestry = ancestry;
    }

    if(ordersData && ordersData.length !== 0) {
      const orders = [];

      for (const orderD of ordersData) {
        const order = new Order(orderD);
        orders.push(order);
      }

      unit.orders = orders;
    }
    else{
      unit.orders = [];
    }

    if(traitsData && traitsData.length !== 0) {
      const traits = [];

      for (const traitD of traitsData) {
        const trait = new Trait(traitD);
        traits.push(trait);
      }

      unit.traits = traits;
    }
    else{
      unit.traits = [];
    }

    return unit;
  }
}
