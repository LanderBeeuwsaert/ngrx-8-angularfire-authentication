import {Injectable} from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { AuthenticationState, userDataRetrieved } from '../store/authentication';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {Helpers} from './helpers.service';
import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;
import { AppState } from '../store';
import { Store } from '@ngrx/store';

@Injectable()
export class UserService {

    constructor(
      private helpers: Helpers,
      private afs: AngularFirestore,
      // private fsService: FirestoreService,
      // private angularFireAuth: AngularFireAuth,
      private store: Store<AppState>,
    ) {}

    subscription: Subscription;

    connectUser(userEmail: string) {
        let userDocRef = this.afs.doc('users/' + userEmail);
        console.log("CONNECTING USER");
        this.subscription = userDocRef.snapshotChanges().pipe(map(this.helpers.fsTransDoc)).subscribe((authState:Partial<AuthenticationState> ) => {

                      if (authState.created_on) {
                          this.store.dispatch(userDataRetrieved({payload: authState}));
                        // return userDataRetrieved({payload: connectedUser});
                      } else {
                        // return createNewUser({payload: {email: lastAuthentication.email}});
                        // this.store.dispatch();
                      }
            // userDataRetrieved({payload: connectedUser})
            // this.store.dispatch(new Training.SetAvailableTrainings(exercises));
        });

    }

    cancelSubscriptions() {
        this.subscription.unsubscribe();
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
