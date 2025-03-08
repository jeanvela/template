import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { AppContextType, AppState } from "../interfaces/interfaceAppContext";
import { AuthContext } from "./authContext";
import { APP_STATUSES } from "../config/constans";

const initialStateAppContext: AppContextType = {
  appContext: {
    currency: 'BOB',
    language: 'es-BO',
    currentUser: null,
    dateTime: new Date(),
    unreadNotificationsSupport: 0,
    unreadNotificationsAntifraud: 0,
  },
  updateAppContext: () => {},
}

export const AppContext = createContext(initialStateAppContext) // eslint-disable-line

const initialState: AppState = {
  currency: 'BOB',
  language: 'es-BO',
  currentUser: null,
  dateTime: new Date(),
  unreadNotificationsSupport: 0,
  unreadNotificationsAntifraud: 0,
}

// let unsubscribeNotificationSupport: Unsubscribe | null = null
// let unsubscribeNotificationAntifraud: Unsubscribe | null = null

export function AppProvider({ children }: { children: ReactNode }) {
  const [appContext, setAppContext] = useState<AppState>(initialState)
  const { authContext, updateAuthContext } = useContext(AuthContext)

  const updateAppContext = (newData: Partial<AppState>) => {
    // Utilizar una función de actualización para obtener el estado previo
    setAppContext((prevData) => ({
      ...prevData,
      ...newData,
    }))
  }

  // const listenToUserData =  (userId: string) => {
  //   const agentRef = doc(db, COLLECTION_NAMES.users, userId)
  //   const ubsub = onSnapshot(agentRef, async querySnapshot => {
  //     if (querySnapshot.exists()) {
  //       localStorage.setItem('currentUser', JSON.stringify(querySnapshot.data()))
  //       console.log('aqui', querySnapshot.data())
  //       updateAppContext({
  //         currentUser: {
  //           // ...querySnapshot.data(),
  //           id: querySnapshot.id,
  //           dateTimeCreated: querySnapshot.data().dateTimeCreated,
  //           email: querySnapshot.data().email,
  //           enabled: querySnapshot.data().enabled,
  //           lastName: querySnapshot.data().lastName,
  //           name: querySnapshot.data().name,
  //           permissions: querySnapshot.data().permissions
  //         },
  //       })
  //     }
  //   })

  //   setUnsubscribeUser(() => ubsub)
  // }

  useEffect(() => {
    if (appContext.currentUser) {
      updateAuthContext({ appStatus: APP_STATUSES.loggedIn })
      return
    }
    updateAuthContext({ appStatus: APP_STATUSES.loading })
  }, [appContext]) // eslint-disable-line

  // useEffect(() => {
  //   if (authContext.userId) {
  //     listenToUserData(authContext.userId)
  //     getNotificationsSupport()
  //     getNotificationAntifraud()
  //     updateAuthContext({ appStatus: APP_STATUSES.loggedIn })
  //   } else {
  //     setAppContext(initialState)
  //   }
  // }, [authContext.userId]) // eslint-disable-line

  // useEffect(() => {
  //   return () => {
  //     if (unsubscribeNotificationSupport) {
  //       unsubscribeNotificationSupport()
  //     }
  //     if (unsubscribeNotificationAntifraud) {
  //       unsubscribeNotificationAntifraud()
  //     }
  //     // unsubscribeNotificationSupport && unsubscribeNotificationSupport();
  //     // unsubscribeNotificationAntifraud && unsubscribeNotificationAntifraud();
  //   }
  // }, [])

  // useEffect(() => {
  //   return () => {
  //     if (unsubscribeUser) {
  //       unsubscribeUser(); // Desuscribirse
  //       setUnsubscribeUser(null); // Limpiar la referencia
  //     }
  //   }
  // }, []) // eslint-disable-line

  return (
    <AppContext.Provider value={{ appContext, updateAppContext }}>
      {children}
    </AppContext.Provider>
  )
}