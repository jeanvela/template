export interface AuthState {
  appStatus: string | null;
  userId: string | null;
}

export interface AuthContextType {
  authContext: AuthState;
  updateAuthContext: (newData: Partial<AuthState>) => void;
  // restartAuthListener: () => Promise<void>;
  login: (email: string, password: string) => void;
  logout: () => void;
  // resetPassword: (email: string) => void;
}