import React, { useEffect, useRef } from "react";

import * as Quadrant from "./utils/quadrantHelpers.js";
import * as Text from "./utils/textHelpers.js";
import * as Colour from "./utils/colourHelpers.js";
import * as DateTime from "./utils/datetimeHelpers.js";

import "./Canvas.css";

function Canvas(props) {
  const canvas = useRef(null);
  const width = window.innerWidth;
  const height = window.innerHeight;
  const centreX = width/2;
  const centreY = height/2;
  const radius = Math.floor(height/3);
  const startRadians = (Math.PI / 2);
  const date = new Date();
  const days = DateTime.isLeapYear(date.getFullYear()) ? 366 : 365;

  function drawDate(ctx){
    ctx.font = "60px Consolas";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillStyle = Colour.white;
    ctx.fillText(props.date.day + "/" + props.date.month + "/" + date.getFullYear(), centreX, centreY - radius - 70);
  }

  function drawBaseCircle(ctx){
    ctx.fillStyle = Colour.white;
    ctx.beginPath();
    ctx.arc(centreX, centreY, radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
  }

  function drawMonthSections(ctx){
    let radians = - Math.PI / 2;
    ctx.font = "20px Consolas";
    ctx.strokeStyle = Colour.black;
    const textOffset = radius / 3;
    for(let i=1; i<13; i+=1) {
      const daysInMonth = new Date(date.getFullYear(), i, 0).getDate();
      const stepSize = ((2 * Math.PI) / days) * daysInMonth;

      ctx.fillStyle = Colour.monthColours[i-1];

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

      ctx.fillStyle = Colour.black;
      ctx.lineWidth = 2;
      const centreRadians = radians + stepSize / 2;
      const textX = centreX + (radius - textOffset) * Math.cos(centreRadians);
      const textY = centreY + (radius - textOffset) * Math.sin(centreRadians);
      ctx.fillText(DateTime.monthNames[i-1], textX, textY);

      radians += stepSize;
    }
  }

  function drawDayLines(ctx){
    ctx.strokeStyle = Colour.black;
    ctx.lineWidth = 1;
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
  }

  function drawDateLine(ctx){
    const piStep = Math.PI / (100 * ctx.globalAlpha);
    date.setDate(props.date.day);
    date.setMonth(props.date.month-1);

    const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const relativeDayOfYear = Math.ceil((dayOfYear / 100) * (ctx.globalAlpha * 100));
    const dateRadians = startRadians - ((relativeDayOfYear) * ((2 * Math.PI) / days));
    const lineEndX = centreX + radius * Math.cos(dateRadians);
    const lineEndY = centreY - radius * Math.sin(dateRadians);

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
    ctx.strokeStyle = Colour.white;
    ctx.beginPath();
    ctx.moveTo(centreX, centreY);
    ctx.lineTo(lineEndX, lineEndY);
    ctx.stroke();

    Text.textAlignOutwards(ctx, dateRadians);
    ctx.font = "30px Consolas";
    ctx.fillStyle = Colour.white;
    const yearPercentage = Math.round(((100 / days) * relativeDayOfYear) * 100) / 100;
    ctx.fillText(yearPercentage + "%", lineEndX, lineEndY);
  }

  async function fadeIn(ctx){
    const timer = ms => new Promise(res => setTimeout(res, ms));
    let alpha = 0.0;
    let delta = 0.01;

    while(alpha < 1.0){
      ctx.globalAlpha = alpha;
      resetCanvas(ctx);
      alpha += delta;
      alpha = Math.round(alpha * 1000) / 1000;
      await timer(10);
    }
    ctx.globalAlpha = 1.0;
    resetCanvas(ctx);
  }

  function resetCanvas(ctx){
    ctx.clearRect(0, 0, width, height);
    drawDate(ctx);
    drawMonthSections(ctx);
    drawDayLines(ctx);
    drawDateLine(ctx);
  }

  useEffect(() => {
    const ctx = canvas.current.getContext("2d");
    ctx.globalAlpha = 0;
    fadeIn(ctx);
  }, [props.updateCount]);

  return (
    <canvas ref={canvas} width={width} height={height} className="Canvas">
      <p>Your browser doesn"t support canvas.</p>
    </canvas>
  );
}

export default Canvas;
