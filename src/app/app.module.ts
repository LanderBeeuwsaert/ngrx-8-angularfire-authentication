import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './store';
import { CounterEffects } from './store/counter';
import { AuthenticationEffects } from './store/authentication';

import { AppComponent } from './app.component';
import { SimpleCounterComponent } from './containers/simple-counter/simple-counter.component';
import { TitlebarComponent } from './containers/titlebar/titlebar.component';
import { LogMonitorComponent } from './containers/log-monitor/log-monitor.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AuthenticationService } from './services/authentication.service';
import {UserService} from './services/user.service';
import {Helpers} from './services/helpers.service';
import { ItemListComponent } from './containers/item-list/item-list.component';
import { LoginComponent } from './containers/login/login.component';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ROUTES } from './app.routes';
import {QuicklinkModule, QuicklinkStrategy} from 'ngx-quicklink';
import {APP_BASE_HREF} from '@angular/common';
import {AuthGuard} from './guards/auth-guard';
import {UnauthGuard} from './guards/unauth-guard';

function logger(reducer: any) {
  return function (state: any, action: any) {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES, {
      useHash: false,
      preloadingStrategy: QuicklinkStrategy
      // enableTracing: true // <-- debugging purposes only
    }),
    BrowserAnimationsModule,
    QuicklinkModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBtNSer6W5aY4hCmY1M8F-Nc4q1q560HqA",
      authDomain: "tryout-fa97c.firebaseapp.com",
      databaseURL: "https://tryout-fa97c.firebaseio.com",
      projectId: "tryout-fa97c",
      storageBucket: "",
      messagingSenderId: "77496427692",
      appId: "1:77496427692:web:948aa65cc2648b62"
    }),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictActionImmutability: true,
        // strictActionSerializability: true,
        strictStateImmutability: true,
        // strictStateSerializability: true
      },
      metaReducers: [logger]
    }),
    EffectsModule.forRoot([CounterEffects, AuthenticationEffects])
  ],
  providers: [
    AuthenticationService,
    UserService,
    Helpers,
    {provide: APP_BASE_HREF, useValue : '/' },
    AuthGuard,
    UnauthGuard
  ],
  declarations: [
    AppComponent,
    SimpleCounterComponent,
    TitlebarComponent,
    LogMonitorComponent,
    ItemListComponent,
    LoginComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
