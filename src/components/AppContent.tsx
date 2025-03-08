import { RouterProvider } from "react-router-dom";
import router from "../config/routes";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { APP_STATUSES } from "../config/constans";
import Loading from "../pages/loading/Loading";
import Login from "../pages/login/Login";

export default function AppContent() {
  const { authContext } = useContext(AuthContext)

  if (authContext.appStatus === APP_STATUSES.loading) return <Loading />

  if (authContext.appStatus === APP_STATUSES.loggedOut) return <Login />

  return <RouterProvider router={router}/>
}