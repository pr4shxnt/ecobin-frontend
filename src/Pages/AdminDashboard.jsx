import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../Components/Admin/AdminSidebar';
import AdminHeader from '../Components/Admin/AdminHeader';
import DashboardOverview from '../Components/Admin/DashboardOverview';
import ScheduleManagement from '../Components/Admin/ScheduleManagement';
import NotificationCenter from '../Components/Admin/NotificationCenter';
import LiveTracking from '../Components/Admin/LiveTracking';
import RouteManagement from '../Components/Admin/RouteManagement';
import MapComponent from '../Components/Admin/MapComponent';
import { MapPinIcon } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [adminData, setAdminData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);
  const [isSelectingCoordinates, setIsSelectingCoordinates] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is logged in
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    // Fetch admin profile
    fetchAdminProfile();
  }, [navigate]);

  const fetchAdminProfile = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${import.meta.env.VITE_BACKEND}/admin/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setAdminData(data.data);
      } else {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      }
    } catch (error) {
      console.error('Error fetching admin profile:', error);
      localStorage.removeItem('adminToken');
      navigate('/admin/login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      await fetch(`${import.meta.env.VITE_BACKEND}/admin/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('adminToken');
      navigate('/admin/login');
    }
  };

  const handleLocationSelect = (coordinates) => {
    setSelectedCoordinates(coordinates);
    setIsSelectingCoordinates(false);
  };

  const toggleCoordinateSelection = () => {
    setIsSelectingCoordinates(!isSelectingCoordinates);
    if (!isSelectingCoordinates) {
      setSelectedCoordinates(null);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview />;
      case 'schedules':
        return <ScheduleManagement />;
      case 'notifications':
        return <NotificationCenter />;
      case 'tracking':
        return <LiveTracking />;
      case 'routes':
        return <RouteManagement />;
      case 'map-tools':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Map Tools</h2>
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleCoordinateSelection}
                  className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
                    isSelectingCoordinates
                      ? "bg-red-600 text-white hover:bg-red-700"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  <MapPinIcon className="w-4 h-4 mr-2" />
                  {isSelectingCoordinates ? "Cancel Selection" : "Select Coordinates"}
                </button>
                {selectedCoordinates && (
                  <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2">
                    <p className="text-sm text-green-800">
                      Selected: {selectedCoordinates.lat.toFixed(6)}, {selectedCoordinates.lng.toFixed(6)}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <MapComponent
                mode={isSelectingCoordinates ? "select" : "view"}
                markers={selectedCoordinates ? [{
                  lat: selectedCoordinates.lat,
                  lng: selectedCoordinates.lng,
                  type: "selected",
                  title: "Selected Location",
                  description: `Lat: ${selectedCoordinates.lat.toFixed(6)}, Lng: ${selectedCoordinates.lng.toFixed(6)}`,
                  color: "#EF4444",
                }] : []}
                height="600px"
                showControls={true}
                onLocationSelect={handleLocationSelect}
              />
              
                             {isSelectingCoordinates && (
                 <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                   <p className="text-sm text-blue-700">
                     Move the map to position the red pin over your desired location, then click "Select These Coordinates" or click directly on the map. The selected location will be marked with a red dot.
                   </p>
                 </div>
               )}
            </div>
          </div>
        );
      default:
        return <DashboardOverview />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader adminData={adminData} onLogout={handleLogout} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
