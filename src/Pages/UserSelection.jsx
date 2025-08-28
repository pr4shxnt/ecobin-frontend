import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, User, ArrowRight } from "lucide-react";
import AuthNav from "../Components/AuthNav";
import { useSelector } from "react-redux";

const UserSelection = () => {
  const { isTenantAuthenticated } = useSelector((state) => state.tenantAuth);
  const { isLandlordAuthenticated } = useSelector(
    (state) => state.landlordAuth
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (isTenantAuthenticated) {
      navigate("/tenant");
    } else if (isLandlordAuthenticated) {
      navigate("/landlord");
    } else {
      return;
    }
  }, [isLandlordAuthenticated, isTenantAuthenticated]);

  return (
    <div className="h-full bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <AuthNav />
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to Ecobin
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Choose your role to get started with our property management
              platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Landlord Section */}
            <div className="bg-white rounded-xl shadow-2xl p-8 border border-green-100">
              <div className="text-center mb-6">
                <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Home className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Landlord
                </h2>
                <p className="text-gray-600">
                  Property owners who want to list and manage their properties
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="font-semibold text-green-800 mb-2">
                    What you can do:
                  </h3>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• List your properties for rent</li>
                    <li>• Manage tenant applications</li>
                    <li>• Track rental payments</li>
                    <li>• Handle maintenance requests</li>
                    <li>• View property analytics</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <Link
                    to="/landlord-register"
                    className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                  >
                    Register as Landlord
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <Link
                    to="/landlord-login"
                    className="w-full flex items-center justify-center px-4 py-3 border border-green-300 text-sm font-medium rounded-md text-green-700 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                  >
                    Sign In as Landlord
                  </Link>
                </div>
              </div>
            </div>

            {/* Tenant Section */}
            <div className="bg-white rounded-xl shadow-2xl p-8 border border-blue-100">
              <div className="text-center mb-6">
                <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <User className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Tenant
                </h2>
                <p className="text-gray-600">
                  Individuals looking to find and rent properties
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-2">
                    What you can do:
                  </h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Browse available properties</li>
                    <li>• Apply for rental properties</li>
                    <li>• Schedule property viewings</li>
                    <li>• Pay rent online</li>
                    <li>• Submit maintenance requests</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <Link
                    to="/tenant-register"
                    className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                  >
                    Register as Tenant
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <Link
                    to="/tenant-login"
                    className="w-full flex items-center justify-center px-4 py-3 border border-blue-300 text-sm font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                  >
                    Sign In as Tenant
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              <Link
                to="/"
                className="font-medium text-gray-700 hover:text-gray-900"
              >
                Go back to homepage
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSelection;
