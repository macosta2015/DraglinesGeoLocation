import React, { useState, useEffect } from 'react';

function latLonToXY(latitude, longitude) {
    var x = (longitude + 180) / 360 * 256;
    var y = (1 - Math.log(Math.tan(latitude * Math.PI / 180) + 1 / Math.cos(latitude * Math.PI / 180)) / Math.PI) / 2 * 256;
    return { x: x, y: y };
}

function GeoLocation() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
  const [xyCoordinates, setXYCoordinates] = useState({x: null, y: null});

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          // Convert latitude and longitude to X and Y coordinates
          const { x, y } = latLonToXY(position.coords.latitude, position.coords.longitude);
          setXYCoordinates({ x: x, y: y });
        },
        error => {
          setError(error.message);
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
      console.log("Geolocation is not supported by your browser");
    }
  }, []);

  return (
    <div>
      <h2>Geolocation Information</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          <p>Latitude: {latitude}, Longitude: {longitude}</p>
          {xyCoordinates.x !== null && xyCoordinates.y !== null && (
            <p>X: {xyCoordinates.x.toFixed(2)}, Y: {xyCoordinates.y.toFixed(2)}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default GeoLocation;