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

  list(ticket_id: number, page: number) {
    return this.http.get(
      'http://localhost:3000/tickets/' + ticket_id + '/answers',
      this.options(page)
    ).map((response: Response) => response.json()['listing']);
  }

  create(ticket_id: number, answer: Answer) {
    return this.http.post(
      'http://localhost:3000/tickets/' + ticket_id + '/answers',
      { answer: answer },
      this.options()
    ).map((response: Response) => response.json());
  }

  update(answer: Answer) {
    return this.http.put(
      'http://localhost:3000/answers/' + answer.id,
      { answer: answer },
      this.options()
    ).map((response: Response) => response.json());
  }

  delete(id: number) {
    return this.http.delete(
      'http://localhost:3000/answers/' + id,
      this.options()
    ).map((response: Response) => response.json());
  }

  private options(page?: number) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let headers = new Headers();
    let params: URLSearchParams = new URLSearchParams();
    if (currentUser && currentUser.token) {
      headers.set('X-User-Email', currentUser.email)
      headers.set('X-User-Token', currentUser.token)
    }
    if (page && page > 1) {
      params.set('page', page.toString());
    }
    return new RequestOptions({
      headers: headers,
      params: params,
    });
  }
}
