import { Component, OnInit }  from '@angular/core';
import { Ticket }             from '../_models/ticket';
import { User }               from '../_models/user';
import { UserService }        from '../_services/user.service';
import { TicketService }      from '../_services/ticket.service';

@Component({
  selector: 'tickets-list',
  templateUrl: 'tickets-list.component.html',
  styleUrls: ['tickets-list.component.css']
})

export class TicketsListComponent implements OnInit {
  currentUser: User;
  pagination: any = {};
  tickets: Ticket[] = [];

  constructor(
    private userService: UserService,
    private ticketService: TicketService) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

  ngOnInit() {
    this.loadAllTickets();
  }

  loadPage(page: number) {
    this.ticketService.list(page).subscribe(listing => {
      this.tickets = listing['tickets'];
      this.pagination = listing['pagination'];
    });
  }

  private loadAllTickets() {
    this.ticketService.list(1).subscribe(listing => {
      this.tickets = listing['tickets'];
      this.pagination = listing['pagination'];
    });
  }
}
