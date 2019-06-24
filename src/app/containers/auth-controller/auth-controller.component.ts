import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {AuthenticationState, googleLoginAttempt, logoutAttempt} from '../../store/authentication';

import { AppState } from '../../store';
import {filter} from 'rxjs/operators';
import {untilDestroyed} from 'ngx-take-until-destroy';
//import { authentication } from '../../store/authentication';

@Component({
  selector: 'auth-controller',
  templateUrl: './auth-controller.component.html',
  styleUrls: ['./auth-controller.component.css']
})
export class AuthControllerComponent {
//infoMessages$: Observable<string[]>;

  localAuthenticationString: string;

  constructor(private store: Store<AppState>) {
    //  this.infoMessages$ = this.store.pipe(select(infoMessage))
  }

  ngOnInit() {
    this.store
        .select('authentication')
        // .pipe(filter(acUser => acUser && acUser.uid && !acUser.isLoading), untilDestroyed(this))
        .pipe(untilDestroyed(this))
        .subscribe(async (authentication: AuthenticationState) => {
          console.log('auth controller subscription', authentication);
          this.localAuthenticationString = JSON.stringify(authentication);
        });
  }

  login() {
    this.store.dispatch(googleLoginAttempt());
  }

  logout() {
    this.store.dispatch(logoutAttempt());
  }

  ngOnDestroy() {

  }
}
