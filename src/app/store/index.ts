import { ActionReducerMap } from '@ngrx/store';

import { CounterState, counterReducer } from './counter';
import { LoggerState, loggerReducer } from './logger';
import { AuthenticationState, AuthenticationReducer } from './authentication';

export interface State {
  counter: CounterState,
  logger: LoggerState,
  authentication: AuthenticationState,
}

export const reducers: ActionReducerMap<State> = {
  counter: counterReducer,
  logger: loggerReducer,
  authentication: AuthenticationReducer
}