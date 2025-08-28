import React, { useState, useEffect } from 'react';
import { 
  CalendarIcon, 
  MapPinIcon, 
  BellIcon, 
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    totalSchedules: 0,
    activeSchedules: 0,
    totalNotifications: 0,
    onlineAdmins: 0,
    completedCollections: 0,
    pendingCollections: 0
  });
  const [recentSchedules, setRecentSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      
      // Fetch schedules
      const schedulesResponse = await fetch('http://localhost:5000/admin/schedules?limit=5', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (schedulesResponse.ok) {
        const schedulesData = await schedulesResponse.json();
        setRecentSchedules(schedulesData.data || []);
        
        // Calculate stats
        const totalSchedules = schedulesData.data?.length || 0;
        const activeSchedules = schedulesData.data?.filter(s => s.status === 'active').length || 0;
        
        setStats(prev => ({
          ...prev,
          totalSchedules,
          activeSchedules
        }));
      }

      // Fetch online admins
      const adminsResponse = await fetch('http://localhost:5000/admin/location/online-admins', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (adminsResponse.ok) {
        const adminsData = await adminsResponse.json();
        setStats(prev => ({
          ...prev,
          onlineAdmins: adminsData.data?.length || 0
        }));
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Schedules',
      value: stats.totalSchedules,
      icon: CalendarIcon,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Active Schedules',
      value: stats.activeSchedules,
      icon: CheckCircleIcon,
      color: 'bg-green-500',
      change: '+5%',
      changeType: 'positive'
    },
    {
      title: 'Online Admins',
      value: stats.onlineAdmins,
      icon: MapPinIcon,
      color: 'bg-purple-500',
      change: '+2',
      changeType: 'positive'
    },
    {
      title: 'Pending Collections',
      value: stats.pendingCollections,
      icon: ClockIcon,
      color: 'bg-yellow-500',
      change: '-3',
      changeType: 'negative'
    }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600">Monitor your waste management operations</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Send Notifications
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Create Schedule
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
              <div className="mt-4">
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-600 ml-1">from last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Schedules */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Schedules</h3>
        </div>
        <div className="p-6">
          {recentSchedules.length > 0 ? (
            <div className="space-y-4">
              {recentSchedules.map((schedule) => (
                <div key={schedule._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <CalendarIcon className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{schedule.scheduleName}</h4>
                      <p className="text-sm text-gray-600">
                        {schedule.collectionDay} at {schedule.collectionTime} • Zone: {schedule.zone}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      schedule.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {schedule.status}
                    </span>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No schedules found</p>
              <button className="mt-2 text-blue-600 hover:text-blue-800 font-medium">
                Create your first schedule
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <BellIcon className="w-5 h-5 text-blue-600 mr-3" />
                <span className="font-medium">Send Emergency Notification</span>
              </div>
            </button>
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <MapPinIcon className="w-5 h-5 text-green-600 mr-3" />
                <span className="font-medium">View Live Tracking</span>
              </div>
            </button>
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <CalendarIcon className="w-5 h-5 text-purple-600 mr-3" />
                <span className="font-medium">Create New Schedule</span>
              </div>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">System Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Push Notifications</span>
              <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                Active
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Location Tracking</span>
              <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                Active
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Database</span>
              <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                Connected
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Today's Schedule</h3>
          <div className="space-y-3">
            <div className="text-center py-4">
              <p className="text-2xl font-bold text-gray-900">
                {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
              </p>
              <p className="text-gray-600">{new Date().toLocaleDateString()}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Collections scheduled for today</p>
              <p className="text-2xl font-bold text-green-600">5</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
