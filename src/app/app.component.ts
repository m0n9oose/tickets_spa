import { Component }              from '@angular/core';
import { AuthenticationService }  from './_services/authentication.service'
import { User }                   from './_models/user'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  currentUser: User;

  constructor(private authenticationService: AuthenticationService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || "{}");
  }

  username() {
    return this.currentUser.first_name + ' ' + this.currentUser.last_name;
  }

  loggedIn() {
    if (localStorage.getItem('currentUser')) {
      return true;
    } else {
      return false;
    }
  }
}
