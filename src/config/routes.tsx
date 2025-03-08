import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/root/Root";
import ErrorPage from "../pages/errorPage/ErrorPage";
import { lazy } from "react";

const Transactions = lazy(() => import('../pages/transactions/Transactions'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Transactions /> }
    ]
  }
])

export default router