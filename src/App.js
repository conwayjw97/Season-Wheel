import React, { useReducer, useState } from 'react';

import Canvas from './components/canvas/Canvas.js';
import Settings from './components/settings/Settings.js';
import './App.css';

const date = new Date();
const initialDate = {day: date.getDate(), month: date.getMonth()+1, year: date.getFullYear()};

function reducer(state, action) {
  const elementId = action.nativeEvent.srcElement.id;
  switch (elementId) {
    case 'day':
      if(action.target.value > 0 && action.target.value < 32){
        return {...state, day: action.target.value};
      } else {
        return {...state};
      }
    case 'month':
      if(action.target.value > 0 && action.target.value < 13){
        return {...state, month: action.target.value};
      } else {
        return {...state};
      }
  }
}

function App() {
  const height = window.innerHeight;

  const [dateState, dateDispatch] = useReducer(reducer, initialDate);
  const [updateCount, setUpdateCount] = useState(0);

  const handleSave = () => {
    setUpdateCount(updateCount+1);
  }

  return (
    <div style={{'height':height}} className='App'>
      <Canvas date={dateState} updateCount={updateCount}/>
      <Settings date={dateState} handleDateChange={dateDispatch} handleSave={handleSave}/>
    </div>
  );
}

export default App;
