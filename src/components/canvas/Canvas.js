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

    const colours = [white, black, white, black, white, black, white, black, white, black, white, black];
    let radians = - Math.PI / 2;
    ctx.font = "20px Consolas";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for(let i=1; i<13; i+=1) {
      const daysInMonth = new Date(date.getFullYear(), i, 0).getDate();
      const stepSize = ((2 * Math.PI) / days) * daysInMonth;

      ctx.fillStyle = white;
      ctx.beginPath();
      ctx.moveTo(centreX, centreY);
      ctx.arc(centreX, centreY, radius, radians, radians + stepSize, false);
      ctx.lineTo(centreX, centreY);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();

      const textOffset = radius / 5;

      ctx.fillStyle = black;
      ctx.fillText(i, centreX + (radius - textOffset) * Math.cos(radians + stepSize / 2), centreY + (radius - textOffset) * Math.sin(radians + stepSize / 2));

      radians += stepSize;
    }

    ctx.strokeStyle = black;
    for(let i=0; i<days; i+=1) {
      const radians = (Math.PI / 2) - (i * ((2 * Math.PI) / days));
      const dayLineLen = radius / 10;
      const lineStartX = centreX + (radius - dayLineLen) * Math.cos(radians);
      const lineStartY = centreY - (radius - dayLineLen) * Math.sin(radians);
      const lineEndX = centreX + radius * Math.cos(radians);
      const lineEndY = centreY - radius * Math.sin(radians);

      ctx.beginPath();
      ctx.moveTo(lineStartX, lineStartY);
      ctx.lineTo(lineEndX, lineEndY);
      ctx.stroke();
    }
  }, []);

  return (
    <canvas ref={canvas} width={width} height={height} className="canvas">
      <p>Your browser doesn"t support canvas.</p>
    </canvas>
  );
}

export default Canvas;
