import React, { useState } from 'react';
import GeoLocation from './components/GeoLocation.js'; // Import the GeoLocation component
import Button from './components/Example.js'; // Import the Example component


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Testing
        </p>
        <GeoLocation /> 
        <Button /> 
      </header>
    </div>
  );
}



export default App;
