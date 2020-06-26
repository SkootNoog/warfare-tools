import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Ancestry} from './ancestry.entity';
import {User} from '../users/user.entity';
import {AncestrysController} from './ancestrys.controller';
import {AncestrysService} from './ancestrys.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ancestry, User])],
  controllers: [AncestrysController],
  providers: [AncestrysService],
})

export class AncestrysModule{}
