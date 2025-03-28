import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/root/Root";
import ErrorPage from "../pages/errorPage/ErrorPage";
import { lazy } from "react";
// import QR from "@/pages/transactions/Qr";
// import QRs from "@/pages/transactions/Qrs";

// const Transactions = lazy(() => import('../pages/transactions/Transactions'))
const QR = lazy(() => import('../pages/transactions/Qr'))
const Qrs = lazy(() => import('../pages/transactions/Qrs'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/qrs/:qrId', element: <QR /> },
      { path: '/qrs', element: <Qrs /> }
    ]
  }
])

export default router