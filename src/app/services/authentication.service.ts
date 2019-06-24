import { Injectable, Injector } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';

import { Router } from '@angular/router';
import UserCredential = firebase.auth.UserCredential;

import { AuthenticationState } from '../store/authentication/authentication.state';

@Injectable()
export class AuthenticationService {

  constructor(public angularFireAuth: AngularFireAuth) {

  }

  parseUserData(authData: any): AuthenticationState {
    // let email: string = authData.providerData.find((userInfo: UserInfo) => !!userInfo.email).email;

    return {
      uid: authData.uid,
      email: authData.email,
      providerId: authData.providerData[0].providerId,
      authDisplayName: authData.providerData[0].displayName
    }
    /*
      authData.providerData[0].phoneNumber,
      authData.providerData[0].photoURL,
      //authData.emailVerified
    */
  }

  signInWithGoogle(): Promise<any> {
    let provider = new auth.GoogleAuthProvider();
    // You can add additional scopes to the provider:
    provider.addScope('https://www.googleapis.com/auth/userinfo.email');
    return auth().signInWithPopup(provider);
    // return auth().signInWithRedirect(provider);
  }

  async signOut(): Promise<void> {
    await this.angularFireAuth.auth.signOut();
  }
}
