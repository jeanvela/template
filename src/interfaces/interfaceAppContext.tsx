export interface AppState {
  currency: string;
  language: string;
  currentUser: null | CurrentUserInterface;
  dateTime: Date;
  unreadNotificationsSupport: number;
  unreadNotificationsAntifraud: number;
}

export interface AppContextType {
  appContext: AppState;
  updateAppContext: (newData: Partial<AppState>) => void;
}

export interface CurrentUserInterface {
  id: string,
  name: string,
  email: string
  enabled: boolean,
  dateTimeCreated: Date,
  lastName: string,
  permissions: object
}