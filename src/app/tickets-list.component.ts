import { Component, OnInit } from '@angular/core';
import { Ticket }  from './models/ticket';
import { User } from './models/user';
import { UserService } from './services/user.service';
import { TicketService } from './services/ticket.service';

@Component({
  templateUrl: './views/tickets-list.component.html',
})

export class TicketsListComponent implements OnInit {
  currentUser: User;
  tickets: Ticket[] = [];

  constructor(private userService: UserService, private ticketService: TicketService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.loadAllTickets();
  }

  private loadAllTickets() {
    this.ticketService.list().subscribe(tickets => { this.tickets = tickets; });
  }
}
