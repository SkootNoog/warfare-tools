import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment} from '../../environments/environment';
import { User} from './User';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`${environment.api}/users`);
  }
}
