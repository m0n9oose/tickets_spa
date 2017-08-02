import { BrowserModule }          from '@angular/platform-browser';
import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';
import { FormsModule }            from '@angular/forms';
import {
  HttpModule,
  BaseRequestOptions
} from '@angular/http';

import { AppComponent }           from './app.component';
import { TicketsListComponent }   from './tickets-list.component';
import { TicketComponent }        from './ticket.component';
import { LoginComponent }         from './login.component';
import { AlertComponent }         from './alert.component';
import { PageNotFoundComponent }  from './page-not-found.component';
import { Ticket }                 from './models/ticket';
import { User }                   from './models/user';
import { AuthGuard }              from './auth.guard';
import { AlertService }           from './services/alert.service';
import { AuthenticationService }  from './services/authentication.service';
import { UserService }            from './services/user.service';
import { TicketService }          from './services/ticket.service';

const appRoutes: Routes = [
  {
    path: 'tickets',
    component: TicketsListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tickets/:id/answers',
    component: TicketComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    LoginComponent,
    TicketComponent,
    TicketsListComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    TicketService,
    HttpModule,
    BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}
