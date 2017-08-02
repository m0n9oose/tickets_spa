import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { User } from '../models/user';

@Injectable()
export class UserService {
  constructor(private http: Http) {}

  list() {
    return this.http.get('/users', this.headers()).map((response: Response) => response.json());
  }

  show(id: number) {
    return this.http.get('/users/' + id, this.headers()).map((response: Response) => response.json());
  }

  create(user: User) {
    return this.http.post('/users', user, this.headers()).map((response: Response) => response.json());
  }

  update(user: User) {
    return this.http.put('/users/' + user.id, user, this.headers()).map((response: Response) => response.json());
  }

  delete(id: number) {
    return this.http.delete('/users/' + id, this.headers()).map((response: Response) => response.json());
  }

  // private helper methods

  private headers() {
    // create authorization header with token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new Headers({
        'X-User-Email': currentUser.email,
        'X-User-Token': currentUser.token
      });
      return new RequestOptions({
        headers: headers
      });
    }
  }
}
