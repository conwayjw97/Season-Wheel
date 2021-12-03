import React, { useEffect, useRef } from "react";
import "./Canvas.css";

const black = "rgb(0, 0, 0)";
const white = "rgb(255, 255, 255)";
const red = "rgb(255, 0, 0)";
const transparent = "rgba(255, 255, 255, 0)";
const feintGrey = "rgba(120, 120, 120, 0.3)";
const springGreen = "rgba(0, 255, 0, 0.65)";
const summerYellow = "rgba(230, 230, 0, 0.65)";
const autumnBrown = "rgba(255, 127, 0, 0.65)";
const winterBlue = "rgba(0, 255, 255, 0.65)";

const Summer = Symbol("summer");
const Autumn = Symbol("autumn");
const Winter = Symbol("winter");
const Spring = Symbol("spring");

const monthNames = [
  "January", "February", "March", "April", "May", "June", "July", "August",
  "September", "October", "November", "December"
];

const monthColours = [
  winterBlue, winterBlue, springGreen, springGreen, springGreen, summerYellow,
  summerYellow, summerYellow, autumnBrown, autumnBrown, autumnBrown, winterBlue
];

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
    const date = new Date();
    const days = isLeapYear(date.getFullYear()) ? 366 : 365;

    ctx.font = "90px Consolas";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillStyle = white;
    ctx.fillText(date.getFullYear(), centreX, centreY - radius - 70);

    ctx.fillStyle = white;
    ctx.beginPath();
    ctx.arc(centreX, centreY, radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();

    let radians = - Math.PI / 2;
    ctx.font = "20px Consolas";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const textOffset = radius / 3;
    for(let i=1; i<13; i+=1) {
      const daysInMonth = new Date(date.getFullYear(), i, 0).getDate();
      const stepSize = ((2 * Math.PI) / days) * daysInMonth;

      ctx.fillStyle = monthColours[i-1];

      // const arcStartX = centreX + radius/2 * Math.cos(radians);
      // const arcStartY = centreY + radius/2 * Math.sin(radians);
      // const arcEndX = centreX + radius/2 * Math.cos(radians + stepSize);
      // const arcEndY = centreY + radius/2 * Math.sin(radians + stepSize);
      // const gradient = ctx.createLinearGradient(arcStartX, arcStartY, arcEndX, arcEndY);
      // console.log(i-1);
      // console.log(monthColours[i-2] + " : " + monthColours[i-1] + " : " + monthColours[i]);
      // if (monthColours[i] !== undefined && monthColours[i-1] !== monthColours[i]) {
      //   gradient.addColorStop(0, monthColours[i-1]);
      //   gradient.addColorStop(0.75, monthColours[i-1]);
      //   gradient.addColorStop(1, transparent);
      //   ctx.fillStyle = gradient;
      // }
      // else if(monthColours[i-2] !== undefined && monthColours[i-2] !== monthColours[i-1]){
      //   gradient.addColorStop(0, transparent);
      //   gradient.addColorStop(0.75, monthColours[i-1]);
      //   gradient.addColorStop(1, monthColours[i-1]);
      //   ctx.fillStyle = gradient;
      // }

      ctx.beginPath();
      ctx.moveTo(centreX, centreY);
      ctx.arc(centreX, centreY, radius, radians, radians + stepSize, false);
      ctx.lineTo(centreX, centreY);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();

      ctx.fillStyle = black;
      ctx.lineWidth = 2;
      const centreRadians = radians + stepSize / 2;
      const textX = centreX + (radius - textOffset) * Math.cos(centreRadians);
      const textY = centreY + (radius - textOffset) * Math.sin(centreRadians);
      ctx.fillText(monthNames[i-1], textX, textY);

      radians += stepSize;
    }

    ctx.strokeStyle = black;
    ctx.lineWidth = 1;
    const startRadians = (Math.PI / 2);
    const dayStep = (2 * Math.PI) / days;
    for(let i=0; i<days; i+=1) {
      const radians = startRadians - (i * dayStep);
      const dayLineLen = radius / 20;
      const lineStartX = centreX + (radius - dayLineLen) * Math.cos(radians);
      const lineStartY = centreY - (radius - dayLineLen) * Math.sin(radians);
      const lineEndX = centreX + radius * Math.cos(radians);
      const lineEndY = centreY - radius * Math.sin(radians);

      ctx.beginPath();
      ctx.moveTo(lineStartX, lineStartY);
      ctx.lineTo(lineEndX, lineEndY);
      ctx.stroke();
    }

    const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    radians = startRadians - (dayOfYear * ((2 * Math.PI) / days));
    const lineEndX = centreX + radius * Math.cos(radians);
    const lineEndY = centreY - radius * Math.sin(radians);

    // ctx.fillStyle = feintGrey;
    // ctx.strokeStyle = feintGrey;
    // ctx.beginPath();
    // ctx.moveTo(centreX, centreY);
    // ctx.arc(centreX, centreY, radius, - startRadians, - startRadians + (dayOfYear * ((2 * Math.PI) / days)), false);
    // ctx.lineTo(centreX, centreY);
    // ctx.closePath();
    // ctx.stroke();
    // ctx.fill();

    ctx.lineWidth = 3;
    ctx.strokeStyle = red;
    ctx.beginPath();
    ctx.moveTo(centreX, centreY);
    ctx.lineTo(lineEndX, lineEndY);
    ctx.stroke();
  }, []);

  return (
    <canvas ref={canvas} width={width} height={height} className="Canvas">
      <p>Your browser doesn"t support canvas.</p>
    </canvas>
  );
}

export default Canvas;
