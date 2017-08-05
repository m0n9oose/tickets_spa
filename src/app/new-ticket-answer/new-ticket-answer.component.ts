import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, Router }   from '@angular/router';
import { AnswerService }            from '../_services/answer.service'
import { AlertService }             from '../_services/alert.service'

@Component({
  templateUrl: 'new-ticket-answer.component.html',
})


export class NewTicketAnswerComponent implements OnInit {
  model: any = {};
  errorMessage: String;
  loading = false;
  ticket_id: number;
  private sub: any;

  constructor(
    private answerService: AnswerService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.ticket_id = + params['id']; // (+) converts string 'id' to a number
    // In a real app: dispatch action to load the details here.
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  submitAnswer() {
    this.loading = true;
    this
      .answerService
      .create(this.ticket_id, this.model)
      .subscribe(
        res => {
          this.router.navigate(['tickets', this.ticket_id]);
        },
        err => {
          let msg = err.json()['errors'][0];
          this.alertService.error(msg);
          console.log(msg);
          this.loading = false;
        }
      );
  }
}
