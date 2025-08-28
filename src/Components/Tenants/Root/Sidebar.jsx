import React from "react";
import {
  Home as FaHome,
  Recycle as FaRecycle,
  BarChart2 as FaChartBar,
  UserCircle as FaUserCircle,
  LogOut as FaSignOutAlt,
  QrCode,
  BookCheck,
} from "lucide-react";
import logoonly from "../../../assets/logoonly.png";

const menuItems = [
  {
    label: "Dashboard",
    icon: <FaHome className="w-5 h-5 mr-3" />,
    path: "/tenant/dashboard",
  },
  {
    label: "Waste Logs",
    icon: <FaRecycle className="w-5 h-5 mr-3" />,
    path: "/tenant/waste-logs",
  },
  {
    label: "Reports",
    icon: <FaChartBar className="w-5 h-5 mr-3" />,
    path: "/tenant/reports",
  },
  {
    label: "Profile",
    icon: <FaUserCircle className="w-5 h-5 mr-3" />,
    path: "/tenant/profile",
  },
  {
    label: "Invoice",
    icon: <BookCheck className="w-5 h-5 mr-3" />,
    path: "/tenant/invoice",
  },
  {
    label: "Your QR",
    icon: <QrCode className="w-5 h-5 mr-3" />,
    path: "/tenant/qr",
  },
];

const Sidebar = ({ handleLogout }) => (
  <aside className="min-h-screen w-64 bg-gray-300  flex flex-col">
    <div className="px-6 py-4 border-b-[0.5px] border-black/50">
      <h2 className="text-xl flex items-end gap-1 font-bold text-green-700">
        <img src={logoonly} alt="" className="h-8" />
        EcoBin
      </h2>
      <span className="text-xs text-gray-500">Tenant</span>
    </div>
    <nav className="flex-1 px-4 py-6">
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.label}>
            <a
              href={item.path}
              className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-green-100 transition"
            >
              {item.icon}
              <span className="ml-2">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
    <button
      className="flex items-center px-6 py-3 text-red-600 hover:bg-red-50 border-t w-full transition"
      onClick={handleLogout}
    >
      <FaSignOutAlt className="w-5 h-5 mr-2" />
      <span>Logout</span>
    </button>
  </aside>
);

export default Sidebar;
