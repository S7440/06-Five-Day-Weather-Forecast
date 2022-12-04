$(document).foundation();
//this will gather the  city searched for.
var cityInputEl = document.querySelector('#search');
var citySubmission = document.querySelector('#submission');

//this card will display the current conditions.
var currentConditionsCard = document.querySelector('#current-card');

var currentHeaderEl = document.querySelector('#current-Header');
  var currentTempEl = document.querySelector('#current-temp');
  var currentHumidityEl = document.querySelector('#current-humidity');
  var currentWindSpeedEl = document.querySelector('#current-wind-speed');
var currentIconEl = document.querySelector('#current-icon');

function displayResults() {
//projected card variables that will run 5 cycles and print off 5 data sets.
var resultsEl = document.querySelector('#results');
var projectedCard = document.createElement('section');
  var projectedContainerEl = document.createElement('div');
    var projectedDateEl = document.createElement('span');
    var projectedIconEl = document.createElement('span');
  var projectedConditionsEl = document.createElement('div');
    var projectedTempEl = document.createElement('span');
    var projectedHumidityEl = document.querySelector('#projected-humidity');
    var projectedWindSpeedEl = document.querySelector('#projected-wind-speed');

console.log(temp);
return;
    resultsEl.appendChild(projectedCard);
    projectedCard.setAttribute('#projected-card');    
    projectedCard.appendChild(projectedContainerEl);
    projectedContainerEl.setAttribute('#projected-container');
    projectedContainerEl.appendChild('projectedDateEl');
    projectedDateEl.appendChild(cityDate);
    projectedDateEl.setAttribute('#projected-date');
    projectedContainerEl.appendChild(projectedIconEl);
    projectedIconEl.setAttribute('#projected-icon');
    projectedIconEl.appendChild(weatherIcon);
    projectedCard.appendChild(projectedConditionsEl);
    projectedConditionsEl.setAttribute('#projected-conditions');
    projectedConditionsEl.appendChild(projectedTempEl);
    projectedTempEl.setAttribute('#projected-temp');
    projectedTempEl.appendChild(temp);
    projectedConditionsEl.appendChild(projectedHumidityEl);
    projectedHumidityEl.setAttribute('#projected-humidity');
    projectedHumidityEl.appendChild(humidity);
    projectedConditionsEl.appendChild(projectedWindSpeedEl);
    projectedWindSpeedEl.setAttribute('#projected-wind-speed');
    projectedWindSpeedEl.appendChild(windSpeed);

};


var inputSubmitHandler = function (event) {
  event.preventDefault();

  var cityName = cityInputEl.value.trim();
  if (cityName) {
    getCityName(cityName);
  } else {
    alert("Please enter a city");
  }

  localStorage.setItem("city", cityName);
  currentForecast.textContent = "";
  displaySearched(cityName);
};

var getCityName = function (cityName) {
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
          displayResults();
          var cityName = data.city.name;
          var cityDate = data.list[3].dt_txt;
          var weatherIcon = data.list[3].weather[0].icon;
          var humidity = data.list[3].main.humidity;
          var temp = data.list[3].main.temp;
          var windSpeed = data.list[3].wind.speed;
  

          })
        };
  });};

submission.addEventListener("click", inputSubmitHandler);

/* need to loop throug 5 times and create a new section each time.
that section needs the .card class. and id set to day + dayNum

then, we need to append the city, date, weather icon, humidity, temp, windSpeed
to the new card. easiest would be to just center/vertical but if I had time to make it nice I'd organize and arrange them.

After testing it looks like we're getting good data, just need to figure out how to print and append.  then verify local storage works.
*/
