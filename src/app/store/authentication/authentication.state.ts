import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;


export interface AuthenticationState {
  uid: string;
  email: string;
  providerId: string;

  authDisplayName?: string;

  isLoggingOut?: boolean;

  created_on?: Timestamp;
}
