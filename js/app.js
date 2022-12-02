$(document).foundation();


var cityInputEl = document.querySelector("#search");
var inputButton = document.querySelector("#submission");
var fiveDay = document.querySelector("#results");



var inputSubmitHandler = function (event) {
  event.preventDefault();

  var cityName = cityInputEl.value.trim();
  console.log(cityName);
  if (cityName) {
    getCords(cityName);
  } else {
    alert("Please enter a city");
  }

  localStorage.setItem("city", cityName);
  currentForecast.textContent = "";
  displaySearched(cityName);
};

var getCords = function (cityName) {
  var apiUrl =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    cityName +
    "&limit=5&appid=5eadcacf0e30dbacf32a851c3ca447bb";

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        var citLat = data[0].lat;
        var citLon = data[0].lon;
        console.log(citLat);
        console.log(citLon);

        getForecast(citLat, citLon);
      });
    }
  });
};

var getForecast = function (lat, lon) {
  var apiTwoUrl =
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=imperial&appid=5eadcacf0e30dbacf32a851c3ca447bb";

  fetch(apiTwoUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        currentForecast.textContent = "";
        var cityName = data.city.name;
        var cityDate = data.list[3].dt_txt;
        var weatherIcon = data.list[3].weather[0].icon;
        var humidity = data.list[3].main.humidity;
        var temp = data.list[3].main.temp;
        var windSpeed = data.list[3].wind.speed;

        for (var i = 0; i <5; i ++) {

          let result = document.createElement('section')

          var resultsEl = document.getElementById('results');
          var oneDay = data.list[i];
          console.log(oneDay);
          var cityEl = document.querySelector('.cityEl');
          var dateEl = document.querySelector('.dateEl');
          var weatherIconEl = document.querySelector('.weatherIconEl');
          var humidityEl = document.querySelector('.humidityEl');
          var tempEl = document.querySelector('tempEl');
          var windSpeedEl = document.querySelector('.windSpeedEl');
          
          resultsEl.children[i].appendChild
          
          dayNum++;
        }
      });
    }
  });
};

inputButton.addEventListener("click", inputSubmitHandler);

/* need to loop throug 5 times and create a new section each time.
that section needs the .card class. and id set to day + dayNum

then, we need to append the city, date, weather icon, humidity, temp, windSpeed
to the new card. easiest would be to just center/vertical but if I had time to make it nice I'd 
organize and arrange them.

