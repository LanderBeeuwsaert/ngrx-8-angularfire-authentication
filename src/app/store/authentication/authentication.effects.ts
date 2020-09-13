import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {from, of} from 'rxjs';
import {catchError, delay, map, mergeMap, switchMap, take, withLatestFrom} from 'rxjs/operators';
import {
  authenticationDataRetrieved,
  authenticationError, createNewUser,
  getAuthenticationData,
  googleLoginAttempt,
  logoutAttempt,
  logoutSuccess, newUserCreated,
  notAuthenticationRetrieved, userDataRetrieved
} from './authentication.actions';
import {AuthenticationState} from './authentication.state';
import {AngularFireAuth} from '@angular/fire/auth';

import {AuthenticationService} from '../../services/authentication.service';
import {Store} from '@ngrx/store';
import {UserService} from '../../services/user.service';
import {AppState} from '../index';

@Injectable()
export class AuthenticationEffects {


  getAuthenticationData = createEffect(
    () => this.actions.pipe(
      ofType(getAuthenticationData),

      // map((action) => {}),
      switchMap((payload: any) =>
        this.afAuth.authState.pipe(
          // delay(2000), // delay to show loading spinner, delete me!
          map((authData: AuthenticationState) => {
            if (authData) {
              /// User logged in
              const parsedAuthData: Partial<AuthenticationState> = this.authenticationService.parseUserData(authData);
                this.userService.connectUser(authData.email);
              return authenticationDataRetrieved({payload: parsedAuthData});
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
    // { dispatch: false }
  );




  googleLogin = createEffect(
    () => this.actions.pipe(
      ofType(googleLoginAttempt),
      // map((loginAction) => {console.log(loginAction)}),
      switchMap((action: any) =>
        from(this.authenticationService.signInWithGoogle()).pipe(
          map(credential => getAuthenticationData()),
          catchError(err => of(authenticationError({ errorMessage: err.message, errorCode: err.code })))
        )
      )
    ),
    // { dispatch: false }
  );


  // connectToUser = createEffect(
  //   () => this.actions.pipe(
  //     ofType(authenticationDataRetrieved),
  //     withLatestFrom(this.store.select('authentication')),
  //     mergeMap(([action, lastAuthentication]) =>
  //
  //       this.userService.loadUser(lastAuthentication.email).pipe(
  //
  //         map((connectedUser: Partial<AuthenticationState>) => {
  //           // console.log('loadedUser', loadedUser);
  //           if (connectedUser.created_on) {
  //             return userDataRetrieved({payload: connectedUser});
  //           } else {
  //             return createNewUser({payload: {email: lastAuthentication.email}});
  //           }
  //         }),
  //         catchError(err => {
  //           let errorAuthentication: AuthenticationState = null;
  //           this.store
  //             .select('authentication')
  //             .pipe(take(1))
  //             .subscribe(user => (errorAuthentication = user));
  //           if (errorAuthentication && errorAuthentication.isLoggingOut) {
  //             console.log('LOGOUT INSUFFICIENT PERMISSIONS USER IGNORED ERROR: ', err);
  //             return of(authenticationError({ errorMessage: err.message, errorCode: err.code }));
  //           } else {
  //             console.log('LOADUSER ERROR: ', err);
  //             return of(authenticationError({ errorMessage: err.message, errorCode: err.code }));
  //           }
  //         }),
  //         catchError(err => of(authenticationError({ errorMessage: err.message, errorCode: err.code })))
  //       )
  //     )
  //   )
  //   // , { dispatch: false }
  // );



  createNewUser = createEffect(
    () => this.actions.pipe(
      ofType(createNewUser),
      // map((loginAction) => {console.log(loginAction)}),
      switchMap((action: any) =>

        from(this.userService.setupNewUser(action.payload.email)).pipe(
          map(credential => {
            return newUserCreated();
          }),
          catchError(err => of(authenticationError({ errorMessage: err.message, errorCode: err.code })))
        )
      )
    ),
  );




  logout = createEffect(() => this.actions.pipe(
    ofType(logoutAttempt),
    switchMap((payload: any) =>
    {
this.userService.cancelSubscriptions();
return        of(this.authenticationService.signOut()).pipe(
            delay(500), //magical number seems to be between 210 and 250 ms, taking 500 for safety
            map(authData => {
                return logoutSuccess();
            }),
            // map(authData => {
            //     return AcUserActions.logoutDelayFinished();
            // }),
            // catchError(err => of(AcUserActions.authError({ errorMessage: err.message, errorCode: err.code })))
        )
    }
      // of(this.afAuth.auth.signOut()).pipe(
    )
  ));

  constructor(
    private actions: Actions,
    private afAuth: AngularFireAuth,
    private authenticationService: AuthenticationService,
    private store: Store<AppState>,
    private userService: UserService
  ) { }
}
