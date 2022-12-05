$(document).foundation();
//this will gather the  city searched for.
var cityInputEl = document.querySelector('#search');
var citySubmission = document.querySelector('#submission');



function displayResults(data) {
//projected card variables that will run 5 cycles and print off 5 data sets.
//this card will display the current conditions.
var cityName = data.city.name;
var currentDate = data.list[3].dt_txt;
var currentIcon = data.list[3].weather[0].icon;
var currentHumidity = data.list[3].main.humidity;
var currentTemp = data.list[3].main.temp;
var currentWindSpeed = data.list[3].wind.speed;
var citySearch = document.querySelector('#city-search');
var currentResultEl = document.querySelector('#current-result');
  var currentCardEl = document.createElement('div')

  var iconUrl = "http://openweathermap.org/img/w/" + currentIcon + ".png";

  var currentHeaderEl = document.createElement('div');
  var cityNameEl = document.createElement('span');
  var currentDateEl = document.createElement('span');
  var currentBodyEl = document.createElement('div');
  var card1 = document.createElement('div');
  var card2 = document.createElement('div');
  var currentTempEl = document.createElement('span');
  var currentHumidityEl = document.createElement('span');
  var currentWindSpeedEl = document.createElement('span');
var currentIconEl = document.createElement('img');

currentResultEl.appendChild(currentCardEl);
currentCardEl.setAttribute('class', 'card');
currentCardEl.setAttribute('id','current-card');
currentCardEl.appendChild(currentHeaderEl);
currentHeaderEl.setAttribute('id', 'current-header');
currentHeaderEl.appendChild(cityNameEl);
cityNameEl.setAttribute('id', 'city-name');
currentHeaderEl.setAttribute('class', 'card-divider');
cityNameEl.textContent =  cityName + ' ';
currentHeaderEl.appendChild(currentDateEl);
currentDateEl.textContent = currentDate + ' ';
currentCardEl.appendChild(currentBodyEl);
currentBodyEl.setAttribute('id', 'current-body');
currentBodyEl.setAttribute('class', 'card-section');
currentBodyEl.appendChild(card1);
card1.appendChild(currentTempEl);
card1.setAttribute('class', 'columns small-6');
currentTempEl.textContent = 'Temp: ' +currentTemp + 'f ';
card1.appendChild(currentHumidityEl);
currentHumidityEl.textContent = 'Humidity: '+ currentHumidity + ' ';
card1.appendChild(currentWindSpeedEl);
currentWindSpeedEl.textContent = 'Wind Speed: ' + currentWindSpeed + ' ';
currentBodyEl.appendChild(card2);
card2.appendChild(currentIconEl);
card2.setAttribute('class', 'columns small-6');
currentIconEl.setAttribute('src', iconUrl);
citySearch.setAttribute('class', 'hide');

currentResultEl.removeAttribute('class','hide');

for (i=3; i < 40; i = i+8) {

var cityDate = data.list[i].dt_txt;
var weatherIcon = data.list[i].weather[0].icon;
var humidity = data.list[i].main.humidity;
var temp = data.list[i].main.temp;
var windSpeed = data.list[i].wind.speed;
var iconUrl = "http://openweathermap.org/img/w/" + currentIcon + ".png";
var resultsEl = document.querySelector('#results');
var projectedCard = document.createElement('div');
  var projectedContainerEl = document.createElement('div');
    var projectedDateEl = document.createElement('span');
    var projectedIconEl = document.createElement('img');
  var projectedConditionsEl = document.createElement('div');
    var projectedTempEl = document.createElement('span');
    var projectedHumidityEl = document.createElement('span');
    var projectedWindSpeedEl = document.createElement('span');
    //need to get this to start at 6 and increase by 8

    resultsEl.appendChild(projectedCard);
    // resultsEl.setAttribute('class', )
    projectedCard.setAttribute('id','projected-card');
    projectedCard.setAttribute('class', 'card');    
    projectedCard.appendChild(projectedContainerEl);
    projectedContainerEl.setAttribute('id', 'projected-container');
    projectedContainerEl.setAttribute('class', 'card-divider');
    projectedContainerEl.appendChild(projectedDateEl);
    projectedDateEl.textContent = cityDate + ' ';
    projectedDateEl.setAttribute('id','projected-date');
    projectedContainerEl.appendChild(projectedIconEl);
    projectedIconEl.setAttribute('id','projected-icon');
    projectedIconEl.setAttribute('src', iconUrl);
    projectedCard.appendChild(projectedConditionsEl);
    projectedConditionsEl.setAttribute('id','projected-conditions');
    projectedConditionsEl.setAttribute('class', 'card-section');
    projectedConditionsEl.appendChild(projectedTempEl);
    projectedTempEl.setAttribute('id','projected-temp');
    projectedTempEl.textContent = 'Temp: ' + temp + 'f ';
    projectedConditionsEl.appendChild(projectedHumidityEl);
    projectedHumidityEl.setAttribute('id','projected-humidity');
    projectedHumidityEl.textContent = 'Humidity: '+ humidity + ' ';
    projectedConditionsEl.appendChild(projectedWindSpeedEl);
    projectedWindSpeedEl.setAttribute('id', 'projected-wind-speed');
    projectedWindSpeedEl.textContent = 'Wind Speed: ' + windSpeed + ' ';
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

