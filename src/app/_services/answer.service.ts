import { Injectable } from '@angular/core';
import {
  Http,
  Headers,
  RequestOptions,
  Response
} from '@angular/http';
import 'rxjs/add/operator/map';
import { Answer } from '../_models/answer';

@Injectable()
export class AnswerService {
  constructor(private http: Http) {}

  list(ticket_id: number) {
    return this.http.get('http://localhost:3000/tickets/' + ticket_id + '/answers', this.headers()).map((response: Response) => response.json()['answers']);
  }

  create(ticket_id: number, answer: Answer) {
    return this.http.post('http://localhost:3000/tickets/' + ticket_id + '/answers', { answer: answer }, this.headers()).map((response: Response) => response.json());
  }

  update(answer: Answer) {
    return this.http.put('http://localhost:3000/answers/' + answer.id, { answer: answer }, this.headers()).map((response: Response) => response.json());
  }

  delete(id: number) {
    return this.http.delete('http://localhost:3000/answers/' + id, this.headers()).map((response: Response) => response.json());
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
