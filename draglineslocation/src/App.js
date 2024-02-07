import React, { useState } from 'react';
import GeoLocation from './components/GeoLocation.js'; // Import the GeoLocation component
import Button from './components/Example.js'; // Import the Button component

function App() {
  const [fetchingLocation, setFetchingLocation] = useState(false);

  const handleClick = () => {
    setFetchingLocation(true);
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