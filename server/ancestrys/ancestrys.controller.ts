import {Body, Controller, Param, Post, UseGuards} from '@nestjs/common';
import {AncestrysService} from './ancestrys.service';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';
import {AuthUser} from '../users/user.decorator';
import {CreateAncestryDto} from './dto/create-ancestry.dto';
import {Ancestry} from './ancestry.entity';
import {User} from '../users/user.entity';

@Controller('units')
export class AncestrysController {
  constructor(private ancestrysService: AncestrysService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createAncestry(
    @AuthUser() user: User,
    @Body() ancestry: CreateAncestryDto
  ): Promise<Ancestry> {
    return this.ancestrysService.createAncestry(user, ancestry);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  updateAncestry(
    @Param(':id') ancestryId: string,
    @AuthUser() user: User,
    @Body() ancestry: CreateAncestryDto
  ): Promise<Ancestry> {
    return this.ancestrysService.updateAncestry(+ancestryId, user, ancestry);
  }


}
