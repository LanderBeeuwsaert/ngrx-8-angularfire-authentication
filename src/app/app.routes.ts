import { Routes } from '@angular/router';
import {UnauthGuard} from './guards/unauth-guard';
import {AuthGuard} from './guards/auth-guard';
import {LoginComponent} from './containers/login/login.component';
import {ItemListComponent} from './containers/item-list/item-list.component';


export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [UnauthGuard]
  },
  {
    path: 'items',
    component: ItemListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
