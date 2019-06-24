import { createAction, props } from '@ngrx/store';
import { AuthenticationState } from './authentication.state';

export const getAuthenticationData = createAction('[Authentication] Get authentication data');
export const authenticationDataRetrieved = createAction('[Authentication] Authentication data retrieved', props<{payload: Partial<AuthenticationState>}>());
export const notAuthenticationRetrieved = createAction('[Authentication] Non authentication retrieved');

export const googleLoginAttempt = createAction('[Authentication] Google log in attempt start');
export const googleLoginSuccess = createAction('[Authentication] Google log in attempt success');

export const logoutAttempt = createAction('[Authentication] Log out attempt start');
export const logoutSuccess = createAction('[Authentication] Log out attempt success');

export const userDataRetrieved = createAction('[Firestore] User Loaded', props<{payload: Partial<AuthenticationState>}>());
export const createNewUser = createAction('[Firestore] Attempt user creation', props<{ payload: {email: string}}>());
export const newUserCreated = createAction('[Firestore] User Created');

export const authenticationError = createAction('[Authentication] Authentication error happened', props<{ errorMessage: string, errorCode: string }>());
