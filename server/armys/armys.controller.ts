import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {ArmysService} from './armys.service';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';
import {AuthUser} from '../users/user.decorator';
import {CreateArmyDto} from './dto/create-army.dto';
import {Army} from './army.entity';
import {User} from '../users/user.entity';
import {Unit} from '../units/unit.entity';

@Controller('armys')
export class ArmysController {
  constructor(private armysService: ArmysService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createArmy(
    @AuthUser() user: User,
    @Body() army: CreateArmyDto
  ): Promise<Army> {
    return this.armysService.createArmy(user, army);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  updateArmy(
    @Param(':id') armyId: string,
    @AuthUser() user: User,
    @Body() army: CreateArmyDto,
    @Body('units') units: Unit[]
  ): Promise<Army> {
    return this.armysService.updateArmy(+armyId, user, army, units);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllArmys(
    @AuthUser() user: User
  ): Promise<Army[]>{
    return this.armysService.getAllArmys(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getArmy(
    @Param('id') armyId: string,
    @AuthUser() user: User
  ): Promise<Army> {
    return this.armysService.getArmy(+armyId);
  }

}
