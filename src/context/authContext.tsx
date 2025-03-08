import { createContext, ReactNode, useState } from "react";
import { AuthContextType, AuthState } from "../interfaces/interfaceAuthContext";
import { toast } from "sonner";

const initialAuthContext: AuthContextType = {
  authContext: {
    appStatus: null,
    userId: null
  },
  updateAuthContext: () => {},
  login: () => {},
  logout: () => {},
}

export const AuthContext = createContext(initialAuthContext)

const initialState: AuthState = {
  appStatus: null,
  userId: null
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authContext, setAuthContext] = useState<AuthState>(initialState)

  const login = (email: string, password: string) => {
    console.log(email, password)
  }

  const logout = () => {
    toast.info('Sesión cerrada')
  }

  const updateAuthContext = (newData: Partial<AuthState>) => {
    // Utilizar una función de actualización para obtener el estado previo
   setAuthContext((prevData) => ({
     ...prevData,
     ...newData,
   }))
  }

  //* Si implementas firebase
  // function authStateListener() {
  //   const unsub = onAuthStateChanged(auth, async (userCredential: User | null) => {
  //     if (!userCredential) {
  //       updateAuthContext({
  //         appStatus: APP_STATUSES.loggedOut
  //       })
  //       return
  //     }
  //     if (userCredential) {
  //       const userDoc = await getDocById<{ id: string }>({ collectionId: COLLECTION_NAMES.users, docId: userCredential.uid })
  //       if (userDoc) {
  //         updateAuthContext({
  //           appStatus: APP_STATUSES.loading,
  //           userId: userDoc.id
  //         })
  //       } else {
  //         toast.error('Usuario no registrado en esta plataforma')
  //         logout()
  //       }
  //     }
  //   })
  //   setUnsubscribeAuthListener(() => unsub)
  // }

  // async function restartAuthListener() {
  //   // unsubscribeAuthListener && await unsubscribeAuthListener()
  //   if (unsubscribeAuthListener) {
  //     await unsubscribeAuthListener()
  //   }
  //   // unsubscribeAgent && await unsubscribeAgent()
  //   authStateListener()
  // }

  // useEffect(() => {
  //   authStateListener()

  //   return () => {
  //     if (unsubscribeAuthListener) {
  //       unsubscribeAuthListener(); // Desuscribirse
  //       setUnsubscribeAuthListener(null); // Limpiar la referencia
  //     }
  //   }
  // }, []) // eslint-disable-line

  return (
    <AuthContext.Provider value={{
      authContext,
      updateAuthContext,
      login,
      logout
    }}>
      { children }
    </AuthContext.Provider>
  )
}