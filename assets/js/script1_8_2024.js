var form = document.getElementById('location-form');
var input = document.getElementById('location-input');
// var input = $('#location-input');
var weatherInfo = document.getElementById('weather-info');
var searchButton = document.getElementById('search-button');

// alert(input);
// console.log(input);

function getWeather(){
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}';

    fetch(requestUrl)
       .then(function (response) {
          return response.json();
       })
       .then(function (data) {
          // console.log(data)
       })


}
