// Default city and API key

let defaultCity = "Ljubljana";
let apiKey = "e1bb20f9dod0447c200aeabaa3t3f05c";
let defaultUrl = `https://api.shecodes.io/weather/v1/current?query=${defaultCity}&key=${apiKey}&units=metric`;

function fetchDefaultWeather() {
  getWeather(defaultUrl);
}

// Current weather element

function currentWeather(response) {
  let temperature = Math.round(response.data.temperature.current);
  let updateTemp = document.querySelector(".current-temperature");
  updateTemp.innerHTML = `${temperature}°C`;

  let feelsTemperature = Math.round(response.data.temperature.feels_like);
  let feelsLikeElement = document.querySelector("#feels-like");
  feelsLikeElement.innerHTML = `Feels like ${feelsTemperature}°C`;

  let description = response.data.condition.description;
  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = description;

  let humidity = Math.round(response.data.temperature.humidity);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${humidity}%`;

  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${wind}km/h`;

  let country = document.querySelector(".country");
  let findCountry = response.data.country;
  country.innerHTML = findCountry;

  // image update

  let imageUpdate = document.querySelector("#weather-image");
  if (description.toLowerCase() === "clear sky") {
    imageUpdate.src = "sun.png";
  } else if (description.toLowerCase() === "few clouds") {
    imageUpdate.src = "partly-cloudy.png";
  } else if (
    description.toLowerCase() === "scattered clouds" ||
    description.toLowerCase() === "broken clouds"
  ) {
    imageUpdate.src = "clouds.png";
  } else if (description.toLowerCase() === "overcast clouds") {
    imageUpdate.src = "cloud.png";
  } else if (
    description.toLowerCase() === "shower rain" ||
    description.toLowerCase() === "rain"
  ) {
    imageUpdate.src = "rain.png";
  } else if (
    description.toLowerCase() === "light rain" ||
    description.toLowerCase() === "light intensity shower rain" ||
    description.toLowerCase() === "light intensity drizzle"
  ) {
    imageUpdate.src = "weather-app.png";
  } else if (
    description.toLowerCase() === "moderate rain" ||
    description.toLowerCase() === "heavy intensity rain"
  ) {
    imageUpdate.src = "heavy-rain.png";
  } else if (description.toLowerCase() === "	thunderstorm") {
    imageUpdate.src = "storm.png";
  } else if (description.toLowerCase() === "snow") {
    imageUpdate.src = "snow.png";
  } else if (description.toLowerCase() === "mist") {
    imageUpdate.src = "fog.png";
  } else {
    imageUpdate.src = "no-results.png";
  }
  getForecast(response.data.city);
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
  let apiKey = "e1bb20f9dod0447c200aeabaa3t3f05c";
  let apiurl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  getWeather(apiurl);
}

// Timestamp element for forecast

function daysinWeek(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
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

// Forecast element

function getForecast(city) {
  let apiKey = "e1bb20f9dod0447c200aeabaa3t3f05c";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&unit=metric`;

  axios.get(apiUrl).then(displayForecast);
}
function displayForecast(response) {
  console.log(response.data);
  let forecastHtml = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      let description = day.condition.description;
      let imgSrc = "";

      if (
        description.toLowerCase() === "scattered clouds" ||
        description.toLowerCase() === "broken clouds"
      ) {
        imgSrc = "clouds.png";
      } else if (description.toLowerCase() === "few clouds") {
        imgSrc = "partly-cloudy.png";
      } else if (description.toLowerCase() === "overcast clouds") {
        imgSrc = "cloud.png";
      } else if (description.toLowerCase() === "sky is clear") {
        imgSrc = "sun.png";
      } else if (
        description.toLowerCase() === "light rain" ||
        description.toLowerCase() === "light intensity shower rain" ||
        description.toLowerCase() === "light intensity drizzle"
      ) {
        imgSrc = "weather-app.png";
      } else if (
        description.toLowerCase() === "shower rain" ||
        description.toLowerCase() === "rain"
      ) {
        imgSrc = "rain.png";
      } else if (
        description.toLowerCase() === "moderate rain" ||
        description.toLowerCase() === "heavy intensity rain"
      ) {
        imgSrc = "heavy-rain.png";
      } else if (description.toLowerCase() === "thunderstorm") {
        imgSrc = "storm.png";
      } else if (description.toLowerCase() === "snow") {
        imgSrc = "snow.png";
      } else if (
        description.toLowerCase() === "mist" ||
        description.toLowerCase() === "fog"
      ) {
        imgSrc = "fog.png";
      }

      forecastHtml += `
        <div class="weather-forecast-day">
          <div class="weather-forecast-date">${daysinWeek(day.time)}</div>
          <img src="${imgSrc}" class="weather-forecast-icon" width="60px"/>
          <div class="weather-forecast-temperatures">
            <div class="weather-forecast-temperature">
              <strong>${Math.round(day.temperature.maximum)}º</strong>
            </div>
            <div class="weather-forecast-temperature">${Math.round(
              day.temperature.minimum
            )}º</div>
          </div>
        </div>`;
    }
  });

  let forecastElement = document.querySelector(".weather-forecast");
  forecastElement.innerHTML = forecastHtml;

  let description = response.data.daily[0].condition.description;
}

let searchFormElement = document.querySelector(".search-weather");
searchFormElement.addEventListener("submit", handleSearchSubmit);

fetchDefaultWeather();
