import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './containers/NavBar'
import MainContainer from './containers/MainContainer'

function App() {
  return (
    <div className="App">
      <NavBar />
      <MainContainer />
    </div>
  );
}

export default App;
