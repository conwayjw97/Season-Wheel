import * as Colour from "../utils/colourHelpers.js";
import * as DateTime from "../utils/datetimeHelpers.js";
import * as Text from "../utils/textHelpers.js";
import * as Weather from "../utils/weatherHelpers.js";

export default class Draw {
  constructor(ctx) {
    Weather.getWeather();

    this.ctx = ctx;

    this.date = new Date();
    this.days = DateTime.isLeapYear(this.date.getFullYear()) ? 366 : 365;

    this.centreX = window.innerWidth/2;
    this.centreY = window.innerHeight/2;
    this.radius = Math.floor(window.innerHeight/3);
    this.startRadians = (Math.PI / 2);
  }

  clear(){
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }

  drawDate(day, month){
    this.ctx.font = "60px Consolas";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = Colour.white;
    this.ctx.fillText(day + "/" + month + "/" + this.date.getFullYear(), this.centreX, this.centreY - this.radius - 70);
  }

  drawBaseCircle(){
    this.ctx.fillStyle = Colour.white;
    this.ctx.beginPath();
    this.ctx.arc(this.centreX, this.centreY, this.radius, 0, 2 * Math.PI);
    this.ctx.closePath();
    this.ctx.fill();
  }

  drawMonthSections(){
    let radians = - Math.PI / 2;
    this.ctx.font = "20px Consolas";
    this.ctx.strokeStyle = Colour.black;
    const textOffset = this.radius / 3;
    for(let i=1; i<13; i+=1) {
      const daysInMonth = new Date(this.date.getFullYear(), i, 0).getDate();
      const stepSize = ((2 * Math.PI) / this.days) * daysInMonth;

      this.ctx.fillStyle = Colour.monthColours[i-1];
      this.ctx.lineWidth = 3;

      // const arcStartX = this.centreX + this.radius/2 * Math.cos(radians);
      // const arcStartY = this.centreY + this.radius/2 * Math.sin(radians);
      // const arcEndX = this.centreX + this.radius/2 * Math.cos(radians + stepSize);
      // const arcEndY = this.centreY + this.radius/2 * Math.sin(radians + stepSize);
      // const gradient = this.ctx.createLinearGradient(arcStartX, arcStartY, arcEndX, arcEndY);
      // console.log(i-1);
      // console.log(monthColours[i-2] + " : " + monthColours[i-1] + " : " + monthColours[i]);
      // if (monthColours[i] !== undefined && monthColours[i-1] !== monthColours[i]) {
      //   gradient.addColorStop(0, monthColours[i-1]);
      //   gradient.addColorStop(0.75, monthColours[i-1]);
      //   gradient.addColorStop(1, transparent);
      //   this.ctx.fillStyle = gradient;
      // }
      // else if(monthColours[i-2] !== undefined && monthColours[i-2] !== monthColours[i-1]){
      //   gradient.addColorStop(0, transparent);
      //   gradient.addColorStop(0.75, monthColours[i-1]);
      //   gradient.addColorStop(1, monthColours[i-1]);
      //   this.ctx.fillStyle = gradient;
      // }

      this.ctx.beginPath();
      this.ctx.moveTo(this.centreX, this.centreY);
      this.ctx.arc(this.centreX, this.centreY, this.radius, radians, radians + stepSize, false);
      this.ctx.lineTo(this.centreX, this.centreY);
      this.ctx.closePath();
      this.ctx.stroke();
      this.ctx.fill();

      this.ctx.fillStyle = Colour.black;

      const centreRadians = radians + stepSize / 2;
      const textX = this.centreX + (this.radius - textOffset) * Math.cos(centreRadians);
      const textY = this.centreY + (this.radius - textOffset) * Math.sin(centreRadians);
      this.ctx.fillText(DateTime.monthNames[i-1], textX, textY);

      radians += stepSize;
    }
  }

  drawDayLines(){
    this.ctx.strokeStyle = Colour.black;
    this.ctx.lineWidth = 1;
    const dayStep = (2 * Math.PI) / this.days;
    for(let i=0; i<this.days; i+=1) {
      const radians = this.startRadians - (i * dayStep);
      const dayLineLen = this.radius / 20;
      const lineStartX = this.centreX + (this.radius - dayLineLen) * Math.cos(radians);
      const lineStartY = this.centreY - (this.radius - dayLineLen) * Math.sin(radians);
      const lineEndX = this.centreX + this.radius * Math.cos(radians);
      const lineEndY = this.centreY - this.radius * Math.sin(radians);

      this.ctx.beginPath();
      this.ctx.moveTo(lineStartX, lineStartY);
      this.ctx.lineTo(lineEndX, lineEndY);
      this.ctx.stroke();
    }
  }

  drawDateLine(day, month){
    // const piStep = Math.PI / (100 * this.ctx.globalAlpha);

    this.date.setDate(day);
    this.date.setMonth(month-1);

    const dayOfYear = Math.floor((this.date - new Date(this.date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const relativeDayOfYear = Math.ceil((dayOfYear / 100) * (this.ctx.globalAlpha * 100));
    const dateRadians = this.startRadians - ((relativeDayOfYear) * ((2 * Math.PI) / this.days));
    const lineEndX = this.centreX + this.radius * Math.cos(dateRadians);
    const lineEndY = this.centreY - this.radius * Math.sin(dateRadians);

    // this.ctx.fillStyle = feintGrey;
    // this.ctx.strokeStyle = feintGrey;
    // this.ctx.beginPath();
    // this.ctx.moveTo(this.centreX, this.centreY);
    // this.ctx.arc(this.centreX, this.centreY, this.radius, - this.startRadians, - this.startRadians + (dayOfYear * ((2 * Math.PI) / days)), false);
    // this.ctx.lineTo(this.centreX, this.centreY);
    // this.ctx.closePath();
    // this.ctx.stroke();
    // this.ctx.fill();

    this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = Colour.white;
    this.ctx.beginPath();
    this.ctx.moveTo(this.centreX, this.centreY);
    this.ctx.lineTo(lineEndX, lineEndY);
    this.ctx.stroke();

    Text.textAlignOutwards(this.ctx, dateRadians);
    this.ctx.font = "30px Consolas";
    this.ctx.fillStyle = Colour.white;
    const yearPercentage = Math.round(((100 / this.days) * relativeDayOfYear) * 100) / 100;
    this.ctx.fillText(yearPercentage + "%", lineEndX, lineEndY);
  }
}
