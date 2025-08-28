import React from "react";
import {
  HomeIcon,
  CalendarIcon,
  BellIcon,
  MapPinIcon,
  RouteIcon,
  CogIcon,
  UserIcon,
  MapIcon,
} from "lucide-react";

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    {
      id: "overview",
      name: "Dashboard",
      icon: HomeIcon,
      description: "Overview and statistics",
    },
    {
      id: "schedules",
      name: "Schedules",
      icon: CalendarIcon,
      description: "Manage waste collection schedules",
    },
    {
      id: "notifications",
      name: "Notifications",
      icon: BellIcon,
      description: "Send and manage notifications",
    },
    {
      id: "tracking",
      name: "Live Tracking",
      icon: MapPinIcon,
      description: "Track admin locations",
    },
    {
      id: "routes",
      name: "Routes",
      icon: RouteIcon,
      description: "Manage collection routes",
    },
    {
      id: "map-tools",
      name: "Map Tools",
      icon: MapIcon,
      description: "Coordinate selection tools",
    },
  ];

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-6">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">E</span>
          </div>
          <h1 className="ml-3 text-xl font-bold text-gray-800">Ecobin Admin</h1>
        </div>
      </div>

      <nav className="mt-6">
        <div className="px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-3 py-3 text-sm font-medium rounded-lg mb-1 transition-colors duration-200 ${
                  activeTab === item.id
                    ? "bg-green-100 text-green-700 border-r-2 border-green-600"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-gray-500">
                    {item.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </nav>

      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
        <div className="flex items-center px-3 py-2">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <UserIcon className="w-4 h-4 text-gray-600" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">Admin Panel</p>
            <p className="text-xs text-gray-500">Waste Management</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
