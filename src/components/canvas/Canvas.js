import React, { useEffect, useRef } from "react";

import Drawer from "./rendering/Drawer.js";

import "./Canvas.css";

function Canvas(props) {
  const canvas = useRef(null);
  const width = window.innerWidth;
  const height = window.innerHeight;

  async function fadeIn(ctx, drawer){
    const timer = ms => new Promise(res => setTimeout(res, ms));
    let alpha = 0.0;
    let delta = 0.01;

    while(alpha <= 1.0){
      ctx.globalAlpha = alpha;
      resetCanvas(ctx, drawer);
      alpha += delta;
      alpha = Math.round(alpha * 1000) / 1000;
      await timer(10);
    }
    resetCanvas(ctx, drawer);
  }

  function resetCanvas(ctx, drawer){
    drawer.clear();
    drawer.drawDate(props.date);
    drawer.drawSeasonSections(props.date);
    drawer.drawMonthSections(props.date);
    drawer.drawDayLines(props.date);
    drawer.drawDateLine(props.date);
    drawer.drawComparisonAnalysis(props.date);
  }

  useEffect(() => {
    if(props.scriptsLoaded == true){
      const ctx = canvas.current.getContext("2d");
      const drawer = new Drawer(ctx);
      ctx.globalAlpha = 0;
      fadeIn(ctx, drawer);
    }
  }, [props.scriptsLoaded, props.updateCount]);

  return (
    <canvas ref={canvas} width={width} height={height} className="Canvas">
      <p>Your browser doesn"t support canvas.</p>
    </canvas>
  );
}

export default Canvas;
