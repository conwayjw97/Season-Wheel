export function isInFirstQuadrant(radians){
  return radians <= (Math.PI / 2) && radians >= 0;
}

export function isInSecondQuadrant(radians){
  return radians < 0 && radians >= -(Math.PI / 2);
}

export function isInThirdQuadrant(radians){
  return radians < -(Math.PI / 2) && radians >= -Math.PI;
}

export function isInFourthQuadrant(radians){
  return radians < -Math.PI && radians >= -(3*Math.PI)/2;
}

export function isInTopQuadrants(radians){
  return isInFirstQuadrant(radians) || isInFourthQuadrant(radians);
}

export function isInBottomQuadrants(radians){
  return isInSecondQuadrant(radians) || isInThirdQuadrant(radians);
}

export function isInRightQuadrants(radians){
  return isInFirstQuadrant(radians) || isInSecondQuadrant(radians);
}

export function isInLeftQuadrants(radians){
  return isInThirdQuadrant(radians) || isInFourthQuadrant(radians);
}
