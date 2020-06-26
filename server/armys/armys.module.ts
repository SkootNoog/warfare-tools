import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from '../users/user.entity';
import {Army} from './army.entity';
import {ArmysController} from './armys.controller';
import {ArmysService} from './armys.service';
import {Unit} from '../units/unit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Army, User, Unit])],
  controllers: [ArmysController],
  providers: [ArmysService],
})

export class ArmysModule{}
