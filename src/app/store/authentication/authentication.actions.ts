import { createAction, props } from '@ngrx/store';
import { AuthenticationState } from './authentication.state';

export const getAuthenticationData = createAction('[Authentication] Get authentication data');
export const authenticationDataRetrieved = createAction('[Authentication] Authentication data retrieved', props<Partial<AuthenticationState>>());
export const notAuthenticationRetrieved = createAction('[Authentication] Non authentication retrieved');

export const googleLoginAttempt = createAction('[Authentication] Google log in attempt start');
export const googleLoginSuccess = createAction('[Authentication] Google log in attempt success');
export const logout = createAction('[Authentication] Log out');

export const userDataLoaded = createAction('[Firestore] User Loaded', props<Partial<AuthenticationState>>());
export const authenticationError = createAction('[Authentication] Authentication error happened', props<{ errorMessage: string, errorCode: string }>());
