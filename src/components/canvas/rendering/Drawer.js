import * as Colour from "../utils/colourHelpers.js";
import * as DateTime from "../utils/datetimeHelpers.js";
import * as Text from "../utils/textHelpers.js";

export default class Draw {
  constructor(ctx) {
    this.ctx = ctx;
    this.centreX = window.innerWidth/2;
    this.centreY = window.innerHeight/2;
    this.radius = Math.floor(window.innerHeight/3);
    this.startRadians = (Math.PI / 2);
  }

  clear(){
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }

  drawDate(date){
    let dateString = date.day + "/" + date.month + "/" + date.year;
    if(date.compDisabled != true)
      dateString += " - " + date.compDay + "/" + date.compMonth + "/" + date.year;

    Text.textAlignCentered(this.ctx);
    this.ctx.font = "60px Consolas";
    this.ctx.fillStyle = Colour.white;
    this.ctx.fillText(dateString, this.centreX, this.centreY - this.radius - 70);
  }

  drawBaseCircle(){
    this.ctx.fillStyle = Colour.white;
    this.ctx.beginPath();
    this.ctx.arc(this.centreX, this.centreY, this.radius, 0, 2 * Math.PI);
    this.ctx.closePath();
    this.ctx.fill();
  }

  drawSeasonSections(date){
    const equinoxSolsticeDates = DateTime.getEquinoxSolsticeDates(date.year);
    const daysInYear = DateTime.getDaysInYear(date.year);
    let startRadians = undefined;

    for(let i=0; i<equinoxSolsticeDates.length; i+=1) {
      const date = equinoxSolsticeDates[i];
      const dayOfYear = DateTime.getDayOfYear(date.getDate(), date.getMonth()+1, date.getFullYear());
      const dateRadians = this.startRadians - ((dayOfYear) * ((2 * Math.PI) / daysInYear));

      if(startRadians == undefined){
        startRadians = dateRadians;
      }

      let nextDateRadians = startRadians;
      if(equinoxSolsticeDates[i+1] != undefined){
        const nextDate = equinoxSolsticeDates[i+1];
        const nextDateDayOfYear = DateTime.getDayOfYear(nextDate.getDate(), nextDate.getMonth()+1, nextDate.getFullYear());
        nextDateRadians = this.startRadians - ((nextDateDayOfYear) * ((2 * Math.PI) / daysInYear));
      }

      this.ctx.fillStyle = Colour.seasonColours[i];
      this.ctx.beginPath();
      this.ctx.moveTo(this.centreX, this.centreY);
      this.ctx.arc(this.centreX, this.centreY, this.radius, dateRadians, nextDateRadians, false);
      this.ctx.lineTo(this.centreX, this.centreY);
      this.ctx.closePath();
      this.ctx.fill();
    }

    // DateTime.getEquinoxSolsticeDates(date.year).then((equinoxSolsticeDates) => {
    //   const daysInYear = DateTime.getDaysInYear(date.year);
    //   let startRadians = undefined;
    //
    //   for(let i=0; i<equinoxSolsticeDates.length; i+=1) {
    //     const date = equinoxSolsticeDates[i];
    //     const dayOfYear = DateTime.getDayOfYear(date.getDate(), date.getMonth()+1, date.getFullYear());
    //     const dateRadians = this.startRadians - ((dayOfYear) * ((2 * Math.PI) / daysInYear));
    //
    //     if(startRadians == undefined){
    //       startRadians = dateRadians;
    //     }
    //
    //     let nextDateRadians = startRadians;
    //     if(equinoxSolsticeDates[i+1] != undefined){
    //       const nextDate = equinoxSolsticeDates[i+1];
    //       const nextDateDayOfYear = DateTime.getDayOfYear(nextDate.getDate(), nextDate.getMonth()+1, nextDate.getFullYear());
    //       nextDateRadians = this.startRadians - ((nextDateDayOfYear) * ((2 * Math.PI) / daysInYear));
    //     }
    //
    //     this.ctx.fillStyle = Colour.seasonColours[i];
    //     this.ctx.beginPath();
    //     this.ctx.moveTo(this.centreX, this.centreY);
    //     this.ctx.arc(this.centreX, this.centreY, this.radius, dateRadians, nextDateRadians, false);
    //     this.ctx.lineTo(this.centreX, this.centreY);
    //     this.ctx.closePath();
    //     this.ctx.fill();
    //   }
    // });
  }

  drawMonthSections(date){
    let radians = - Math.PI / 2;
    this.ctx.font = "20px Consolas";
    this.ctx.strokeStyle = Colour.black;
    const textOffset = this.radius / 3;
    for(let i=1; i<13; i+=1) {
      const daysInMonth = new Date(date.year, i, 0).getDate();
      const stepSize = ((2 * Math.PI) / DateTime.getDaysInYear(date.year)) * daysInMonth;

      // this.ctx.fillStyle = Colour.monthColours[i-1];
      // this.ctx.fillStyle = Colour.white;
      this.ctx.lineWidth = 3;

      this.ctx.beginPath();
      this.ctx.moveTo(this.centreX, this.centreY);
      this.ctx.arc(this.centreX, this.centreY, this.radius, radians, radians + stepSize, false);
      this.ctx.lineTo(this.centreX, this.centreY);
      this.ctx.closePath();
      this.ctx.stroke();
      // this.ctx.fill();

      this.ctx.fillStyle = Colour.black;

      const centreRadians = radians + stepSize / 2;
      const textX = this.centreX + (this.radius - textOffset) * Math.cos(centreRadians);
      const textY = this.centreY + (this.radius - textOffset) * Math.sin(centreRadians);
      this.ctx.fillText(DateTime.monthNames[i-1], textX, textY);

      radians += stepSize;
    }
  }

