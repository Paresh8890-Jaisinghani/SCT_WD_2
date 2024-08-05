import './App.css';
import React from 'react';
import { FaPlayCircle } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { PiFlagPennantFill } from "react-icons/pi";


function App() {
  return (
    <div className="App">
      <h1>StopWatch</h1>
      <div className="timerbox">
        {/* for timer */}
        <div className="timer">
          
        </div>
        {/* for lap time */}
        <div className="lap">
        <button> <PiFlagPennantFill/></button>
        </div>
        {/* for starting the time */}
        <div className="start">
         <button><FaPlayCircle/></button> 
        </div>

        {/* for reset */}
        <div className="reset">
          <button><GrPowerReset/></button>
        </div>
      </div>
    </div>
  );
}

export default App;
