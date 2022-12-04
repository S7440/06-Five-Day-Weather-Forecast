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

function displayResults(data) {
//projected card variables that will run 5 cycles and print off 5 data sets.
var i = 6;
for (i=6; i < 40; i = i+8) {
var cityName = data.city.name;
var cityDate = data.list[i].dt_txt;
var weatherIcon = data.list[i].weather[0].icon;
var humidity = data.list[i].main.humidity;
var temp = data.list[i].main.temp;
var windSpeed = data.list[i].wind.speed;

var resultsEl = document.querySelector('#results');
var projectedCard = document.createElement('section');
  var projectedContainerEl = document.createElement('div');
    var projectedDateEl = document.createElement('span');
    var projectedIconEl = document.createElement('span');
  var projectedConditionsEl = document.createElement('div');
    var projectedTempEl = document.createElement('span');
    var projectedHumidityEl = document.createElement('span');
    var projectedWindSpeedEl = document.createElement('span');
    //need to get this to start at 6 and increase by 8

    resultsEl.appendChild(projectedCard);
    projectedCard.setAttribute('id','projected-card');    
    projectedCard.appendChild(projectedContainerEl);
    projectedContainerEl.setAttribute('id', 'projected-container');
    projectedContainerEl.appendChild(projectedDateEl);
    projectedDateEl.textContent = cityDate + ' ';
    projectedDateEl.setAttribute('id','projected-date');
    projectedContainerEl.appendChild(projectedIconEl);
    projectedIconEl.setAttribute('id','projected-icon');
    projectedIconEl.textContent = weatherIcon + ' ';
    projectedCard.appendChild(projectedConditionsEl);
    projectedConditionsEl.setAttribute('id','projected-conditions');
    projectedConditionsEl.appendChild(projectedTempEl);
    projectedTempEl.setAttribute('id','projected-temp');
    projectedTempEl.textContent = temp + ' ';
    projectedConditionsEl.appendChild(projectedHumidityEl);
    projectedHumidityEl.setAttribute('id','projected-humidity');
    projectedHumidityEl.textContent = humidity + ' ';
    projectedConditionsEl.appendChild(projectedWindSpeedEl);
    projectedWindSpeedEl.setAttribute('id', 'projected-wind-speed');
    projectedWindSpeedEl.textContent = windSpeed + ' ';
  };
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
  // currentForecast.textContent = "";
  // displaySearched(cityName);
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
          displayResults(data);


          })
        };
  });};

submission.addEventListener("click", inputSubmitHandler);

// need to loop throug 5 times and create a new section each time.
// that section needs the .card class. and id set to day + dayNum

// then, we need to append the city, date, weather icon, humidity, temp, windSpeed
// to the new card. easiest would be to just center/vertical but if I had time to make it nice I'd organize and arrange them.

// After testing it looks like we're getting good data, just need to figure out how to print and append.  then verify local storage works.

