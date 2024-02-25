// Default city and API key
let defaultCity = "Ljubljana";
let apiKey = "c9ce87d7214ace3c82826125848d3dfa";
let defaultUrl = `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&appid=${apiKey}&units=metric`;

function fetchDefaultWeather() {
  getWeather(defaultUrl);
}

fetchDefaultWeather();

// Current weather element

function currentWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let updateTemp = document.querySelector(".current-temperature");
  updateTemp.innerHTML = `${temperature}°C`;

  let feelsTemperature = Math.round(response.data.main.feels_like);
  let feelsLikeElement = document.querySelector("#feels-like");
  feelsLikeElement.innerHTML = `Feels like ${feelsTemperature}°C`;

  let description = response.data.weather[0].description;
  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = description;

  let humidity = Math.round(response.data.main.humidity);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${humidity}%`;

  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${wind}km/h`;

  // image update
  let imageUpdate = document.querySelector("#weather-image");
  if (description.toLowerCase() === "clear sky") {
    imageUpdate.src = "src/sun.png";
  } else if (description.toLowerCase() === "few clouds") {
    imageUpdate.src = "src/cloudy.png";
  } else if (description.toLowerCase() === "scattered clouds") {
    imageUpdate.src = "src/cloud.png";
  } else if (
    description.toLowerCase() === "broken clouds" ||
    description.toLowerCase() === "overcast clouds"
  ) {
    imageUpdate.src = "src/clouds.png";
  } else if (
    description.toLowerCase() === "shower rain" ||
    description.toLowerCase() === "rain" ||
    description.toLowerCase() === "light rain"
  ) {
    imageUpdate.src = "src/heavy-rain.png";
  } else if (description.toLowerCase() === "	thunderstorm") {
    imageUpdate.src = "src/storm.png";
  } else if (description.toLowerCase() === "snow") {
    imageUpdate.src = "src/snow.png";
  } else if (description.toLowerCase() === "mist") {
    imageUpdate.src = "src/fog.png";
  } else {
    imageUpdate.src = "src/no-results.png";
  }
}
function getWeather(apiUrl) {
  axios.get(apiUrl).then(currentWeather);
}

// Search engine
function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let searchCity = document.querySelector(".current-city");

  searchCity.innerHTML = searchInput.value;

  let city = searchInput.value;
  let apiKey = "c9ce87d7214ace3c82826125848d3dfa";
  let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  getWeather(apiurl);
}

let searchForm = document.querySelector(".search-weather");
searchForm.addEventListener("submit", handleSearchSubmit);

// Current date element
function updateTime() {
  let currentDate = new Date();
  let minutes = currentDate.getMinutes();
  let hours = currentDate.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedTime = `It is currently   ${hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }`;
  let time = document.querySelector("#time");
  time.innerHTML = formattedTime;
  let greating = document.querySelector("h3");
  if (hours >= 6 && hours < 12) {
    greating.innerHTML = "Good morning,";
  } else if (hours >= 12 && hours < 18) {
    greating.innerHTML = "Good afternoon,";
  } else if (hours >= 18 && hours < 24) {
    greating.innerHTML = "Good evening,";
  } else {
    greating.innerHTML = "Good night,";
  }

  let now = new Date();
  let formattedDay = days[now.getDay()];
  let day = document.querySelector("h1");
  day.innerHTML = formattedDay + "!";
}

updateTime();

setInterval(updateTime, 60000);