  drawDayLines(date){
    this.ctx.strokeStyle = Colour.black;
    this.ctx.lineWidth = 1;

    const daysInYear = DateTime.getDaysInYear(date.year);
    const dayStep = (2 * Math.PI) / daysInYear;
    for(let i=0; i<daysInYear; i+=1) {
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

  drawDateLine(date){
    const daysInYear = DateTime.getDaysInYear(date.year);
    const dayOfYear = DateTime.getDayOfYear(date.day, date.month, date.year);
    const relativeDayOfYear = Math.ceil((dayOfYear / 100) * (this.ctx.globalAlpha * 100));
    const dateRadians = this.startRadians - ((relativeDayOfYear) * ((2 * Math.PI) / daysInYear));
    const lineEndX = this.centreX + this.radius * Math.cos(dateRadians);
    const lineEndY = this.centreY - this.radius * Math.sin(dateRadians);

    this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = Colour.white;
    this.ctx.beginPath();
    this.ctx.moveTo(this.centreX, this.centreY);
    this.ctx.lineTo(lineEndX, lineEndY);
    this.ctx.stroke();

    Text.textAlignOutwards(this.ctx, dateRadians);
    this.ctx.font = "30px Consolas";
    this.ctx.fillStyle = Colour.white;
    const yearPercentage = Math.round(((100 / daysInYear) * relativeDayOfYear) * 100) / 100;
    this.ctx.fillText(yearPercentage + "%", lineEndX, lineEndY);

    if(date.compDisabled != true){
      const compDayOfYear = DateTime.getDayOfYear(date.compDay, date.compMonth, date.year);
      const relativeCompDayOfYear = Math.ceil((compDayOfYear / 100) * (this.ctx.globalAlpha * 100));
      const compDateRadians = this.startRadians - ((relativeCompDayOfYear) * ((2 * Math.PI) / daysInYear));
      const lineEndX = this.centreX + this.radius * Math.cos(compDateRadians);
      const lineEndY = this.centreY - this.radius * Math.sin(compDateRadians);

      this.ctx.beginPath();
      this.ctx.moveTo(this.centreX, this.centreY);
      this.ctx.lineTo(lineEndX, lineEndY);
      this.ctx.stroke();

      Text.textAlignOutwards(this.ctx, compDateRadians);
      const compYearPercentage = Math.round(((100 / daysInYear) * relativeCompDayOfYear) * 100) / 100;
      this.ctx.fillText(compYearPercentage + "%", lineEndX, lineEndY);

      this.ctx.fillStyle = Colour.transparentBlack;
      this.ctx.strokeStyle = Colour.white;
      this.ctx.beginPath();
      this.ctx.moveTo(this.centreX, this.centreY);
      this.ctx.arc(this.centreX, this.centreY, this.radius, - dateRadians, - compDateRadians, false);
      this.ctx.lineTo(this.centreX, this.centreY);
      this.ctx.closePath();
      this.ctx.stroke();
      this.ctx.fill();

      Text.textAlignCentered(this.ctx);
      this.ctx.font = "30px Consolas";
      this.ctx.fillStyle = Colour.white;
      const textOffset = this.radius / 3;
      const centreRadians = dateRadians + (compDateRadians - dateRadians) / 2;
      const textX = this.centreX + (this.radius - textOffset) * Math.cos(centreRadians);
      const textY = this.centreY - (this.radius - textOffset) * Math.sin(centreRadians);
      this.ctx.fillText(Math.round((compYearPercentage - yearPercentage) * 10) / 10 + "%", textX, textY);
    }
  }

  drawComparisonAnalysis(date){
    if(date.compDisabled != true){
      const dayOfYear = DateTime.getDayOfYear(date.day, date.month, date.year);
      const relativeDayOfYear = Math.ceil((dayOfYear / 100) * (this.ctx.globalAlpha * 100));
      const compDayOfYear = DateTime.getDayOfYear(date.compDay, date.compMonth, date.year);
      const relativeCompDayOfYear = Math.ceil((compDayOfYear / 100) * (this.ctx.globalAlpha * 100));
      const totalDays = relativeCompDayOfYear - relativeDayOfYear + " Days";
      const totalWeeks = Math.round((relativeCompDayOfYear - relativeDayOfYear)/7 * 10) / 10 + " Weeks";
      const totalMonths = Math.round((relativeCompDayOfYear - relativeDayOfYear)/30* 100) / 100 + " Months";

      Text.textAlignCentered(this.ctx);
      this.ctx.font = "30px Consolas";
      this.ctx.fillStyle = Colour.white;
      this.ctx.fillText(totalDays,this.centreX, this.centreY + this.radius + 50);
      this.ctx.fillText(totalWeeks, this.centreX, this.centreY + this.radius + 50 + 40);
      this.ctx.fillText(totalMonths, this.centreX, this.centreY + this.radius + 50 + 80);
    }
  }
}

// Old code to draw gradients between month arcs
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

// Can't remember what this was for
// const piStep = Math.PI / (100 * this.ctx.globalAlpha);
