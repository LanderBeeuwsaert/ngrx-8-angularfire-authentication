import { filter, map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../store';
import {AuthenticationState} from '../store/authentication';


@Injectable()
export class UnauthGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.store.select('authentication').pipe(
      filter(authentication => authentication && !authentication.isLoading),
      map((authentication: AuthenticationState) => {
        if (!authentication.uid) return true;
        else {
          this.router.navigate(['/items']);
          return false;
        }
      })
    );
  }
}
