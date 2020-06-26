import {Controller, Post, Body, Get, Param, Patch, Delete, Query, UseGuards} from '@nestjs/common';
import {UnitsService} from './units.service';
import {Unit} from './unit.entity';
import {CreateUnitDto} from './dto/create-unit.dto';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';
import {UnitInterface} from './unit.interface';
import {AuthUser} from '../users/user.decorator';
import {User} from '../users/user.entity';
import {CreateAncestryDto} from '../ancestrys/dto/create-ancestry.dto';
import {CreateOrderDto} from '../orders/dto/create-order.dto';
import {CreateTraitDto} from '../traits/dto/create-trait.dto';


@Controller('units')
export class UnitsController {
  constructor(private unitsService: UnitsService) {
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createUnit(
    @AuthUser() user: User,
    @Body() unit: CreateUnitDto,
    @Body('ancestry') ancestry: CreateAncestryDto,
    @Body('orders') orders: CreateOrderDto[],
    @Body('traits') traits: CreateTraitDto[]
  ): Promise<Unit> {
    return this.unitsService.createUnit(user, unit, ancestry, orders, traits);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllUnits(
    @AuthUser() user: User
  ): Promise<Unit[]>{
    return this.unitsService.getUnits(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getUnit(
    @Param('id') unitId: string
  ): Promise<Unit> {
    return this.unitsService.getSingleUnit(+unitId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateUnit(
    @Param('id') unitId: string,
    @AuthUser() user: User,
    @Body() unit: Unit,
    @Body('ancestry') ancestry: CreateAncestryDto,
    @Body('orders') orders: CreateOrderDto[],
    @Body('traits') traits: CreateTraitDto[]
  ): Promise<Unit> {
    console.log(+unitId);
    return this.unitsService.updateUnit( +unitId, user, unit, ancestry, orders, traits);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') unitId: string): Promise<void> {
    return this.unitsService.remove(+unitId);
  }
}
