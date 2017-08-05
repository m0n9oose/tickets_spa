import { Component, OnInit }      from '@angular/core';

import { AuthenticationService }  from './_services/authentication.service'
import { TicketService }          from './_services/ticket.service'

import { User }                   from './_models/user'
import { Ticket }                 from './_models/ticket'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'AppComponent Title';
  currentUser: User;
  tickets: Ticket[] = [];

  constructor(
    private authenticationService: AuthenticationService,
    private ticketService: TicketService) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser') || "{}");
    }

  ngOnInit() {
    this.loadTickets();
  }

  private loadTickets() {
    this.ticketService.list().subscribe(tickets => { this.tickets = tickets; });
  }
}
