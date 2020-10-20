import React, {useState, useEffect} from 'react';

import Header from './components/Header'
import MapContainer from './components/MapContainer'
import BreweryListing from './components/BreweryListing';

import './App.css';

function App() {

  const baseURL = "http://localhost:3000/breweries"
  const [selectedState, setSelectedState] = useState("")
  const [breweryDB, setBreweryDB] = useState([])
  const [coordinates, setCoordinates] = useState([])

  useEffect(() => {
    fetchDataAndSetState()
  }, [])

  const fetchDataAndSetState = async () => {
    await fetch(baseURL)
      .then(response => response.json())
      .then(data => setBreweryDB(data))
  }

  const filterOutCoordinates = (brewery) => {
    return coordinates.filter(
      coordinate => (coordinate[0] !== brewery.longitude) && (coordinate[1] !== brewery.latitude)
    )
  }

  const findBreweryCoordinates = (brewery) => {
    return coordinates.find(
      coordinate => (coordinate[0] === brewery.longitude) && (coordinate[1] === brewery.latitude)
    )
  }

  const logCoordinates = (brewery) => {
    if (!findBreweryCoordinates(brewery)) {
      setCoordinates([...coordinates, [brewery.longitude, brewery.latitude]])
    } else {
      setCoordinates(filterOutCoordinates(brewery))
    }
  }

  return (
    <div className="App">
      <Header/>
      <MapContainer 
        setSelectedState={setSelectedState} 
        coordinates={coordinates}
      />
      <BreweryListing 
        breweries={breweryDB} 
        selectedState={selectedState}
        logCoordinates={logCoordinates}
      />
    </div>
  );
}

export default App;
