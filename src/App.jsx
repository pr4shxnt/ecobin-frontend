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
]);

export default function App() {
  return <RouterProvider router={router} />;
}
