import React, { useState, useEffect } from "react";
import {
  MapPinIcon,
  RouteIcon,
  CheckCircleIcon,
  ClockIcon,
  TriangleAlert,
  TruckIcon,
} from "lucide-react";
import MapComponent from './MapComponent';

const RouteManagement = () => {
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch("http://localhost:5000/admin/routes", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setRoutes(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching routes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRouteDetails = async (zone) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        `http://localhost:5000/admin/routes/${zone}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSelectedRoute(data.data);
      }
    } catch (error) {
      console.error("Error fetching route details:", error);
    }
  };

  const updateCollectionStatus = async (
    scheduleId,
    stopIndex,
    status,
    notes = ""
  ) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        "http://localhost:5000/admin/routes/collection-status",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            scheduleId,
            stopIndex,
            status,
            notes,
          }),
        }
      );

      if (response.ok) {
        // Refresh route details
        if (selectedRoute) {
          fetchRouteDetails(selectedRoute.zone);
        }
      }
    } catch (error) {
      console.error("Error updating collection status:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "missed":
        return "bg-red-100 text-red-800";
      case "cancelled":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return CheckCircleIcon;
      case "in-progress":
        return ClockIcon;
      case "missed":
        return TriangleAlert;
      default:
        return ClockIcon;
    }
  };

  // Convert route data to map markers and routes
  const getMapData = () => {
    if (!selectedRoute) return { markers: [], routes: [] };

    const markers = selectedRoute.stops?.map((stop, index) => ({
      lat: stop.coordinates?.lat || 0,
      lng: stop.coordinates?.lng || 0,
      type: 'stop',
      title: `Stop ${index + 1}`,
      description: stop.address,
      color: stop.status === 'completed' ? '#10B981' : 
             stop.status === 'in-progress' ? '#F59E0B' : '#6B7280'
    })).filter(marker => marker.lat !== 0 && marker.lng !== 0) || [];

    const routes = selectedRoute.stops?.length > 1 ? [{
      points: selectedRoute.stops.map(stop => ({
        lat: stop.coordinates?.lat || 0,
        lng: stop.coordinates?.lng || 0
      })).filter(point => point.lat !== 0 && point.lng !== 0),
      color: '#3B82F6'
    }] : [];

    return { markers, routes };
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
          <h1 className="text-2xl font-bold text-gray-900">Route Management</h1>
          <p className="text-gray-600">
            Manage collection routes and track progress
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Routes List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Active Routes
            </h3>

            {routes.length > 0 ? (
              <div className="space-y-3">
                {routes.map((route) => (
                  <div
                    key={route.id}
                    onClick={() => fetchRouteDetails(route.zone)}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedRoute?.zone === route.zone
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <RouteIcon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          {route.scheduleName}
                        </h4>
                        <p className="text-sm text-gray-600">
                          Zone: {route.zone}
                        </p>
                        <p className="text-xs text-gray-500">
                          {route.collectionDay} at {route.collectionTime}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-gray-600">
                          {route.totalStops} stops
                        </span>
                        <span className="text-gray-600">
                          {route.onlineAdmins} admins online
                        </span>
                      </div>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <RouteIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No active routes</p>
              </div>
            )}
          </div>
        </div>

        {/* Route Details */}
        <div className="lg:col-span-2">
          {selectedRoute ? (
            <div className="space-y-6">
              {/* Route Overview */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Route Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">
                      {selectedRoute.stops?.length || 0}
                    </p>
                    <p className="text-sm text-gray-600">Total Stops</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">
                      {selectedRoute.stops?.filter(
                        (stop) => stop.status === "completed"
                      ).length || 0}
                    </p>
                    <p className="text-sm text-gray-600">Completed</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <p className="text-2xl font-bold text-yellow-600">
                      {selectedRoute.stops?.filter(
                        (stop) => stop.status === "pending"
                      ).length || 0}
                    </p>
                    <p className="text-sm text-gray-600">Pending</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Schedule Information
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Schedule:</span>
                        <span className="font-medium">
                          {selectedRoute.schedule?.scheduleName}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Day:</span>
                        <span className="font-medium capitalize">
                          {selectedRoute.schedule?.collectionDay}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Time:</span>
                        <span className="font-medium">
                          {selectedRoute.schedule?.collectionTime}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Assigned Admins
                    </h4>
                    {selectedRoute.admins?.length > 0 ? (
                      <div className="space-y-2">
                        {selectedRoute.admins.map((admin, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                              <TruckIcon className="w-3 h-3 text-green-600" />
                            </div>
                            <span className="text-sm font-medium">
                              {admin.name}
                            </span>
                            <span className="text-xs text-gray-500">
                              ({admin.vehicle?.vehicleNumber})
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">
                        No admins assigned
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Stops List */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">
                    Collection Stops
                  </h3>
                </div>
                <div className="p-6">
                  {selectedRoute.stops?.length > 0 ? (
                    <div className="space-y-4">
                      {selectedRoute.stops.map((stop, index) => {
                        const StatusIcon = getStatusIcon(stop.status);
                        return (
                          <div
                            key={index}
                            className="border border-gray-200 rounded-lg p-4"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                  <span className="text-sm font-medium text-gray-600">
                                    {index + 1}
                                  </span>
                                </div>
                                <div>
                                  <h4 className="font-medium text-gray-900">
                                    {stop.address}
                                  </h4>
                                  <p className="text-sm text-gray-600">
                                    Coordinates:{" "}
                                    {stop.coordinates?.lat?.toFixed(6)},{" "}
                                    {stop.coordinates?.lng?.toFixed(6)}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center space-x-3">
                                <span
                                  className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                                    stop.status
                                  )}`}
                                >
                                  <div className="flex items-center space-x-1">
                                    <StatusIcon className="w-3 h-3" />
                                    <span className="capitalize">
                                      {stop.status}
                                    </span>
                                  </div>
                                </span>

                                {stop.status === "pending" && (
                                  <button
                                    onClick={() =>
                                      updateCollectionStatus(
                                        selectedRoute.id,
                                        index,
                                        "in-progress"
                                      )
                                    }
                                    className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                                  >
                                    Start
                                  </button>
                                )}

                                {stop.status === "in-progress" && (
                                  <button
                                    onClick={() =>
                                      updateCollectionStatus(
                                        selectedRoute.id,
                                        index,
                                        "completed"
                                      )
                                    }
                                    className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
                                  >
                                    Complete
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <MapPinIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">
                        No stops found for this route
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-center py-8">
                <RouteIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Select a route to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Route Map */}
      {selectedRoute && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Route Map</h3>
          <MapComponent
            mode="view"
            markers={getMapData().markers}
            routes={getMapData().routes}
            height="500px"
            showControls={true}
          />
          <div className="mt-4 flex items-center justify-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Completed</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>In Progress</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <span>Pending</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RouteManagement;
