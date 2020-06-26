import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Ancestry} from './ancestry.entity';
import {User} from '../users/user.entity';
import {CreateAncestryDto} from './dto/create-ancestry.dto';

@Injectable()
export class AncestrysService {
  constructor(
    @InjectRepository(Ancestry) private readonly ancestrysRepository: Repository<Ancestry>,
    @InjectRepository(User) private readonly usersRepository: Repository<User>
  ) {}

  async createAncestry(user: User,
                       ancestryData: CreateAncestryDto
  ): Promise<Ancestry>{
    const ancestry = new Ancestry(ancestryData);
    return this.ancestrysRepository.save(ancestry);
  }

  async updateAncestry(id: number,
                       user: User,
                       ancestryData: CreateAncestryDto
  ): Promise<Ancestry>{
    const ancestry = new Ancestry(ancestryData);

    await this.ancestrysRepository.update(id, ancestry);
    return this.ancestrysRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.ancestrysRepository.delete(id);
  }

}
