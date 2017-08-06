import { Injectable } from '@angular/core';
import {
  Http,
  Headers,
  RequestOptions,
  Response,
  URLSearchParams
} from '@angular/http';
import 'rxjs/add/operator/map';
import { Ticket } from '../_models/ticket';

@Injectable()
export class TicketService {
  constructor(private http: Http) {}

  list(page: number) {
    return this.http.get(
      'http://localhost:3000/tickets',
      this.options(page)
    ).map((response: Response) => response.json()['listing']);
  }

  create(ticket: Ticket) {
    return this.http.post(
      'http://localhost:3000/tickets',
      { ticket: ticket },
      this.options()
    ).map((response: Response) => response.json());
  }

  update(ticket: Ticket) {
    return this.http.put(
      'http://localhost:3000/tickets/' + ticket.id,
      { ticket: ticket },
      this.options()
    ).map((response: Response) => response.json());
  }

  delete(id: number) {
    return this.http.delete(
      'http://localhost:3000/tickets/' + id,
      this.options()
    ).map((response: Response) => response.json());
  }

  show(id: number) {
    return this.http.get(
      'http://localhost:3000/tickets/' + id,
      this.options()
    ).map((response: Response) => response.json()['ticket']);
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
