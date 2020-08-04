import { Component, OnInit } from '@angular/core';
import { Unit } from './Unit';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AuthenticationService} from '../auth/auth.service';


@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.scss']
})
export class UnitsComponent implements OnInit {
  units: Observable<Unit[]>;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.units = this.http.get<Unit[]>(`${environment.api}/units`);
    /*
    this.unit = {
      id: 1,
      unitName: 'Big Badda Booms',
      experience: 'Green',
      equipment: 'Heavy',
      ancestry: 'Human',
      unitType: 'Infantry',
      unitSize: 10,
      abilities: [
        {
          id: 1,
          abilityName: 'Bang',
          description: 'Rooty tooty point and shooty'
        },
        {
          id: 2,
          abilityName: 'Boom',
          description: 'Kersploooooode!'
        }
      ]
    };
    this.units = [
      {
        id: 1,
        unitName: 'Big Badda Booms',
        equipment: 'Heavy',
        ancestry: 'Human',
        unitType: 'Infantry',
        unitSize: 10
      },
      {
        id: 2,
        unitName: 'Lil Noobs',
        equipment: 'Light',
        ancestry: 'Human',
        unitType: 'Archers',
        unitSize: 4
      },
      {
        id: 3,
        unitName: 'Filthy Neutrals',
        equipment: 'Medium',
        ancestry: 'Human',
        unitType: 'Cavalry',
        unitSize: 6
      },
    ];*/
  }

}
