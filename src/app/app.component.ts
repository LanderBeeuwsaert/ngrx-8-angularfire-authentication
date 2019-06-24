import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { getAuthenticationData } from './store/authentication';
import { AppState } from './store';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'NgRx 8';

    constructor(
      private store: Store<AppState>,
    ) {
      this.store.dispatch(getAuthenticationData());
    }
}

