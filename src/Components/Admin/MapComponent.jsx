import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom icons
const createCustomIcon = (color = "#3B82F6") => {
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="
      background-color: ${color};
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

const adminIcon = createCustomIcon("#EF4444");
const stopIcon = createCustomIcon("#10B981");
const routeIcon = createCustomIcon("#F59E0B");

// Map controller for initial view
function MapController({ center, zoom }) {
  const map = useMap();

  useEffect(() => {
    if (center && center.lat && center.lng) {
      map.setView([center.lat, center.lng], zoom || 13);
    }
  }, [center, zoom, map]);

  return null;
}

const MapComponent = ({
  mode = "view", // 'view', 'select', 'route'
  initialCenter = { lat: 27.7172, lng: 85.324 }, // Kathmandu default
  initialZoom = 13,
  markers = [],
  routes = [],
  onLocationSelect,
  onRouteUpdate,
  height = "500px",
  showControls = true,
  className = "",
}) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [routePoints, setRoutePoints] = useState([]);
  const [centerCoordinates, setCenterCoordinates] = useState(initialCenter);
  const mapRef = useRef(null);

  // Handle map click for location selection
  const handleMapClick = (e) => {
    if (mode === "select" && onLocationSelect) {
      const { lat, lng } = e.latlng;
      const newLocation = { lat, lng };
      setSelectedLocation(newLocation);
      onLocationSelect(newLocation);
    }
  };

  // Update center coordinates on map move
  const handleMapMove = () => {
    if (mapRef.current) {
      const center = mapRef.current.getCenter();
      setCenterCoordinates({ lat: center.lat, lng: center.lng });
    }
  };

  // Select center coordinates
  const handleSelectCenterCoordinates = () => {
    if (mode === "select" && onLocationSelect) {
      onLocationSelect(centerCoordinates);
    }
  };

  // Clear route
  const clearRoute = () => {
    setRoutePoints([]);
    if (onRouteUpdate) {
      onRouteUpdate([]);
    }
  };

  // Get current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newCenter = { lat: latitude, lng: longitude };
          if (mapRef.current) {
            mapRef.current.setView([latitude, longitude], 15);
          }
          if (onLocationSelect) {
            onLocationSelect(newCenter);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          alert(
            "Unable to get your location. Please enable location services."
          );
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // Fit bounds to markers
  const fitToMarkers = () => {
    if (markers.length > 0 && mapRef.current) {
      const group = new L.featureGroup(
        markers.map((marker) => L.marker([marker.lat, marker.lng]))
      );
      mapRef.current.fitBounds(group.getBounds().pad(0.1));
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Center Pin (above map layers) */}
      {mode === "select" && (
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ zIndex: 1000 }}
        >
          <div className="w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>
      )}

      {/* Coordinates Card (updates with map center) */}
      {mode === "select" && (
        <div
          className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-4 border border-gray-200"
          style={{ zIndex: 1000 }}
        >
          <div className="text-sm font-medium text-gray-700 mb-2">
            Center Coordinates
          </div>
          <div className="text-xs text-gray-600 mb-3">
            <div>Latitude: {centerCoordinates.lat.toFixed(6)}</div>
            <div>Longitude: {centerCoordinates.lng.toFixed(6)}</div>
          </div>
          <button
            onClick={handleSelectCenterCoordinates}
            className="w-full bg-blue-600 text-white text-xs py-2 px-3 rounded hover:bg-blue-700 transition-colors"
          >
            Select These Coordinates
          </button>
        </div>
      )}

      {/* Map Controls */}
      {showControls && (
        <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
          {mode === "select" && (
            <button
              onClick={getCurrentLocation}
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg shadow-lg transition-colors"
              title="Get Current Location"
            >
              📍
            </button>
          )}
          {mode === "route" && (
            <button
              onClick={clearRoute}
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg shadow-lg transition-colors"
              title="Clear Route"
            >
              ❌
            </button>
          )}
          {markers.length > 0 && (
            <button
              onClick={fitToMarkers}
              className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg shadow-lg transition-colors"
              title="Fit to Markers"
            >
              🔍
            </button>
          )}
        </div>
      )}

      {/* Map */}
      <div style={{ height }} className="rounded-lg overflow-hidden shadow-lg">
        <MapContainer
          ref={mapRef}
          center={[initialCenter.lat, initialCenter.lng]}
          zoom={initialZoom}
          className="h-full w-full"
          onClick={handleMapClick}
          onMove={handleMapMove}
        >
          <MapController center={initialCenter} zoom={initialZoom} />

          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          {/* markers */}
          {markers.map((marker, index) => (
            <Marker
              key={`marker-${index}`}
              position={[marker.lat, marker.lng]}
              icon={
                marker.type === "admin"
                  ? adminIcon
                  : marker.type === "stop"
                  ? stopIcon
                  : marker.type === "route"
                  ? routeIcon
                  : createCustomIcon(marker.color)
              }
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold text-gray-800">
                    {marker.title || "Location"}
                  </h3>
                  {marker.description && (
                    <p className="text-sm text-gray-600 mt-1">
                      {marker.description}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    {marker.lat.toFixed(6)}, {marker.lng.toFixed(6)}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* route lines */}
          {routes.map((route, index) => (
            <Polyline
              key={`route-${index}`}
              positions={route.points.map((point) => [point.lat, point.lng])}
              color={route.color || "#3B82F6"}
              weight={3}
              opacity={0.8}
            />
          ))}

          {/* current route points */}
          {routePoints.map((point, index) => (
            <Marker
              key={`route-point-${index}`}
              position={[point.lat, point.lng]}
              icon={createCustomIcon("#F59E0B")}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold text-gray-800">
                    Route Point {index + 1}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {point.lat.toFixed(6)}, {point.lng.toFixed(6)}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* drawn route line */}
          {routePoints.length > 1 && (
            <Polyline
              positions={routePoints.map((point) => [point.lat, point.lng])}
              color="#F59E0B"
              weight={3}
              opacity={0.8}
              dashArray="5, 10"
            />
          )}

          {/* selected location marker */}
          {selectedLocation && (
            <Marker
              position={[selectedLocation.lat, selectedLocation.lng]}
              icon={createCustomIcon("#EF4444")}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold text-gray-800">
                    Selected Location
                  </h3>
                  <p className="text-xs text-gray-500">
                    {selectedLocation.lat.toFixed(6)},{" "}
                    {selectedLocation.lng.toFixed(6)}
                  </p>
                </div>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapComponent;
