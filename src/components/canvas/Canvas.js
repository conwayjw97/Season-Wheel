import React, { useEffect, useRef } from "react";

import Drawer from "./rendering/Drawer.js";

import "./Canvas.css";

function Canvas(props) {
  const canvas = useRef(null);
  const width = window.innerWidth;
  const height = window.innerHeight;

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
    const drawer = new Drawer();
    drawer.drawDate(ctx, props.date.day, props.date.month);
    drawer.drawMonthSections(ctx);
    drawer.drawDayLines(ctx);
    drawer.drawDateLine(ctx);
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
