import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Ancestry} from './ancestry.entity';

@Injectable()
export class AncestrysService {
  constructor(
    @InjectRepository(Ancestry)
    private readonly AncestrysRepository: Repository<Ancestry>,
  ) {



  }


}
