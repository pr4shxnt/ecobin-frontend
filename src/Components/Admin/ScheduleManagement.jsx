import React, { useState, useEffect } from 'react';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  EyeIcon,
  CalendarIcon,
  MapPinIcon
} from 'lucide-react';
import MapComponent from './MapComponent';

const ScheduleManagement = () => {
  const [schedules, setSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [formData, setFormData] = useState({
    scheduleName: '',
    collectionDay: 'monday',
    collectionTime: '09:00',
    zone: '',
    targetAddresses: [],
    reminderFrequency: 2,
    pushNotificationEnabled: true
  });
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${import.meta.env.VITE_BACKEND}/admin/schedules`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setSchedules(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching schedules:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateSchedule = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${import.meta.env.VITE_BACKEND}/admin/schedules`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setShowCreateModal(false);
        setFormData({
          scheduleName: '',
          collectionDay: 'monday',
          collectionTime: '09:00',
          zone: '',
          targetAddresses: [],
          reminderFrequency: 2,
          pushNotificationEnabled: true
        });
        fetchSchedules();
      }
    } catch (error) {
      console.error('Error creating schedule:', error);
    }
  };

  const handleDeleteSchedule = async (id) => {
    if (window.confirm('Are you sure you want to delete this schedule?')) {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`${import.meta.env.VITE_BACKEND}/admin/schedules/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          fetchSchedules();
        }
      } catch (error) {
        console.error('Error deleting schedule:', error);
      }
    }
  };

  const addAddress = () => {
    setFormData(prev => ({
      ...prev,
      targetAddresses: [...prev.targetAddresses, {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        coordinates: { lat: 0, lng: 0 }
      }]
    }));
  };

  const removeAddress = (index) => {
    setFormData(prev => ({
      ...prev,
      targetAddresses: prev.targetAddresses.filter((_, i) => i !== index)
    }));
  };

  const updateAddress = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      targetAddresses: prev.targetAddresses.map((addr, i) => 
        i === index ? { ...addr, [field]: value } : addr
      )
    }));
  };

  const handleLocationSelect = (coordinates) => {
    if (selectedAddressIndex !== null) {
      updateAddress(selectedAddressIndex, 'coordinates', coordinates);
      setShowMap(false);
      setSelectedAddressIndex(null);
    }
  };

  const handleMapClick = (coordinates) => {
    // This function will be called when user clicks on the map in view mode
    console.log('Map clicked at:', coordinates);
    // You can add logic here to handle map clicks for coordinate selection
  };

  const openMapForAddress = (index) => {
    setSelectedAddressIndex(index);
    setShowMap(true);
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
          <h1 className="text-2xl font-bold text-gray-900">Schedule Management</h1>
          <p className="text-gray-600">Manage waste collection schedules</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Create Schedule
        </button>
      </div>

      {/* Schedules List */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">All Schedules</h3>
        </div>
        <div className="p-6">
          {schedules.length > 0 ? (
            <div className="space-y-4">
              {schedules.map((schedule) => (
                <div key={schedule._id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <CalendarIcon className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{schedule.scheduleName}</h4>
                        <p className="text-sm text-gray-600">
                          {schedule.collectionDay} at {schedule.collectionTime} • Zone: {schedule.zone}
                        </p>
                        <p className="text-xs text-gray-500">
                          {schedule.targetAddresses.length} addresses • Reminders every {schedule.reminderFrequency} days
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
                      <button
                        onClick={() => {
                          setSelectedSchedule(schedule);
                          setShowEditModal(true);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteSchedule(schedule._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No schedules found</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="mt-2 text-blue-600 hover:text-blue-800 font-medium"
              >
                Create your first schedule
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Create Schedule Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Create New Schedule</h2>
            
            <form onSubmit={handleCreateSchedule} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Schedule Name
                  </label>
                  <input
                    type="text"
                    value={formData.scheduleName}
                    onChange={(e) => setFormData({...formData, scheduleName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Zone
                  </label>
                  <input
                    type="text"
                    value={formData.zone}
                    onChange={(e) => setFormData({...formData, zone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Collection Day
                  </label>
                  <select
                    value={formData.collectionDay}
                    onChange={(e) => setFormData({...formData, collectionDay: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="monday">Monday</option>
                    <option value="tuesday">Tuesday</option>
                    <option value="wednesday">Wednesday</option>
                    <option value="thursday">Thursday</option>
                    <option value="friday">Friday</option>
                    <option value="saturday">Saturday</option>
                    <option value="sunday">Sunday</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Collection Time
                  </label>
                  <input
                    type="time"
                    value={formData.collectionTime}
                    onChange={(e) => setFormData({...formData, collectionTime: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reminder Frequency (days)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="7"
                    value={formData.reminderFrequency}
                    onChange={(e) => setFormData({...formData, reminderFrequency: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="pushNotificationEnabled"
                    checked={formData.pushNotificationEnabled}
                    onChange={(e) => setFormData({...formData, pushNotificationEnabled: e.target.checked})}
                    className="mr-2"
                  />
                  <label htmlFor="pushNotificationEnabled" className="text-sm font-medium text-gray-700">
                    Enable Push Notifications
                  </label>
                </div>
              </div>

              {/* Target Addresses */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Target Addresses
                  </label>
                  <button
                    type="button"
                    onClick={addAddress}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    + Add Address
                  </button>
                </div>
                
                {formData.targetAddresses.map((address, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">Address {index + 1}</h4>
                      <button
                        type="button"
                        onClick={() => removeAddress(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Street"
                        value={address.street}
                        onChange={(e) => updateAddress(index, 'street', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                      <input
                        type="text"
                        placeholder="City"
                        value={address.city}
                        onChange={(e) => updateAddress(index, 'city', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                      <input
                        type="text"
                        placeholder="State"
                        value={address.state}
                        onChange={(e) => updateAddress(index, 'state', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Zip Code"
                        value={address.zipCode}
                        onChange={(e) => updateAddress(index, 'zipCode', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>
                    
                    {/* Coordinates Section */}
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Coordinates (Required)
                        </label>
                        <button
                          type="button"
                          onClick={() => openMapForAddress(index)}
                          className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                        >
                          <MapPinIcon className="w-4 h-4 mr-1" />
                          Select on Map
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="number"
                          step="any"
                          placeholder="Latitude"
                          value={address.coordinates?.lat || ''}
                          onChange={(e) => updateAddress(index, 'coordinates', {
                            ...address.coordinates,
                            lat: parseFloat(e.target.value) || 0
                          })}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                        <input
                          type="number"
                          step="any"
                          placeholder="Longitude"
                          value={address.coordinates?.lng || ''}
                          onChange={(e) => updateAddress(index, 'coordinates', {
                            ...address.coordinates,
                            lng: parseFloat(e.target.value) || 0
                          })}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          required
                        />
                      </div>
                      
                      {(!address.coordinates?.lat || !address.coordinates?.lng) && (
                        <p className="text-sm text-red-600 mt-1">
                          Coordinates are required. Please select a location on the map.
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Create Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Map Modal for Location Selection */}
      {showMap && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Select Location on Map</h2>
              <button
                onClick={() => {
                  setShowMap(false);
                  setSelectedAddressIndex(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <MapComponent
              mode="select"
              onLocationSelect={handleLocationSelect}
              height="500px"
              showControls={true}
            />
            
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Click on the map to select a location, or use the location button to get your current position.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleManagement;
