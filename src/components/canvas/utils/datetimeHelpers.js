export const monthNames = [
  "January", "February", "March", "April", "May", "June", "July", "August",
  "September", "October", "November", "December"
];

export function isLeapYear(year){
  return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
}

export function getDaysInYear(year){
  return isLeapYear(year) ? 366 : 365;
}

export function getDayOfYear(day, month, year){
  return Math.floor((new Date(year, month-1, day) - new Date(year, 0, 0)) / 1000 / 60 / 60 / 24);
}

export function getEquinoxSolsticeDates(year){
  const eqsol = window.eqsol(year);
  const marchEquinox = window.jd_data(eqsol[0]);
  const juneSolstice = window.jd_data(eqsol[1]);
  const septemberEquinox = window.jd_data(eqsol[2]);
  const decemberSolstice = window.jd_data(eqsol[3]);

  return [
    new Date(year, marchEquinox[1]-1, Math.floor(marchEquinox[0])),
    new Date(year, juneSolstice[1]-1, Math.floor(juneSolstice[0])),
    new Date(year, septemberEquinox[1]-1, Math.floor(septemberEquinox[0])),
    new Date(year, decemberSolstice[1]-1, Math.floor(decemberSolstice[0]))
  ];
}
