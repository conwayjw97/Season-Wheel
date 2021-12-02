import React, { useEffect, useRef } from "react";
import "./DateInfo.css";

function DateInfo(props) {
  const date = new Date();

  return (
    <div>
    {date.getFullYear()}
    </div>
  );
}

export default DateInfo;
