import { Action, createReducer, on } from '@ngrx/store';
import { LoggerState } from './logger.state';
import { logInfo } from './logger.actions';

const reducer = createReducer<LoggerState>(
  { infoMessages: [] },
  on(logInfo, (state, { message }) => ({
    ...state,
    infoMessages: [...state.infoMessages, message]
  }))
);

export function loggerReducer(
  state: LoggerState | undefined,
  action: Action) {
  return reducer(state, action);
}