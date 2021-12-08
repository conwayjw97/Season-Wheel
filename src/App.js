import React, { useState } from 'react';

import Canvas from './components/canvas/Canvas.js';
import Settings from "./components/settings/Settings.js";
import './App.css';

function App() {
  const height = window.innerHeight;
  const date = new Date();

  const [day, setDay] = useState(date.getDate());
  const [month, setMonth] = useState(date.getMonth());

  const handleDateChange = (event) => {
    const elementId = event.nativeEvent.srcElement.id;
    switch (elementId) {
      case "day":
        if(event.target.value < 32 && event.target.value > 0)
          setDay(event.target.value);
        break;
      case "month":
        if(event.target.value < 13 && event.target.value > 0)
          setMonth(event.target.value);
        break;
    };
  }

  const handleSave = () => {
    console.log("Saved!");
  }

  return (
    <div style={{"height":height}} className="App">
      <Canvas/>
      <Settings date={date} day={day} month= {month} handleDateChange={handleDateChange} handleSave={handleSave}/>
    </div>
  );
}

export default App;
