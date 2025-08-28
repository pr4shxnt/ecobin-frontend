import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootComp from "./Components/Root/RootComp";
import HeroComp from "./Components/HeroComp";
import Homepage from "./Pages/Homepage";
import UserSelection from "./Pages/UserSelection";
import LandlordRegister from "./Pages/LandlordRegister";
import LandlordLogin from "./Pages/LandlordLogin";
import TenantRegister from "./Pages/TenantRegister";
import TenantLogin from "./Pages/TenantLogin";
import TenantDashboard from "./Pages/TenantDashboard";
import LandlordDashboard from "./Pages/LandlordDashboard";
import { Provider } from "react-redux";
import store from "./Features/Store";
import Root from "./Components/Tenants/Root/Root";
import QRcode from "./Components/Tenants/Dashboard/QRcode";
import Invoice from "./Components/Tenants/Dashboard/Invoice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootComp />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
    ],
  },
  {
    path: "/user-selection",
    element: <UserSelection />,
  },
  {
    path: "/landlord-register",
    element: <LandlordRegister />,
  },
  {
    path: "/landlord-login",
    element: <LandlordLogin />,
  },
  {
    path: "/tenant-register",
    element: <TenantRegister />,
  },
  {
    path: "/tenant-login",
    element: <TenantLogin />,
  },
  {
    path: "/tenant",
    element: <Root />,
    children: [
      {
        path: "qr",
        element: <QRcode />,
      },
      {
        path: "invoice",
        element: <Invoice />,
      },
    ],
  },
  {
    path: "/landlord",
    element: <LandlordDashboard />,
  },
]);

export default function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
