import { Injectable } from '@angular/core';
import {
  Http,
  Headers,
  RequestOptions,
  Response
} from '@angular/http';
import 'rxjs/add/operator/map';
import { Ticket } from '../_models/ticket';

@Injectable()
export class TicketService {
  constructor(private http: Http) {}

  list() {
    return this.http.get('http://localhost:3000/tickets', this.headers()).map((response: Response) => response.json()['tickets']);
  }

  create(ticket: Ticket) {
    return this.http.post('http://localhost:3000/tickets', { ticket: ticket }, this.headers()).map((response: Response) => response.json());
  }

  update(ticket: Ticket) {
    return this.http.put('http://localhost:3000/tickets/' + ticket.id, { ticket: ticket }, this.headers()).map((response: Response) => response.json());
  }

  delete(id: number) {
    return this.http.delete('http://localhost:3000/tickets/' + id, this.headers()).map((response: Response) => response.json());
  }

  loadAnswers(id: number) {
    return this.http.get('http://localhost:3000/tickets/' + id + '/answers', this.headers()).map((response: Response) => response.json()['answers']);
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
