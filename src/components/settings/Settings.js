import React, { useState } from "react";

import "./Settings.css";

function Settings(props) {
  const [showing, setShowing] = useState(false);

  const handleButtonClick = (event) => {
    setShowing(!showing);
  }

  return (
    <div>
      <button className="button openButton" style={{bottom:60, left: 60}} onClick={handleButtonClick}>&#9998;</button>
      <div className="settingsMenu" style={{width: showing ? "500px" : "0"}}>
        <button className="button closeButton" onClick={handleButtonClick}>&times;</button>

        <label className="heading">
         Date
        </label>
        <label className="dateField">
          <input id="day" type="number" className="dayInput" value={props.date.day} onChange={props.handleDateChange}/>
          /
          <input id="month" type="number" className="monthInput" value={props.date.month} onChange={props.handleDateChange}/>
          /
          <input id="year" type="number" className="yearInput" value={props.date.year} onChange={props.handleDateChange}/>
        </label>

        <hr/>

        <label className="heading">
         Comparative Date
         <input id="compDisabled" type="checkbox" className="checkboxInput" checked={!props.date.compDisabled} onChange={props.handleDateChange}/>
        </label>
        <label className="dateField">
          <input id="compDay" type="number" className="dayInput" disabled={props.date.compDisabled} value={props.date.compDay} onChange={props.handleDateChange}/>
          /
          <input id="compMonth" type="number" className="monthInput" disabled={props.date.compDisabled} value={props.date.compMonth} onChange={props.handleDateChange}/>
          /
          {props.date.year}
        </label>

        <hr/>

        <label className="heading">
         Seasons
         <span className="variableDropdown">
           <select id="seasons" value="default" onChange={props.handleSeasonsChange}>
             <option value="default">Astronomical</option>
             <option value="top-down">Meteorological</option>
             <option value="zoomed">None</option>
           </select>
         </span>
        </label>

        <hr/>
        <div className="separator" />

        <button className="save" onClick={props.handleSave}>Save</button>

        <div id="credits" style={{position: "absolute", right: 10, top: window.innerHeight-30}}>
          <a href="https://github.com/conwayjw97">github.com/conwayjw97/</a>
        </div>
      </div>
    </div>
  );
}

export default Settings;
