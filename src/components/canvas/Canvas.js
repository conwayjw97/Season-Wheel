import React, { useEffect, useRef } from "react";
import "./Canvas.css";

const black = "rgb(0, 0, 0)";
const white = "rgb(255, 255, 255)";

function degToRad(degrees) {
  return degrees * Math.PI / 180;
}

function radToDeg(radians) {
  return radians * 180 / Math.PI;
}

function isLeapYear(year){
  return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
}

function Canvas(props) {
  const canvas = useRef(null);
  const width = window.innerWidth;
  const height = window.innerHeight;

  useEffect(() => {
    const centreX = width/2;
    const centreY = height/2;
    const radius = Math.floor(height/3);

    const ctx = canvas.current.getContext("2d");
    // ctx.fillStyle = white;
    // ctx.beginPath();
    // ctx.arc(centreX, centreY, radius, 0, 2 * Math.PI);
    // ctx.fill();

    const date = new Date();
    const days = isLeapYear(date.getFullYear()) ? 366 : 365;

    // ctx.strokeStyle = black;
    // for(let i=0; i<days; i+=1) {
    //   const radians = i * ((2 * Math.PI) / days) + (Math.PI / 2);
    //   const dayLineLen = radius / 10;
    //   const lineStartX = centreX + (radius - dayLineLen) * Math.cos(radians);
    //   const lineStartY = centreY - (radius - dayLineLen) * Math.sin(radians);
    //   const lineEndX = centreX + radius * Math.cos(radians);
    //   const lineEndY = centreY - radius * Math.sin(radians);
    //
    //   ctx.beginPath();
    //   ctx.moveTo(lineStartX, lineStartY);
    //   ctx.lineTo(lineEndX, lineEndY);
    //   ctx.stroke();
    // }

    const colours = [white, black, white, black, white, black, white, black, white, black, white, black];
    let radianStep = 0;
    for(let i=1; i<13; i+=1) {
      const daysInMonth = new Date(date.getFullYear(), i, 0).getDate();
      const stepSize = ((2 * Math.PI) / days) * daysInMonth;
      console.log(stepSize);

      ctx.fillStyle = colours[i-1];
      ctx.beginPath();
      ctx.arc(centreX, centreY, radius, radianStep, radianStep + stepSize);
      ctx.fill();

      radianStep += stepSize;
    }
  }, []);

  return (
    <canvas ref={canvas} width={width} height={height} className="canvas">
      <p>Your browser doesn"t support canvas.</p>
    </canvas>
  );
}

export default Canvas;