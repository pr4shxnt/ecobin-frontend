import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, ArrowLeft } from 'lucide-react';

const AuthNav = () => {
  const location = useLocation();
  
  const isLandlordPage = location.pathname.includes('landlord');
  const isTenantPage = location.pathname.includes('tenant');

  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Home */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back to Home</span>
          </Link>

          {/* User Type Navigation */}
          <div className="flex items-center space-x-4">
            <Link
              to="/landlord-register"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isLandlordPage
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              <Home className="h-4 w-4" />
              <span className="font-medium">Landlord</span>
            </Link>
            <Link
              to="/tenant-register"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isTenantPage
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <User className="h-4 w-4" />
              <span className="font-medium">Tenant</span>
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-4">
            {isLandlordPage ? (
              <Link
                to="/landlord-login"
                className="text-sm text-gray-600 hover:text-green-600 transition-colors"
              >
                Already have an account?
              </Link>
            ) : isTenantPage ? (
              <Link
                to="/tenant-login"
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                Already have an account?
              </Link>
            ) : (
              <Link
                to="/user-selection"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Choose User Type
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthNav;
