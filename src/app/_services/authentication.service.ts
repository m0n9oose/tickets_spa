import { Injectable }               from '@angular/core';
import { Observable }               from 'rxjs/Observable';
import {
  Http,
  Headers,
  Response,
  RequestOptions
}  from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
  loggedin = false;

  constructor(private http: Http) {}

  login(email: string, password: string) {
    return this.http.post('http://localhost:3000/users/sign_in', JSON.stringify({
        user: {
          email: email,
          password: password
        }
      }), this.headers())
      .map((response: Response) => {
        let user = response.json()['user'];
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      });
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      this.loggedin = true;
    }
  }

  name() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser.first_name + ' ' + currentUser.last_name;
  }

  private headers() {
    let headers = new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    return new RequestOptions({
      headers: headers
    });
  }
}
