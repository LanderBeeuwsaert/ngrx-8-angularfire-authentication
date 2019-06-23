import { Action, createReducer, on } from '@ngrx/store';

import { add, substract } from './counter.actions';

import { CounterState } from './counter.state';

const reducer = createReducer(
  { count: 0 },
  on(add, (state, { payload }) => ({ 
    ...state,
    count: state.count + payload.value 
  })),
  on(substract, (state, { payload }) => {
    state.count += payload.value;
    return state;
  })
);

export function counterReducer(
  state: CounterState | undefined,
  action: Action) {
  return reducer(state, action);
}