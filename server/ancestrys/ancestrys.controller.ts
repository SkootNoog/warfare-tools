import {Controller} from '@nestjs/common';
import {AncestrysService} from './ancestrys.service';

@Controller('units')
export class AncestrysController {
  constructor(private ancestrysService: AncestrysService) {}


}
