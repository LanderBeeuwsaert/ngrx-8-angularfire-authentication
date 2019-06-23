import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {  EMPTY, from, Observable, of, throwError } from 'rxjs';
import { catchError, delay, map, mergeMap, switchMap, take, withLatestFrom } from 'rxjs/operators';

import { logInfo } from '../logger';
import { getAuthenticationData, authenticationDataRetrieved, notAuthenticationRetrieved, googleLoginAttempt, googleLoginSuccess, logout, userDataLoaded, authenticationError} from './authentication.actions';
import { AuthenticationState } from './authentication.state';
import { AngularFireAuth } from '@angular/fire/auth';

import { AuthenticationService } from '../../services/authentication.service';

@Injectable()
export class AuthenticationEffects {


  //@Effect()
  getUser = createEffect(
    () => this.actions.pipe(
      ofType(getAuthenticationData),

      map((action) => {}),
      switchMap((payload: any) =>
        this.afAuth.authState.pipe(
          // delay(2000), // delay to show loading spinner, delete me!
          map((authData: AuthenticationState) => {
            if (authData) {
              /// User logged in
              const parsedAuthData: AuthenticationState = this.authenticationService.parseUserData(authData);
              return authenticationDataRetrieved(parsedAuthData);
            } else {
              /// User not logged in
              return notAuthenticationRetrieved();
            }
          }),
          catchError(err => {
            console.log(err);
            return of(authenticationError({ errorMessage: err.message, errorCode: err.code }));
          })
        )
      )
    ),
    { dispatch: false }
  );




  // @Effect()
  login = createEffect(
    () => this.actions.pipe(
      ofType(googleLoginAttempt),
      map((loginAction) => {console.log(loginAction)}),
      switchMap((action: any) =>
        from(this.authenticationService.signInWithGoogle()).pipe(
          map(credential => getAuthenticationData()),
          catchError(err => of(authenticationError({ errorMessage: err.message, errorCode: err.code })))
        )
      )
    ),
    { dispatch: false }
  );



  logout = createEffect(() => this.actions.pipe(
    ofType(logout),
    /*mapToAction({
      project: () => generateValue().pipe(
              map(value => login({ payload: { value } }))
            ),
      error: message => logInfo(message)
    })*/
  ));

  constructor(
    private actions: Actions,
    private afAuth: AngularFireAuth,
    private authenticationService: AuthenticationService
  ) { }
}

function generateValue(): Observable<number> {
  const value = Math.floor(Math.random() * 10);

  if (value > 5) {
    return throwError(
      `Generated number should not be greater than 5 (was ${value})`
    );
  }

  return of(value || 1);
}