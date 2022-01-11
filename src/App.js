// Data Ideas: Seasons, Temperature, Daylight

import React, { useReducer, useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from "react-helmet-async";
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
  const [scriptsLoaded, setScriptsLoaded] = useState(false);

  const handleSave = () => {
    setUpdateCount(updateCount+1);
  }

  async function waitForScripts(){
    const timer = ms => new Promise(res => setTimeout(res, ms));

    while(typeof window.eqsol != "function"){
      await timer(10);
    }

    setScriptsLoaded(true);
  }

  useEffect(() => {
    waitForScripts();
  }, []);

  return (
    <HelmetProvider>
      <div style={{'height':height}} className='App'>
        <Helmet>
          <script src="http://www.suchelu.it/astrojs/astrojs.js" type="text/javascript" />
        </Helmet>
        <Canvas date={dateState} updateCount={updateCount} scriptsLoaded={scriptsLoaded}/>
        <Settings date={dateState} handleDateChange={dateDispatch} handleSave={handleSave}/>
      </div>
    </HelmetProvider>
  );
}

export default App;
