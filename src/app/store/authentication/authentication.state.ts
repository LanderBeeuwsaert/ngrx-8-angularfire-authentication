export interface AuthenticationState {
  uid: string;
  email: string;
  providerId: string;

  authDisplayName?: string;

  isLoggingOut?: boolean;
}