import React, { useState } from "react";

export default function UserLocation() {
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const [error, setError] = useState(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setError(null);
      },
      (err) => {
        setError(err.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Get Your Coordinates</h2>
      <button
        onClick={getLocation}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Get Location
      </button>

      {coords.lat && coords.lng && (
        <p className="mt-4">
          Latitude: {coords.lat}, Longitude: {coords.lng}
        </p>
      )}

      {error && <p className="mt-4 text-red-600">Error: {error}</p>}
    </div>
  );
}
