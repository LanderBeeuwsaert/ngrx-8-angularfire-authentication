import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthenticationState} from '../store/authentication';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {Helpers} from './helpers.service';
import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;

@Injectable()
export class UserService {

    constructor(
      private helpers: Helpers,
      private afs: AngularFirestore,
      // private fsService: FirestoreService,
      // private angularFireAuth: AngularFireAuth,
      // private store: Store<AppState>,
    ) {}

    loadUser(userEmail: string): Observable<Partial<AuthenticationState>> {
        let userDocRef = this.afs.doc('users/' + userEmail);
        return userDocRef.snapshotChanges().pipe(map(this.helpers.fsTransDoc));
    }

    async setupNewUser(userEmail: string): Promise<void> {
        let authenticationState: Partial<AuthenticationState> = {
            created_on: Timestamp.now()
        };

        let userDocRef = this.afs.doc('users/' + userEmail);
        await userDocRef.set(authenticationState, { merge: true });

        // userModel.provider_string = this.acUser.providerId;
        // userModel.has_user_logged_in_before = true;
        // userModel.email_verified = false;
        // userModel.firebase_id = this.acUser.uid;
    }
}
