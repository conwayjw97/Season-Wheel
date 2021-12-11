export function getWeather(){
  const apiKey = process.env.WEATHER_API_KEY;

  fetch('https://api.openweathermap.org/data/2.5/weather?id=' + 6167865 + '&appid=' + apiKey)
  .then(function(resp) { return resp.json() }) // Convert data to json
  .then(function(data) {
    console.log(data);
  })
  .catch(function() {
    // catch any errors
  });
}
