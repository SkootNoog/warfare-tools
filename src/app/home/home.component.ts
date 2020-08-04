import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../login/User';
import { AuthenticationService} from '../auth/auth.service';
import {LoginService} from '../login/login.service';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
  loading = false;
  users: User[];

  constructor(private userService: LoginService) { }

  ngOnInit() {
    this.loading = true;
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.loading = false;
      this.users = users;
    });
  }
}
