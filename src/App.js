import React, { useReducer, useState } from 'react';

import Canvas from './components/canvas/Canvas.js';
import Settings from './components/settings/Settings.js';
import './App.css';

const date = new Date();
const initialDate = {day: date.getDate(), month: date.getMonth()+1, year: date.getFullYear(), compDisabled: true, compDay: date.getDate(), compMonth: date.getMonth()+1};

function dateReducer(state, action) {
  console.log(state);
  const elementId = action.nativeEvent.srcElement.id;
  switch (elementId) {
    case 'day':
      if(action.target.value > 0 && action.target.value < 32){
        if(state.compMonth == state.month && state.compDay < action.target.value){
          return {...state, day: action.target.value, compDay: action.target.value};
        } else {
          return {...state, day: action.target.value};
        }
      } else {
        return {...state};
      }
    case 'month':
      if(action.target.value > 0 && action.target.value < 13){
        if(state.compMonth < action.target.value){
          return {...state, month: action.target.value, compMonth: action.target.value};
        } else {
          return {...state, month: action.target.value};
        }
      } else {
        return {...state};
      }
    case 'year':
      if(action.target.value > 0){
        return {...state, year: action.target.value};
      } else {
        return {...state};
      }
    case 'compDisabled':
      return {...state, compDisabled: !action.target.checked};
    case 'compDay':
      if(action.target.value > 0 && action.target.value < 32){
        return {...state, compDay: action.target.value};
      } else {
        return {...state};
      }
    case 'compMonth':
      if(action.target.value > 0 && action.target.value < 13 && action.target.value > state.month){
        return {...state, compMonth: action.target.value};
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
