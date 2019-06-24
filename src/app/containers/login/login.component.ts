import { Component, OnInit } from '@angular/core';
import {AuthenticationState, googleLoginAttempt} from '../../store/authentication';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {Store} from '@ngrx/store';
import {AppState} from '../../store';
import {filter} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private store: Store<AppState>,
    private router: Router,
  ) { }

  ngOnInit() {
    this.store
      .select('authentication')
      // .pipe(filter(acUser => acUser && acUser.uid && !acUser.isLoading), untilDestroyed(this))
      .pipe(untilDestroyed(this))
      .subscribe(async (authentication: AuthenticationState) => {
        // console.log('auth controller subscription', authentication);
        // this.localAuthenticationString = JSON.stringify(authentication);
      });
  }

  login() {
    this.store.dispatch(googleLoginAttempt());

    this.store.select('authentication').pipe(filter((authentication: AuthenticationState) => !authentication.isLoading), untilDestroyed(this)).subscribe((authentication: AuthenticationState) => {
      this.router.navigate(['items']);
    });
  }

  ngOnDestroy() {}
}
