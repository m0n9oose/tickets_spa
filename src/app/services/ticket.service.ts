import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Ticket } from '../models/ticket';

@Injectable()
export class TicketService {
  constructor(private http: Http) {}

  list() {
    return this.http.get('/tickets', this.headers()).map((response: Response) => response.json());
  }

  show(id: number) {
    return this.http.get('/tickets/' + id, this.headers()).map((response: Response) => response.json());
  }

  create(ticket: Ticket) {
    return this.http.post('/tickets', ticket, this.headers()).map((response: Response) => response.json());
  }

  update(ticket: Ticket) {
    return this.http.put('/tickets/' + ticket.id, ticket, this.headers()).map((response: Response) => response.json());
  }

  delete(id: number) {
    return this.http.delete('/tickets/' + id, this.headers()).map((response: Response) => response.json());
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
