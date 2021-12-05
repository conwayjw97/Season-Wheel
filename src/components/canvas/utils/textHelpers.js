import * as Quadrant from "./quadrantHelpers.js";

export function textAlignOutwards(ctx, radians){
  if(Quadrant.isInRightQuadrants(radians)){
    ctx.textAlign = "start";
  }
  if(Quadrant.isInLeftQuadrants(radians)){
    ctx.textAlign = "end";
  }
  if(Quadrant.isInTopQuadrants(radians)){
    ctx.textBaseline = "bottom";
  }
  if(Quadrant.isInBottomQuadrants(radians)){
    ctx.textBaseline = "top";
  }
}

export function textAlignInwards(ctx, radians){
  if(Quadrant.isInRightQuadrants(radians)){
    ctx.textAlign = "end";
  }
  if(Quadrant.isInLeftQuadrants(radians)){
    ctx.textAlign = "start";
  }
  if(Quadrant.isInTopQuadrants(radians)){
    ctx.textBaseline = "top";
  }
  if(Quadrant.isInBottomQuadrants(radians)){
    ctx.textBaseline = "bottom";
  }
}

export function textAlignTopBottomInwards(ctx, radians){
  ctx.textAlign = "center";
  if(Quadrant.isInTopQuadrants(radians)){
    ctx.textBaseline = "top";
  }
  if(Quadrant.isInBottomQuadrants(radians)){
    ctx.textBaseline = "bottom";
  }
}

export function textAlignRightLeftInwards(ctx, radians){
  ctx.textBaseline = "middle";
  if(Quadrant.isInRightQuadrants(radians)){
    ctx.textAlign = "end";
  }
  if(Quadrant.isInLeftQuadrants(radians)){
    ctx.textAlign = "start";
  }
}
