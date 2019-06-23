import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { logInfo } from '../logger';
import { add, randomAdd } from './counter.actions';

@Injectable()
export class CounterEffects {
  randomAdd = createEffect(() => this.actions.pipe(
    ofType(randomAdd),
    /*mapToAction({
      project: () => generateValue().pipe(
              map(value => add({ payload: { value } }))
            ),
      error: message => logInfo(message)
    })*/
  ));

  constructor(private actions: Actions) { }
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