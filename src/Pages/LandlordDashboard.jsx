import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  HomeIcon,
  BuildingIcon,
  BellIcon,
  CalendarIcon,
  MapPinIcon,
  UserIcon,
  SettingsIcon,
  LogOutIcon,
  PlusIcon,
  EyeIcon,
  EditIcon,
  TrashIcon,
} from "lucide-react";
import MapComponent from "../Components/Admin/MapComponent";
import { logout } from "../Features/Slices/User/Landlords/LandlordAuthSlice";

const LandlordDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { landlord, isLandlordAuthenticated } = useSelector((state) => state.landlordAuth);
  const [activeTab, setActiveTab] = useState("overview");
  const [properties, setProperties] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);
  const [isSelectingCoordinates, setIsSelectingCoordinates] = useState(false);

  useEffect(() => {
    checkAuth();
    fetchProperties();
    fetchNotifications();
  }, []);

  const checkAuth = () => {
    if (!isLandlordAuthenticated) {
      navigate("/landlord/login");
    }
  };



  const fetchProperties = async () => {
    try {
      const token = localStorage.getItem("landlord_session");
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND}/landlords/properties`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setProperties(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("landlord_session");
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND}/landlords/notifications`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setNotifications(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/landlord/login");
  };

  const getMapMarkers = () => {
    const propertyMarkers = properties
      .map((property) => ({
        lat: property.address?.coordinates?.lat || 0,
        lng: property.address?.coordinates?.lng || 0,
        type: "property",
        title: property.propertyName,
        description: `${property.address?.street}, ${property.address?.city}`,
        color: "#3B82F6",
      }))
      .filter((marker) => marker.lat !== 0 && marker.lng !== 0);

    // Add selected coordinates marker if exists
    if (selectedCoordinates) {
      propertyMarkers.push({
        lat: selectedCoordinates.lat,
        lng: selectedCoordinates.lng,
        type: "selected",
        title: "Selected Location",
        description: `Lat: ${selectedCoordinates.lat.toFixed(6)}, Lng: ${selectedCoordinates.lng.toFixed(6)}`,
        color: "#EF4444",
      });
    }

    return propertyMarkers;
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900">Ecobin</h1>
          <p className="text-sm text-gray-600">Landlord Dashboard</p>
        </div>

        <nav className="mt-6">
          <div className="px-3 space-y-2">
            {[
              { id: "overview", name: "Overview", icon: HomeIcon },
              { id: "properties", name: "Properties", icon: BuildingIcon },
              { id: "notifications", name: "Notifications", icon: BellIcon },
              { id: "schedule", name: "Schedule", icon: CalendarIcon },
              { id: "map", name: "Property Map", icon: MapPinIcon },
              { id: "profile", name: "Profile", icon: UserIcon },
              { id: "settings", name: "Settings", icon: SettingsIcon },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === item.id
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </button>
            ))}
          </div>
        </nav>

        <div className="absolute bottom-0 w-64 p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
          >
            <LogOutIcon className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </h2>
                <p className="text-sm text-gray-600">
                  Welcome back, {landlord?.firstName}{" "}
                  {landlord?.lastName}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <BellIcon className="w-6 h-6 text-gray-400" />
                  {notifications.filter((n) => !n.read).length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {notifications.filter((n) => !n.read).length}
                    </span>
                  )}
                </div>
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {landlord?.firstName?.charAt(0)}
                    {landlord?.lastName?.charAt(0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <BuildingIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Total Properties
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {properties.length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <CalendarIcon className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Active Schedules
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {properties.filter((p) => p.wasteSchedule).length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <BellIcon className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Unread Notifications
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {notifications.filter((n) => !n.read).length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <UserIcon className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Total Tenants
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {properties.reduce(
                          (total, p) => total + (p.tenants?.length || 0),
                          0
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Properties */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">
                    Recent Properties
                  </h3>
                </div>
                <div className="p-6">
                  {properties.slice(0, 5).map((property) => (
                    <div
                      key={property._id}
                      className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <BuildingIcon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {property.propertyName}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {property.address?.street}, {property.address?.city}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            property.wasteSchedule
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {property.wasteSchedule ? "Scheduled" : "No Schedule"}
                        </span>
                        <button className="p-1 text-gray-400 hover:text-gray-600">
                          <EyeIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Notifications */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">
                    Recent Notifications
                  </h3>
                </div>
                <div className="p-6">
                  {notifications.slice(0, 5).map((notification) => (
                    <div
                      key={notification._id}
                      className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            notification.read ? "bg-gray-100" : "bg-blue-100"
                          }`}
                        >
                          <BellIcon
                            className={`w-5 h-5 ${
                              notification.read
                                ? "text-gray-600"
                                : "text-blue-600"
                            }`}
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {notification.title}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {notification.message}
                          </p>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(notification.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "properties" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Properties</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                  <PlusIcon className="w-5 h-5 mr-2" />
                  Add Property
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <div
                    key={property._id}
                    className="bg-white rounded-lg shadow p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <BuildingIcon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-1 text-gray-400 hover:text-gray-600">
                          <EditIcon className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-red-600">
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <h3 className="font-medium text-gray-900 mb-2">
                      {property.propertyName}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {property.address?.street}, {property.address?.city},{" "}
                      {property.address?.state}
                    </p>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Tenants:</span>
                        <span className="font-medium">
                          {property.tenants?.length || 0}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Waste Schedule:</span>
                        <span
                          className={`font-medium ${
                            property.wasteSchedule
                              ? "text-green-600"
                              : "text-gray-500"
                          }`}
                        >
                          {property.wasteSchedule ? "Active" : "None"}
                        </span>
                      </div>
                    </div>

                    <button className="w-full mt-4 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Notifications
              </h2>

              <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                  {notifications.length > 0 ? (
                    <div className="space-y-4">
                      {notifications.map((notification) => (
                        <div
                          key={notification._id}
                          className={`p-4 border rounded-lg ${
                            notification.read ? "bg-gray-50" : "bg-blue-50"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                  notification.read
                                    ? "bg-gray-200"
                                    : "bg-blue-200"
                                }`}
                              >
                                <BellIcon
                                  className={`w-4 h-4 ${
                                    notification.read
                                      ? "text-gray-600"
                                      : "text-blue-600"
                                  }`}
                                />
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">
                                  {notification.title}
                                </h4>
                                <p className="text-sm text-gray-600 mt-1">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-gray-500 mt-2">
                                  {new Date(
                                    notification.createdAt
                                  ).toLocaleString()}
                                </p>
                              </div>
                            </div>
                            {!notification.read && (
                              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <BellIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No notifications found</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "schedule" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Waste Collection Schedule
              </h2>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ].map((day) => (
                    <div
                      key={day}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <h3 className="font-medium text-gray-900 mb-3">{day}</h3>
                      <div className="space-y-2">
                        {properties
                          .filter(
                            (property) =>
                              property.wasteSchedule?.collectionDay ===
                              day.toLowerCase()
                          )
                          .map((property) => (
                            <div key={property._id} className="text-sm">
                              <p className="font-medium text-gray-700">
                                {property.propertyName}
                              </p>
                              <p className="text-gray-600">
                                {property.wasteSchedule?.collectionTime}
                              </p>
                            </div>
                          ))}
                        {properties.filter(
                          (property) =>
                            property.wasteSchedule?.collectionDay ===
                            day.toLowerCase()
                        ).length === 0 && (
                          <p className="text-sm text-gray-500">
                            No collections scheduled
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

                     {activeTab === "map" && (
             <div className="space-y-6">
               <div className="flex items-center justify-between">
                 <h2 className="text-2xl font-bold text-gray-900">Property Map</h2>
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
                   markers={getMapMarkers()}
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
           )}

          {activeTab === "profile" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Profile</h2>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Personal Information
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          First Name
                        </label>
                        <p className="mt-1 text-sm text-gray-900">
                          {landlord?.firstName}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Last Name
                        </label>
                        <p className="mt-1 text-sm text-gray-900">
                          {landlord?.lastName}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <p className="mt-1 text-sm text-gray-900">
                          {landlord?.emailAddress}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Phone
                        </label>
                        <p className="mt-1 text-sm text-gray-900">
                          {landlord?.phoneNumber}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Account Statistics
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Total Properties:
                        </span>
                        <span className="text-sm font-medium">
                          {properties.length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Active Schedules:
                        </span>
                        <span className="text-sm font-medium">
                          {properties.filter((p) => p.wasteSchedule).length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">
                          Member Since:
                        </span>
                        <span className="text-sm font-medium">
                          {landlord?.createdAt
                            ? new Date(
                                landlord.createdAt
                              ).toLocaleDateString()
                            : "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Settings</h2>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Notification Preferences
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">
                          Email Notifications
                        </span>
                        <input
                          type="checkbox"
                          className="rounded"
                          defaultChecked
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">
                          SMS Notifications
                        </span>
                        <input type="checkbox" className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">
                          Push Notifications
                        </span>
                        <input
                          type="checkbox"
                          className="rounded"
                          defaultChecked
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Waste Management Settings
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">
                          Auto-schedule for new properties
                        </span>
                        <input type="checkbox" className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">
                          Weekly collection reports
                        </span>
                        <input
                          type="checkbox"
                          className="rounded"
                          defaultChecked
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default LandlordDashboard;
