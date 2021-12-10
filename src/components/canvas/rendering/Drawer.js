import * as Colour from "../utils/colourHelpers.js";
import * as DateTime from "../utils/datetimeHelpers.js";
import * as Text from "../utils/textHelpers.js";

export default class Draw {
  constructor() {
    this.date = new Date();
    this.days = DateTime.isLeapYear(this.date.getFullYear()) ? 366 : 365;

    this.centreX = window.innerWidth/2;
    this.centreY = window.innerHeight/2;
    this.radius = Math.floor(window.innerHeight/3);
    this.startRadians = (Math.PI / 2);
  }

  drawDate(ctx, day, month){
    ctx.font = "60px Consolas";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillStyle = Colour.white;
    ctx.fillText(day + "/" + month + "/" + this.date.getFullYear(), this.centreX, this.centreY - this.radius - 70);
  }

  drawBaseCircle(ctx){
    ctx.fillStyle = Colour.white;
    ctx.beginPath();
    ctx.arc(this.centreX, this.centreY, this.radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
  }

  drawMonthSections(ctx){
    let radians = - Math.PI / 2;
    ctx.font = "20px Consolas";
    ctx.strokeStyle = Colour.black;
    const textOffset = this.radius / 3;
    for(let i=1; i<13; i+=1) {
      const daysInMonth = new Date(this.date.getFullYear(), i, 0).getDate();
      const stepSize = ((2 * Math.PI) / this.days) * daysInMonth;

      ctx.fillStyle = Colour.monthColours[i-1];

      // const arcStartX = this.centreX + this.radius/2 * Math.cos(radians);
      // const arcStartY = this.centreY + this.radius/2 * Math.sin(radians);
      // const arcEndX = this.centreX + this.radius/2 * Math.cos(radians + stepSize);
      // const arcEndY = this.centreY + this.radius/2 * Math.sin(radians + stepSize);
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
      ctx.moveTo(this.centreX, this.centreY);
      ctx.arc(this.centreX, this.centreY, this.radius, radians, radians + stepSize, false);
      ctx.lineTo(this.centreX, this.centreY);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();

      ctx.fillStyle = Colour.black;
      ctx.lineWidth = 2;
      const centreRadians = radians + stepSize / 2;
      const textX = this.centreX + (this.radius - textOffset) * Math.cos(centreRadians);
      const textY = this.centreY + (this.radius - textOffset) * Math.sin(centreRadians);
      ctx.fillText(DateTime.monthNames[i-1], textX, textY);

      radians += stepSize;
    }
  }

  drawDayLines(ctx){
    ctx.strokeStyle = Colour.black;
    ctx.lineWidth = 1;
    const dayStep = (2 * Math.PI) / this.days;
    for(let i=0; i<this.days; i+=1) {
      const radians = this.startRadians - (i * dayStep);
      const dayLineLen = this.radius / 20;
      const lineStartX = this.centreX + (this.radius - dayLineLen) * Math.cos(radians);
      const lineStartY = this.centreY - (this.radius - dayLineLen) * Math.sin(radians);
      const lineEndX = this.centreX + this.radius * Math.cos(radians);
      const lineEndY = this.centreY - this.radius * Math.sin(radians);

      ctx.beginPath();
      ctx.moveTo(lineStartX, lineStartY);
      ctx.lineTo(lineEndX, lineEndY);
      ctx.stroke();
    }
  }

  drawDateLine(ctx, day, month){
    // const piStep = Math.PI / (100 * ctx.globalAlpha);

    this.date.setDate(day);
    this.date.setMonth(month-1);

    const dayOfYear = Math.floor((this.date - new Date(this.date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const relativeDayOfYear = Math.ceil((dayOfYear / 100) * (ctx.globalAlpha * 100));
    const dateRadians = this.startRadians - ((relativeDayOfYear) * ((2 * Math.PI) / this.days));
    const lineEndX = this.centreX + this.radius * Math.cos(dateRadians);
    const lineEndY = this.centreY - this.radius * Math.sin(dateRadians);

    // ctx.fillStyle = feintGrey;
    // ctx.strokeStyle = feintGrey;
    // ctx.beginPath();
    // ctx.moveTo(this.centreX, this.centreY);
    // ctx.arc(this.centreX, this.centreY, this.radius, - this.startRadians, - this.startRadians + (dayOfYear * ((2 * Math.PI) / days)), false);
    // ctx.lineTo(this.centreX, this.centreY);
    // ctx.closePath();
    // ctx.stroke();
    // ctx.fill();

    ctx.lineWidth = 3;
    ctx.strokeStyle = Colour.white;
    ctx.beginPath();
    ctx.moveTo(this.centreX, this.centreY);
    ctx.lineTo(lineEndX, lineEndY);
    ctx.stroke();

    Text.textAlignOutwards(ctx, dateRadians);
    ctx.font = "30px Consolas";
    ctx.fillStyle = Colour.white;
    const yearPercentage = Math.round(((100 / this.days) * relativeDayOfYear) * 100) / 100;
    ctx.fillText(yearPercentage + "%", lineEndX, lineEndY);
  }
}
