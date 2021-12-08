import React, { useReducer } from 'react';

import Canvas from './components/canvas/Canvas.js';
import Settings from './components/settings/Settings.js';
import './App.css';

const date = new Date();
const initialDate = {day: date.getDate(), month: date.getMonth(), year: date.getFullYear()};

function reducer(state, action) {
  const elementId = action.nativeEvent.srcElement.id;
  switch (elementId) {
    case 'day':
      return {...state, day: action.target.value};
    case 'month':
      return {...state, month: action.target.value};
  }
}

function App() {
  const height = window.innerHeight;

  const [dateState, dateDispatch] = useReducer(reducer, initialDate);

  const handleSave = () => {
    console.log('Saved!');
  }

  return (
    <div style={{'height':height}} className='App'>
      <Canvas/>
      <Settings date={dateState} handleDateChange={dateDispatch} handleSave={handleSave}/>
    </div>
  );
}

export default App;
