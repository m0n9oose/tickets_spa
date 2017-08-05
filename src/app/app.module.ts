import { BrowserModule }          from '@angular/platform-browser';
import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';
import { FormsModule }            from '@angular/forms';
import {
  HttpModule,
  BaseRequestOptions
} from '@angular/http';

import { AppComponent }           from './app.component';
import { routing }                from './app.routing';

import { TicketsListComponent }   from './tickets-list/tickets-list.component';
import { TicketComponent }        from './ticket/ticket.component';
import { NewTicketComponent }     from './new-ticket/new-ticket.component';
import { LoginComponent }         from './login/login.component';
import { AlertComponent }         from './alert/alert.component';
import { PageNotFoundComponent }  from './page-not-found/page-not-found.component';
import { Ticket }                 from './_models/ticket';
import { User }                   from './_models/user';
import { AuthGuard }              from './_guards/auth.guard';
import { AlertService }           from './_services/alert.service';
import { AuthenticationService }  from './_services/authentication.service';
import { UserService }            from './_services/user.service';
import { SubjectService }         from './_services/subject.service';
import { TicketService }          from './_services/ticket.service';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    LoginComponent,
    TicketComponent,
    TicketsListComponent,
    PageNotFoundComponent,
    NewTicketComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    TicketService,
    SubjectService,
    HttpModule,
    BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}
