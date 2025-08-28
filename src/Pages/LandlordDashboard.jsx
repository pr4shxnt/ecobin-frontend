import React from 'react';
import { Home, Building, Calendar, CreditCard, Settings, LogOut, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandlordDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Home className="h-8 w-8 text-green-600" />
              <h1 className="text-xl font-semibold text-gray-900">Landlord Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, Landlord!</span>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Quick Stats */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Building className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Properties
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">8</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Calendar className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Active Rentals
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">6</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <CreditCard className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Monthly Revenue
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">$12,500</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Settings className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Pending Requests
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">3</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="mt-8 bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Welcome to Your Landlord Dashboard!
            </h2>
            <p className="text-gray-600 mb-4">
              You have successfully logged in. This is your landlord dashboard where you can:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>List and manage your properties</li>
              <li>Review tenant applications</li>
              <li>Track rental payments</li>
              <li>Handle maintenance requests</li>
              <li>View property analytics</li>
              <li>Manage property viewings</li>
            </ul>
            <div className="mt-6 flex space-x-4">
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add New Property
              </Link>
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                View All Properties
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandlordDashboard;

