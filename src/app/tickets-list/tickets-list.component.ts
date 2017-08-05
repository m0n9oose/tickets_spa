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
  tickets: Ticket[] = [];
  title = "Tickets";

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
