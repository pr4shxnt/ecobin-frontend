import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../Features/Slices/User/Tenants/TenantAuthSlice";

const Root = () => {
  const { isTenantAuthenticated } = useSelector((state) => state.tenantAuth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isTenantAuthenticated) {
      navigate("/");
    }
  }, [isTenantAuthenticated]);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex">
      <Sidebar handleLogout={handleLogout} />
      <Outlet />
    </div>
  );
};

export default Root;
