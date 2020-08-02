import React from 'react';
import HeaderComponent from './components/header';
import HomePage from './pages/homepage.jsx'
import "./App.css"

function App() {
  return (
    <div className="App">
     <HeaderComponent/>
     <HomePage />
     
    </div>
  );
}

export default App;
