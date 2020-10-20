import React, {useState, useEffect} from 'react';

import Header from './components/Header'
import MapContainer from './components/MapContainer'
import BreweryListing from './components/BreweryListing';

import './App.css';

function App() {

  const baseURL = "http://localhost:3000/breweries"
  const [selectedState, setSelectedState] = useState("")
  const [breweryDB, setBreweryDB] = useState([])
  // const [breweriesByState, setBreweriesByState] = useState({})

  useEffect(() => {
    fetchDataAndSetState()
  }, [])

  const fetchDataAndSetState = async () => {
    await fetch(baseURL)
      .then(response => response.json())
      .then(data => setBreweryDB({breweryDB: data}))
  }
  // const changeState = (clickedState) => {
  //   setSelectedState(clickedState)
  // }

  return (
    <div className="App">
      <Header/>
      <MapContainer setSelectedState={setSelectedState}/>
      <BreweryListing breweries={breweryDB} selectedState={selectedState}/>
    </div>
  );
}

export default App;
