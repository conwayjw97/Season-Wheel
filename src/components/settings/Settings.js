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

        <label className="" style={{padding: "1em 0", display: "block"}}>
         Date:
          <input type="number" style={{marginLeft: "0.25em", width: "45px", fontSize: "28px"}} defaultValue={props.date.getDate()} onChange={props.handleDegreeAngleChange}/>
          /
          <input type="number" style={{width: "45px", fontSize: "28px"}} defaultValue={props.date.getMonth()} onChange={props.handleRadianAngleChange}/>
          /
          {props.date.getFullYear()}
        </label>

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
