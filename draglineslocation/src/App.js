import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import GeoLocation from './components/GeoLocation.js'; // Import the GeoLocation component
import Button from './components/Example.js'; // Import the Button component

function App() {
  const [fetchingLocation, setFetchingLocation] = useState(false);
  const [coordinates, setCoordinates] = useState(null);

  const handleClick = async () => {
    setFetchingLocation(true);
    try {
      // Assume GeoLocation returns an object with latitude and longitude
      const { latitude, longitude } = await getGeoLocation();
      setCoordinates({ latitude, longitude });

      // Save coordinates to the backend
      await saveCoordinates({ latitude, longitude });

      console.log("Coordinates saved:", { latitude, longitude });
    } catch (error) {
      console.error('Error saving coordinates:', error);
    } finally {
      setFetchingLocation(false);
    }
  };

  const getGeoLocation = async () => {
    // Simulated function to get geolocation
    return { latitude: 27.994402, longitude: -81.760254 }; // Example coordinates for Florida
  };

  const saveCoordinates = async (coordinates) => {
    try {
      await axios.post('http://localhost:5000/coordinates', coordinates);
    } catch (error) {
      console.error('Error saving coordinates:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <GeoLocation fetching={fetchingLocation} />
        <Button onClick={handleClick} />
      </header>
    </div>
  );
}

export default App;
