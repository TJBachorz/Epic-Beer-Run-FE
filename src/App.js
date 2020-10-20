import React, {useState, useEffect} from 'react';

import Header from './components/Header'
import MapContainer from './components/MapContainer'
import BreweryListing from './components/BreweryListing';

import './App.css';

function App() {

  const baseURL = "http://localhost:3000/breweries"
  const [selectedState, setSelectedState] = useState("")
  const [breweryDB, setBreweryDB] = useState([])

  useEffect(() => {
    fetch(baseURL)
      .then(response => response.json())
      .then(data => setBreweryDB({breweryDB: data}))
  }, [])

  const changeState = (clickedState) => {
    setSelectedState(selectedState = clickedState)
    
  }

  return (
    <div className="App">
      <Header/>
      <MapContainer/>
      <BreweryListing/>
    </div>
  );
}

export default App;
