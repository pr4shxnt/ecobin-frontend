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
import ImageScanner from "./Components/Tenants/Dashboard/ImageScanner";
import LandlordDashboard from "./Pages/LandlordDashboard";
import { Provider } from "react-redux";
import store from "./Features/Store";
import Root from "./Components/Tenants/Root/Root";
import QRcode from "./Components/Tenants/Dashboard/QRcode";
import Invoice from "./Components/Tenants/Dashboard/Invoice";
import Profile from "./Pages/Profile";
import UserLocation from "./Pages/UserLocation";
import AdminLogin from "./Pages/AdminLogin";
import AdminDashboard from "./Pages/AdminDashboard";
import UserInput from "./Components/UserInput";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootComp />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "test",
        element: <UserLocation />,
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
      {
        path: "ai",
        element: <ImageScanner />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/landlord",
    children: [
      {
        path: "login",
        element: <LandlordLogin />,
      },
      {
        path: "dashboard",
        element: <LandlordDashboard />,
      },
    ],
  },
  {
    path: "/admin",
    children: [
      {
        path: "login",
        element: <AdminLogin />,
      },
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "userinput/:userId",
        element: <UserInput />,
      },
    ],
  },
]);

export default function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
