//import * as authenticationActions from './authentication.actions';
//import { add, substract } from './counter.actions';
import { getAuthenticationData, authenticationDataRetrieved, notAuthenticationRetrieved, googleLoginAttempt, googleLoginSuccess, logout, userDataLoaded, authenticationError} from './authentication.actions';

import { Action, createReducer, on } from '@ngrx/store';
//import { firestore } from 'firebase/app';
//import Timestamp = firestore.Timestamp;

import { AuthenticationState } from './authentication.state';


const initialAuthenticationState: AuthenticationState = {
  uid: null,
  email: 'no_email_passed',
  providerId: null,

  authDisplayName: 'Guest',
}

export const AuthenticationReducer = createReducer(
  initialAuthenticationState,
  on(getAuthenticationData, state => ({ ...state, isLoading: true })),
  on(authenticationDataRetrieved, (state, payload) => ({ ...state, ...payload })),
  on(userDataLoaded, (state, payload) => ({ ...state, ...payload, isLoading: false })),
  on(notAuthenticationRetrieved, state => {
    let newState = { ...initialAuthenticationState, isLoading: false };
    if (state.isLoggingOut) newState.isLoggingOut = state.isLoggingOut;
    return newState;
  }),
  //on(AcUserActions.passwordLogin, state => ({ ...state, isLoading: true, errorCode: null, errorMessage: null })),
  on(googleLoginAttempt, (state) => {
    // console.log('reducer of google login');
    return ({ ...state, isLoading: true, errorCode: null, errorMessage: null });
  }),
  //on(AcUserActions.facebookLogin, state => ({ ...state, isLoading: true, errorCode: null, errorMessage: null })),
  on(authenticationError, (state, payload) => ({ ...state, ...payload, isLoading: false })),
  on(logout, state => ({ ...state, isLoggingOut: true, isLoading: true })),
  //on(logoutDelayFinished, state => ({ ...state, isLoggingOut: false, isLoading: false }))
);
