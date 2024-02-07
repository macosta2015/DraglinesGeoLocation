import React, { useState, useEffect } from 'react';

// Function to convert latitude and longitude to UTM X and Y coordinates
function latLonToUTM(latitude, longitude) {
  // Constants for UTM conversion
  const k0 = 0.9996; // Scale factor
  const a = 6378137.0; // Semi-major axis of the ellipsoid (WGS84)
  const eSquared = 0.00669438; // Square of the eccentricity of the ellipsoid
  const lonOrigin = -183.0; // Central meridian of the zone (Zone 1)

  // Convert latitude and longitude to radians
  const latRad = latitude * Math.PI / 180;
  const lonRad = longitude * Math.PI / 180;

  // Calculate UTM constants
  const aSquared = Math.pow(a, 2);
  const ePrimeSquared = eSquared / (1 - eSquared);
  const nu = a / Math.sqrt(1 - eSquared * Math.sin(latRad) * Math.sin(latRad));
  const T = Math.tan(latRad) * Math.tan(latRad);
  const C = ePrimeSquared * Math.cos(latRad) * Math.cos(latRad);
  const A = Math.cos(latRad) * (lonRad - (lonOrigin * Math.PI / 180));

  // Calculate UTM coordinates
  const M = a * ((1 - eSquared / 4 - 3 * eSquared * eSquared / 64 - 5 * eSquared * eSquared * eSquared / 256) * latRad
              - (3 * eSquared / 8 + 3 * eSquared * eSquared / 32 + 45 * eSquared * eSquared * eSquared / 1024) * Math.sin(2 * latRad)
              + (15 * eSquared * eSquared / 256 + 45 * eSquared * eSquared * eSquared / 1024) * Math.sin(4 * latRad)
              - (35 * eSquared * eSquared * eSquared / 3072) * Math.sin(6 * latRad));
  const easting = k0 * nu * (A + (1 - T + C) * Math.pow(A, 3) / 6
                  + (5 - 18 * T + T * T + 72 * C - 58 * ePrimeSquared) * Math.pow(A, 5) / 120) + 500000.0;
  const northing = k0 * (M + nu * Math.tan(latRad) * (Math.pow(A, 2) / 2
                   + (5 - T + 9 * C + 4 * C * C) * Math.pow(A, 4) / 24
                   + (61 - 58 * T + T * T + 600 * C - 330 * ePrimeSquared) * Math.pow(A, 6) / 720));

  return { x: easting, y: northing };
}

function GeoLocation({ fetching }) {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
  const [x, setX] = useState(null);
  const [y, setY] = useState(null);

  useEffect(() => {
    if (fetching) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          position => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            const { x, y } = latLonToUTM(position.coords.latitude, position.coords.longitude);
            setX(x);
            setY(y);
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
    }
  }, [fetching]);

  return (
    <div>
      <h2>Geolocation Information</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          {latitude && longitude && (
            <div>
              <p>Latitude: {latitude}, Longitude: {longitude}</p>
              <p>X (UTM): {x.toFixed(2)}, Y (UTM): {y.toFixed(2)}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default GeoLocation;