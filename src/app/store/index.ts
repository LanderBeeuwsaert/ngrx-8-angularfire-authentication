import { ActionReducerMap } from '@ngrx/store';

import { CounterState, counterReducer } from './counter';
import { LoggerState, loggerReducer } from './logger';
import { AuthenticationState, AuthenticationReducer } from './authentication';

export interface AppState {
  counter: CounterState,
  logger: LoggerState,
  authentication: AuthenticationState,
}

export const reducers: ActionReducerMap<AppState> = {
  counter: counterReducer,
  logger: loggerReducer,
  authentication: AuthenticationReducer
}
