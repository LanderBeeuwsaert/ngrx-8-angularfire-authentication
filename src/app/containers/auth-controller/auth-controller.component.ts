import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { googleLoginAttempt, logout } from '../../store/authentication';

import { State } from '../../store';
//import { authentication } from '../../store/authentication';

@Component({
  selector: 'auth-controller',
  templateUrl: './auth-controller.component.html',
  styleUrls: ['./auth-controller.component.css']
})
export class AuthControllerComponent {
//infoMessages$: Observable<string[]>;

  constructor(private store: Store<State>) {
  //  this.infoMessages$ = this.store.pipe(select(infoMessage))
  }

  login() {
      this.store.dispatch(googleLoginAttempt);
  }
  
  logout() {
      this.store.dispatch(logout);
  }
}