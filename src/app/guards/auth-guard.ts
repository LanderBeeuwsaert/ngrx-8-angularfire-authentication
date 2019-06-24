import { filter, map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Store} from '@ngrx/store';
import {AuthenticationState} from '../store/authentication';
import {AppState} from '../store';

@Injectable()
export class AuthGuard implements CanActivate {
  notActivatedPath: string = null;
  params: any = null;

  constructor(private router: Router, private store: Store<AppState>) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select('authentication').pipe(
      filter(authentication => authentication && !authentication.isLoading),
      map((authentication: AuthenticationState) => {
        // console.log('authguard: ', acUser);
        if (authentication.uid) return true;
        else {
          // this.comm.errorTitle = 'UNAUTHORIZED ACCESS';
          // this.comm.errorText = 'You are trying to access a part of the application that requires you to be logged in.';
          this.router.navigate(['/error']);
          return false;
        }
      })
    );
  }
}
