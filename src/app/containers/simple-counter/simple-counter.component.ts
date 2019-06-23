import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { State } from '../../store';
import { count, randomAdd, substract } from '../../store/counter';
import { logInfo } from '../../store/logger';

@Component({
  selector: 'app-simple-counter',
  templateUrl: './simple-counter.component.html',
  styleUrls: ['./simple-counter.component.scss']
})
export class SimpleCounterComponent {
  count$: Observable<number>;

  constructor(private store: Store<State>) {
    this.count$ = this.store.pipe(select(count))
  }

  add(value: number) {
    this.store.dispatch(randomAdd());
  }

  substract(value: number) {
    this.store.dispatch(substract(value));
  }
}