import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, Router }   from '@angular/router';
import { Subject }                  from '../_models/subject';
import { SubjectService }           from '../_services/subject.service'
import { TicketService }            from '../_services/ticket.service'
import { AlertService }             from '../_services/alert.service'

@Component({
  templateUrl: 'new-ticket.component.html',
})


export class NewTicketComponent implements OnInit {
  subjects: Subject[] = [];
  model: any = {};
  errorMessage: String;
  loading = false;

  constructor(
    private subjectService: SubjectService,
    private ticketService: TicketService,
    private router: Router,
    private alertService: AlertService) {}

  ngOnInit() {
    this.loadAllSubjects();
  }

  submitTicket() {
    this.loading = true;
    this
      .ticketService
      .create(this.model)
      .subscribe(
        res => {
          this.alertService.success('Ticket saved');
          this.router.navigate(['tickets']);
        },
        err => {
          let msg = err.json()['errors'][0];
          this.alertService.error(msg);
          console.log(msg);
          this.loading = false;
        }
      );
  }

  private loadAllSubjects() {
    this.subjectService.list().subscribe(subjects => { this.subjects = subjects; });
  }
}
