import React, { useState } from 'react';
import axios from 'axios';
import GeoLocation from './components/GeoLocation.js'; // Import the GeoLocation component
import Button from './components/Example.js'; // Import the Button component

function App() {
  const [fetchingLocation, setFetchingLocation] = useState(false);

  const handleClick = async () => {
    setFetchingLocation(true);
    try {
      // Example POST request to create a user
      const response = await axios.post('http://localhost:5000/users', {
        username: 'exampleUser',
        email: 'user@example.com',
      });
      console.log(response.data); // Log the created user data
    } catch (error) {
      console.error('Error creating user:', error);
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



// import React, { useState } from 'react';
// import GeoLocation from './components/GeoLocation.js'; // Import the GeoLocation component
// import Button from './components/Example.js'; // Import the Button component

// function App() {
//   const [fetchingLocation, setFetchingLocation] = useState(false);

//   const handleClick = () => {
//     setFetchingLocation(true);
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <GeoLocation fetching={fetchingLocation} />
//         <Button onClick={handleClick} />
//       </header>
//     </div>
//   );
// }

// export default App;