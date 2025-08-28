import React, { useState } from 'react';
import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const AdminHeader = ({ adminData, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Waste Management Dashboard
          </h2>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            <BellIcon className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Admin Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">
                  {adminData?.firstName?.charAt(0) || 'A'}
                </span>
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-700">
                  {adminData ? `${adminData.firstName} ${adminData.lastName}` : 'Admin'}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {adminData?.role || 'admin'}
                </p>
              </div>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-700">
                    {adminData?.emailAddress || 'admin@ecobin.com'}
                  </p>
                  <p className="text-xs text-gray-500">
                    Assigned Zones: {adminData?.assignedZones?.join(', ') || 'All'}
                  </p>
                </div>
                
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    // Add profile edit functionality here
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Edit Profile
                </button>
                
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    onLogout();
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Online Status Indicator */}
      <div className="mt-2 flex items-center space-x-2">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <span className="text-xs text-gray-600">Online</span>
        {adminData?.assignedZones?.length > 0 && (
          <span className="text-xs text-gray-500">
            • Zones: {adminData.assignedZones.join(', ')}
          </span>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;
