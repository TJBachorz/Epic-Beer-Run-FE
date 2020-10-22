import React, {useState, useEffect} from 'react';

import Header from './components/Header'
import MapContainer from './components/MapContainer'
import BreweryListing from './components/BreweryListing';

import './App.css';

function App() {

  const baseURL = "https://epic-beer-run.herokuapp.com"
  const [selectedState, setSelectedState] = useState("")
  const [breweryDB, setBreweryDB] = useState([])
  const [coordinates, setCoordinates] = useState([])

  useEffect(() => {
    fetchDataAndSetState()
  }, [])

  const fetchDataAndSetState = async () => {
    await fetch(`${baseURL}/breweries`)
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

  const logCoordinates = (brewery) => {
    const { longitude, latitude } = brewery
    if (!findBreweryCoordinates(longitude, latitude)) {
      setCoordinates([...coordinates, [longitude, latitude, brewery]])
    } else {
      setCoordinates(filterOutCoordinates(longitude, latitude))
    }
  }

  const handleClick = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
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
        coordinates={coordinates}
      />
      <button className="top-button" onClick={handleClick}>
        TOP
      </button>
    </div>
  );
}

export default App;
