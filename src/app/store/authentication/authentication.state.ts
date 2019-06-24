import { firestore } from 'firebase/app';
import Timestamp = firestore.Timestamp;


export interface AuthenticationState {
  uid: string;
  email: string;
  providerId: string;

  isLoading?: boolean;
  errorCode?: string;
  errorMessage?: string;

  authDisplayName?: string;

  isLoggingOut?: boolean;

  created_on?: Timestamp;
}
