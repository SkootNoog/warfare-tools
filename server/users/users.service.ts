import {BadRequestException, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import {UpdateUserDto} from './dto/update-user.dto';
import * as bcrypt from 'bcrypt-nodejs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User(createUserDto);
    const salt = bcrypt.genSaltSync(10);

    user.password = bcrypt.hashSync(createUserDto.password, salt);
    try {
      return await this.usersRepository.save(user);
    }
    catch (error){
      throw new BadRequestException(error);
    }
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(username: string): Promise<User> {
    return await this.usersRepository.findOne({username});
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOne(id);

    user.email = updateUserDto.email || user.email;
    user.username = updateUserDto.username || user.username;

    if(updateUserDto.password){
      user.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    return this.usersRepository.save(user);
  }
}
