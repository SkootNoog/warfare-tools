import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from '../users/user.entity';
import {Army} from './army.entity';
import {Unit} from '../units/unit.entity';
import {CreateArmyDto} from './dto/create-army.dto';

@Injectable()
export class ArmysService {
  constructor(
    @InjectRepository(Army) private readonly armyRepository: Repository<Army>,
    @InjectRepository(Unit) private readonly unitsRepository: Repository<Unit>,
    @InjectRepository(User) private readonly usersRepository: Repository<User>
  ) {}

  async createArmy(user: User,
                   armyData: CreateArmyDto
  ): Promise<Army>{
    const army = new Army(armyData);
    army.user = user;
    return this.armyRepository.save(army);
  }

  async updateArmy(armyId: number,
                   user: User,
                   armyData: CreateArmyDto,
                   units: Unit[]
  ): Promise<Army>{
    const army = new Army(armyData);

    army.units = units;

    return this.armyRepository.save(army);
  }

  async getArmy(armyId: number
  ): Promise<Army>{

    return this.armyRepository.findOne(armyId);
  }

  async getAllArmys(userA: User
  ): Promise<Army[]>{

    return this.armyRepository.find({where: {user: userA}});
  }

}
