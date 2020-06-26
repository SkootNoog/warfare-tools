import {Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {UnitsController} from './units.controller';
import {UnitsService} from './units.service';
import {Unit} from './unit.entity';
import {Ancestry} from '../ancestrys/ancestry.entity';
import {Order} from '../orders/order.entity';
import {Trait} from '../traits/traits.entity';
import {User} from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Unit, Ancestry, Order, Trait, User])],
  controllers: [UnitsController],
  providers: [UnitsService],
})

export class UnitsModule{}
