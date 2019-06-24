import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {AuthenticationState, googleLoginAttempt, logoutAttempt} from '../../store/authentication';

import { AppState } from '../../store';
import {filter} from 'rxjs/operators';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {Router} from '@angular/router';
//import { authentication } from '../../store/authentication';

@Component({
  selector: 'auth-controller',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.css']
})
export class TitlebarComponent {
//infoMessages$: Observable<string[]>;

  localAuthenticationString: string;

  constructor(
    private store: Store<AppState>,
    private router: Router
    ) {
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
  logout() {
    this.store.dispatch(logoutAttempt());

    this.store.select('authentication').pipe(filter((authentication: AuthenticationState) => !authentication.isLoading), untilDestroyed(this)).subscribe((authentication: AuthenticationState) => {
      this.router.navigate(['login']);
    });
  }

  ngOnDestroy() {}
}
