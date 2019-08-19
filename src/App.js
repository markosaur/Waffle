import React from 'react';

//import components

// import style sheets
import 'reset-css';
import './App.css';
import Waffle from './Components/Waffle';



function App() {
  return (
    <div className="App">
        <header>
          <h1>Waf-full Maker</h1>
        </header>
        <Waffle/>
    </div>
  );
}

export default App;
