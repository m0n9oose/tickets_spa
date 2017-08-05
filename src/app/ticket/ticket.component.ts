import { Component, OnInit }  from '@angular/core';
import { ActivatedRoute }     from '@angular/router';
import { Ticket }             from '../_models/ticket';
import { Answer }             from '../_models/answer';
import { User }               from '../_models/user';
import { UserService }        from '../_services/user.service';
import { TicketService }      from '../_services/ticket.service';

@Component({
  templateUrl: 'ticket.component.html',
})


export class TicketComponent implements OnInit {
  id: number;
  private sub: any;
  answers: Answer[] = [];

  constructor(
    private ticketService: TicketService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = + params['id']; // (+) converts string 'id' to a number
    // In a real app: dispatch action to load the details here.
    });
    this.loadAnswers();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private loadAnswers() {
    this.ticketService.loadAnswers(this.id).subscribe(answers => { this.answers = answers; });
  }
}
