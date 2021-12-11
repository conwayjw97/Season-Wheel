export function getWeather(){
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  fetch('http://history.openweathermap.org/data/2.5/history/city?q=Glasgow,GB&type=hour&appid=' + apiKey)
  .then(function(resp) { return resp.json() }) // Convert data to json
  .then(function(data) {
    console.log(data);
  })
  .catch(function() {
    // catch any errors
  });
}
