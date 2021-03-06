import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { AppState } from '../../store';
import { infoMessage } from '../../store/logger';

@Component({
  selector: 'app-log-monitor',
  templateUrl: './log-monitor.component.html',
  styleUrls: ['./log-monitor.component.css']
})
export class LogMonitorComponent {
infoMessages$: Observable<string[]>;

  constructor(private store: Store<AppState>) {
    this.infoMessages$ = this.store.pipe(select(infoMessage))
  }
}
