import React, { useState, useEffect } from 'react';
import { MapPinIcon, UserIcon, TruckIcon } from 'lucide-react';
import MapComponent from './MapComponent';

const LiveTracking = () => {
  const [onlineAdmins, setOnlineAdmins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  useEffect(() => {
    fetchOnlineAdmins();
    // Set up real-time updates every 30 seconds
    const interval = setInterval(fetchOnlineAdmins, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchOnlineAdmins = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:5000/admin/location/online-admins', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setOnlineAdmins(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching online admins:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateLocation = async (lat, lng) => {
    try {
      const token = localStorage.getItem('adminToken');
      await fetch('http://localhost:5000/admin/location/update', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ lat, lng, isOnline: true })
      });
    } catch (error) {
      console.error('Error updating location:', error);
    }
  };

  const handleLocationUpdate = (coordinates) => {
    updateLocation(coordinates.lat, coordinates.lng);
  };

  // Convert admin data to map markers
  const getMapMarkers = () => {
    return onlineAdmins.map(admin => ({
      lat: admin.currentLocation?.coordinates?.lat || 0,
      lng: admin.currentLocation?.coordinates?.lng || 0,
      type: 'admin',
      title: `${admin.firstName} ${admin.lastName}`,
      description: `Vehicle: ${admin.vehicleInfo?.vehicleNumber || 'N/A'}`,
      color: '#EF4444'
    })).filter(marker => marker.lat !== 0 && marker.lng !== 0);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Live Tracking</h1>
          <p className="text-gray-600">Monitor admin locations in real-time</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">Live updates every 30s</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Live Map</h3>
              <button
                onClick={() => {
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                      (position) => {
                        handleLocationUpdate({
                          lat: position.coords.latitude,
                          lng: position.coords.longitude
                        });
                      },
                      (error) => {
                        console.error('Error getting location:', error);
                        alert('Unable to get your location. Please enable location services.');
                      }
                    );
                  }
                }}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
              >
                <MapPinIcon className="w-4 h-4 mr-2" />
                Update My Location
              </button>
            </div>
            <MapComponent
              mode="view"
              markers={getMapMarkers()}
              height="500px"
              showControls={true}
            />
          </div>
        </div>

        {/* Online Admins List */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Online Admins</h3>
          
          {onlineAdmins.length > 0 ? (
            <div className="space-y-3">
              {onlineAdmins.map((admin) => (
                <div
                  key={admin._id}
                  onClick={() => setSelectedAdmin(admin)}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedAdmin?._id === admin._id
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <UserIcon className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {admin.firstName} {admin.lastName}
                      </p>
                      <p className="text-sm text-gray-600">
                        {admin.assignedZones?.join(', ') || 'All zones'}
                      </p>
                      {admin.vehicleInfo && (
                        <p className="text-xs text-gray-500">
                          Vehicle: {admin.vehicleInfo.vehicleNumber}
                        </p>
                      )}
                    </div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  
                  {admin.currentLocation?.coordinates && (
                    <div className="mt-2 text-xs text-gray-500">
                      <p>Lat: {admin.currentLocation.coordinates.lat.toFixed(6)}</p>
                      <p>Lng: {admin.currentLocation.coordinates.lng.toFixed(6)}</p>
                      <p>Last updated: {new Date(admin.currentLocation.lastUpdated).toLocaleTimeString()}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <UserIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No admins online</p>
            </div>
          )}
        </div>
      </div>

      {/* Selected Admin Details */}
      {selectedAdmin && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Admin Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Personal Information</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium">{selectedAdmin.firstName} {selectedAdmin.lastName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{selectedAdmin.emailAddress}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-medium">{selectedAdmin.phoneNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Role:</span>
                  <span className="font-medium capitalize">{selectedAdmin.role}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">Work Information</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Assigned Zones:</span>
                  <span className="font-medium">{selectedAdmin.assignedZones?.join(', ') || 'All zones'}</span>
                </div>
                {selectedAdmin.vehicleInfo && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Vehicle Number:</span>
                      <span className="font-medium">{selectedAdmin.vehicleInfo.vehicleNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Vehicle Type:</span>
                      <span className="font-medium">{selectedAdmin.vehicleInfo.vehicleType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Capacity:</span>
                      <span className="font-medium">{selectedAdmin.vehicleInfo.capacity} kg</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="font-medium text-green-600">Online</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {selectedAdmin.currentLocation?.coordinates && (
            <div className="mt-6">
              <h4 className="font-medium text-gray-900 mb-3">Current Location</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Latitude</p>
                    <p className="font-medium">{selectedAdmin.currentLocation.coordinates.lat.toFixed(6)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Longitude</p>
                    <p className="font-medium">{selectedAdmin.currentLocation.coordinates.lng.toFixed(6)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Last Updated</p>
                    <p className="font-medium">{new Date(selectedAdmin.currentLocation.lastUpdated).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p className="font-medium text-green-600">Active</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Location Update Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Location Tracking Instructions</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Admins can update their location using the "Update My Location" button</li>
          <li>• Location updates are sent every 30 seconds automatically</li>
          <li>• Green dots indicate online admins</li>
          <li>• Click on an admin to view detailed information</li>
        </ul>
      </div>
    </div>
  );
};

export default LiveTracking;
