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
        <label className="" style={{padding: "1em 0", display: "block"}}>
          <input id="day" type="number" style={{marginLeft: "0.25em", width: "45px", fontSize: "28px"}} value={props.date.day} onChange={props.handleDateChange}/>
          /
          <input id="month" type="number" style={{width: "45px", fontSize: "28px"}} value={props.date.month} onChange={props.handleDateChange}/>
          /
          {props.date.year}
        </label>

        <hr/>

        <label className="heading">
         Comparative Date
         <input id="compDisabled" type="checkbox" style={{marginLeft: "1em", transform: "scale(1.5)"}} checked={!props.compDate.disabled} onChange={props.handleCompDateChange}/>
        </label>
        <label className="" style={{padding: "1em 0", display: "block"}}>
          <input id="compDay" type="number" style={{marginLeft: "0.25em", width: "45px", fontSize: "28px"}} disabled={props.compDate.disabled} value={props.compDate.day} onChange={props.handleCompDateChange}/>
          /
          <input id="compMonth" type="number" style={{width: "45px", fontSize: "28px"}} disabled={props.compDate.disabled} value={props.compDate.month} onChange={props.handleCompDateChange}/>
          /
          {props.date.year}
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
