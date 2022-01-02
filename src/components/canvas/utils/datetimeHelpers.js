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
