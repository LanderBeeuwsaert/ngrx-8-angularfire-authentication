import { createAction } from '@ngrx/store';

export const logInfo = createAction(
  '[Logger] Log Info',
  (message = 'NgRx 8 is coming 🙌.') => ({ message })
)