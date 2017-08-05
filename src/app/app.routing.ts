import { Routes, RouterModule }   from '@angular/router';

import { TicketComponent }        from './ticket/ticket.component';
import { NewTicketComponent }     from './new-ticket/new-ticket.component';
import { AppComponent }           from './app.component';
import { LoginComponent }         from './login/login.component';
import { TicketsListComponent }   from './tickets-list/tickets-list.component';
import { PageNotFoundComponent }  from './page-not-found/page-not-found.component';
import { AuthGuard }              from './_guards/auth.guard';

const appRoutes: Routes = [
  {
    path: 'tickets',
    component: TicketsListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tickets/new',
    component: NewTicketComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tickets/:id',
    component: TicketComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: 'tickets',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

export const routing = RouterModule.forRoot(appRoutes, { enableTracing: true });
