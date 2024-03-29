var userFormEl = document.querySelector('#user-form');
var cityNameInputEl = document.querySelector('#city-name');
var currentDayEl = document.querySelector('#current-forecast');
var fiveDayEl = document.querySelector('#future-forecast');
var currentCity = document.querySelector('#city-search');
var cityButtonEl = document.querySelector('.past-city-button');
var pastCity = JSON.parse(localStorage.getItem("city"))?JSON.parse(localStorage.getItem("city")):[];

//
var previousSearchEl = document.querySelector('#previous-search');

// var apiUrlLatLon = api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=3b756324be6cb542e7863f4bcffe7ce9


var formSubmitHandler = function (event) {
    event.preventDefault();
  
    var cityName = cityNameInputEl.value.trim();
    // alert(cityName);
    console.log(cityName);
    pastCity.push(cityName);
    console.log(pastCity);
    //local storage
    localStorage.setItem("city", JSON.stringify(pastCity));
  
    if (cityName) {
      getWeatherApi(cityName);
      renderLastRegistered(cityName);

  
    //  repoContainerEl.textContent = '';
    //  nameInputEl.value = '';
    } else {
      alert('Please enter a City name');
    }
  };


var getWeatherApi = function (city) {

    // var apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q={city name}&limit=5&appid=3b756324be6cb542e7863f4bcffe7ce9';
    var apiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city +'&limit=1&appid=3b756324be6cb542e7863f4bcffe7ce9';

    fetch(apiUrl)
      .then(function (response) {
        // console.log(response);
        response.json()
          .then(function (data) {
          console.log(data);
          //console.log(data.)//how to console/extract out lat, lon, name from array?
          
          getForecastApi(data); //////////////////////////////////////
        })


      });

}

var getForecastApi = function (latlon) {

  var lat = latlon[0].lat;
  var lon = latlon[0].lon;
  console.log (lat, lon)

  var apiUrlLatLon = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat +'&lon=' + lon +'&appid=3b756324be6cb542e7863f4bcffe7ce9&units=imperial';
  // var apiUrlLatLon = 'http://api.openweathermap.org/data/2.5/forecast?lat=37.3361663&lon=-121.890591&appid=3b756324be6cb542e7863f4bcffe7ce9';

    fetch(apiUrlLatLon)
      .then(function (response) {
        //
        response.json().then(function (data1) {
        //  console.log(data1); //////////////////////////////////////

          displayForecast(data1);
          displayDayForecast(data1);
        })


      })

}

var displayForecast = function (data2) {
     console.log(data2);
  var name = data2.city.name;

      // removes previous card entries 
     while(fiveDayEl.firstChild) {
      fiveDayEl.removeChild(fiveDayEl.firstChild);
     }
     

      for (var i = 0; i < data2.list.length; i+=8) {
        var temp = data2.list[i].main.temp;
        var humidity = data2.list[i].main.humidity;
        var wind = data2.list[i].wind.speed;
        var icon = data2.list[i].weather[0].icon;
        var date = data2.list[i].dt_txt;

        var card = document.createElement("div");
        card.classList="forecast-card";

        var cardTemp = document.createElement("span");
        cardTemp.textContent = "Temperature" + temp + "C ";

        var cardHumidity = document.createElement("span");
        cardHumidity.textContent = "Humidity: " + humidity + "% ";

        var cardWind = document.createElement("span");
        cardWind.textContent = "Wind Speed: " + wind + "mph ";

        var cardIcon = document.createElement("img");
        cardIcon.setAttribute("src", 'https://openweathermap.org/img/w/' + icon +'.png');

        var cardDate = document.createElement("span");
        cardDate.textContent = date;

        fiveDayEl.appendChild(card);
        // console.log(temp);

        card.appendChild(cardDate);
        card.appendChild(cardIcon);
        card.appendChild(cardTemp);
        card.appendChild(cardHumidity);
        card.appendChild(cardWind);
       
      }

}

var displayDayForecast = function (data3) {
  console.log(data3.city.name);
  currentCity.textContent = data3.city.name;
  
   // removes previous card entries 
  while(currentDayEl.firstChild) {
    currentDayEl.removeChild(currentDayEl.firstChild);
   }


  var tempD = data3.list[0].main.temp;
  var humidityD = data3.list[0].main.humidity;
  var windD = data3.list[0].wind.speed;
  var iconD = data3.list[0].weather[0].icon;
  var dateD = data3.list[0].dt_txt;

  var cardD = document.createElement("div");
  cardD.classList="forecast-card";

  var cardTempD = document.createElement("span");
  cardTempD.textContent = "Temperature: " + tempD + "C   ";

  var cardHumidityD = document.createElement("span");
  cardHumidityD.textContent = "Humidity: " + humidityD + "%   ";

  var cardWindD = document.createElement("span");
  cardWindD.textContent = "Wind Speed: " + windD + "mph   ";

  var cardIconD = document.createElement("img");
  cardIconD.setAttribute("src", 'https://openweathermap.org/img/w/' + iconD +'.png');

  var cardDateD = document.createElement("span");
  cardDateD.textContent = dateD;

  currentDayEl.appendChild(cardD);

  cardD.appendChild(cardDateD);
  cardD.appendChild(cardIconD);
  cardD.appendChild(cardTempD);
  cardD.appendChild(cardHumidityD);
  cardD.appendChild(cardWindD);
  
}

var renderLastRegistered = function(last) {
  
  // var cityLast = JSON.parse(localStorage.getItem("city"));
  // console.log(cityLast);

  // for (var i = 0; i < cityLast.length; i++) {
    
  //   // var previousCity = cityLast[i]; // not needed


  // }
  var cityButton = document.createElement("button");
  console.log("test");
  previousSearchEl.appendChild(cityButton);
  cityButton.textContent = last;
  
  cityButton.setAttribute("class", "past-city-button");
  
  console.log(cityButtonEl);

  //console.log(cityButtonEl);

}



userFormEl.addEventListener('submit', formSubmitHandler);

previousSearchEl.addEventListener('click', function(event){
  event.preventDefault();
  console.log(event.target);
  console.log(event.target.innerHTML);
  getWeatherApi(event.target.innerHTML);
});