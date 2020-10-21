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

  const filterOutCoordinates = (longitude, latitude) => {
    return coordinates
      .filter(coordinate => {
        return (coordinate[0] !== longitude) 
          && (coordinate[1] !== latitude)
      }
    )
  }

  const findBreweryCoordinates = (longitude, latitude) => {
    return coordinates
      .find(coordinate => {
        return (coordinate[0] === longitude) 
          && (coordinate[1] === latitude)
      }
    )
  }

  const logCoordinates = ({longitude, latitude, name}) => {
    if (!findBreweryCoordinates(longitude, latitude)) {
      setCoordinates([...coordinates, [longitude, latitude]])
    } else {
      setCoordinates(filterOutCoordinates(longitude, latitude))
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
