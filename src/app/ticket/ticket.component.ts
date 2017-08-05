import { Component, OnInit }  from '@angular/core';
import { ActivatedRoute }     from '@angular/router';
import { Ticket }             from '../_models/ticket';
import { Answer }             from '../_models/answer';
import { User }               from '../_models/user';
import { UserService }        from '../_services/user.service';
import { TicketService }      from '../_services/ticket.service';
import { AnswerService }      from '../_services/answer.service';

@Component({
  templateUrl: 'ticket.component.html',
})


export class TicketComponent implements OnInit {
  id: number;
  private sub: any;
  answers: Answer[] = [];
  ticket: Ticket;

  constructor(
    private ticketService: TicketService,
    private answerService: AnswerService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = + params['id']; // (+) converts string 'id' to a number
    // In a real app: dispatch action to load the details here.
    });
    this.loadAnswers();
    this.loadTicket();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private loadAnswers() {
    this.answerService.list(this.id).subscribe(answers => { this.answers = answers; });
  }

  private loadTicket() {
    this.ticketService.show(this.id).subscribe(ticket => { this.ticket = ticket; });
  }
}
