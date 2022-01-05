import React, { useReducer, useState } from 'react';

import Canvas from './components/canvas/Canvas.js';
import Settings from './components/settings/Settings.js';
import './App.css';

const date = new Date();
const initialDate = {
  day: date.getDate(),
  month: date.getMonth()+1,
  year: date.getFullYear(),
  compDisabled: true,
  compDay: date.getDate(),
  compMonth: date.getMonth()+1
};

function dateReducer(state, action) {
  const elementId = action.nativeEvent.srcElement.id;
  const newValue = action.target.value;
  switch (elementId) {
    case 'day':
      if(newValue > 0 && newValue < 32){
        if(state.compMonth == state.month && state.compDay < newValue){
          return {...state, day: newValue, compDay: newValue};
        } else {
          return {...state, day: newValue};
        }
      } else {
        return {...state};
      }
    case 'month':
      if(newValue > 0 && newValue < 13){
        if(state.compMonth < newValue){
          return {...state, month: newValue, compMonth: newValue};
        } else {
          return {...state, month: newValue};
        }
      } else {
        return {...state};
      }
    case 'year':
      if(newValue > 0){
        return {...state, year: newValue};
      } else {
        return {...state};
      }
    case 'compDisabled':
      return {...state, compDisabled: !action.target.checked};
    case 'compDay':
      if(newValue > 0 && newValue < 32){
        return {...state, compDay: newValue};
      } else {
        return {...state};
      }
    case 'compMonth':
      if(newValue > 0 && newValue < 13 && newValue > state.month){
        return {...state, compMonth: newValue};
      } else {
        return {...state};
      }
  }
}

function App() {
  const height = window.innerHeight;

  const [dateState, dateDispatch] = useReducer(dateReducer, initialDate);
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
