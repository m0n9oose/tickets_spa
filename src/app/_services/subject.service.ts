import { Injectable } from '@angular/core';
import {
  Http,
  Headers,
  RequestOptions,
  Response
} from '@angular/http';
import 'rxjs/add/operator/map';
import { Subject } from '../_models/subject';

@Injectable()
export class SubjectService {
  constructor(private http: Http) {}

  list() {
    return this.http.get('http://localhost:3000/subjects', this.headers()).map((response: Response) => response.json()['subjects']);
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
