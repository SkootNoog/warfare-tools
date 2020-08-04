import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Unit} from './units/Unit';
import {Observable} from 'rxjs';
import {User} from './login/User';
import {AuthenticationService} from './auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent{
  currentUser: User;

  units: Observable<Unit[]>;

  constructor(private http: HttpClient,
              private router: Router,
              private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
  title = 'Warfare Tools';


  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  getUnits() {
    this.units = this.http.get<Unit[]>( 'http://localhost:4200/api/units');
  }
}
