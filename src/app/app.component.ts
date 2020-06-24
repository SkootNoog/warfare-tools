import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Unit} from './units/Unit';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent{

  units: Observable<Unit[]>;

  constructor(private http: HttpClient) {
  }
  title = 'Warfare Tools';

  getUnits() {
    this.units = this.http.get<Unit[]>( 'http://localhost:4200/api/units');
  }
}
