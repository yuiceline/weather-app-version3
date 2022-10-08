function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
               <div class="col-2">
                <div class="weather-forecast-date">${formatDay(
                  forecastDay.dt
                )}</div>
                <img
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt=""
                  width="42px" class="forecast-icon"
                />
                <div class="weather-forecast-temp">
                  <span class="weather-forecast-max">${Math.round(
                    forecastDay.temp.max
                  )}°</span>
                  <span class="weather-forecast-min">${Math.round(
                    forecastDay.temp.min
                  )}°</span>
                </div>
              </div>
              `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "3c949ba49d38be2487ee278e0d2d4059";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let date = document.querySelector("#date");
  date.innerHTML = formatDate(response.data.dt * 1000);

  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = Math.round(response.data.main.temp);

  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = response.data.weather[0].description;

  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = response.data.name;

  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);

  let cloudiness = document.querySelector("#cloudiness");
  cloudiness.innerHTML = response.data.clouds.all;

  let maxTemp = document.querySelector("#max-temp");
  maxTemp.innerHTML = Math.round(response.data.main.temp_max);

  let minTemp = document.querySelector("#min-temp");
  minTemp.innerHTML = Math.round(response.data.main.temp_min);

  let currentHumidity = document.querySelector("#current-humidity");
  currentHumidity.innerHTML = response.data.main.humidity;

  let currentWind = document.querySelector("#current-wind");
  currentWind.innerHTML = Math.round(response.data.wind.speed);

  let weatherIcon = document.querySelector("#weather-icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "690c1586235f5c036bd74a5466b0f1f4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function showImage(response) {
  let cityImage = document.querySelector(".city-img");
  let hits = response.data.hits[0].largeImageURL;
  cityImage.innerHTML = `<img src=${hits} width="220px" height="180px" class="pixabay-img">`;
}

function getImage(city) {
  let imgApiKey = "30364853-d7b6bed8d79e1332ebe8e60cc";
  let imgApiUrl = `https://pixabay.com/api/?key=${imgApiKey}&q=${city}+city&image_type=photo`;
  axios.get(imgApiUrl).then(showImage);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#cityInput");
  search(city.value);
  getImage(city.value);
}

let checkCity = document.querySelector("#search-form");
checkCity.addEventListener("submit", handleSubmit);

search("Rome");
getImage("Rome");

function changeColor() {
  let now = new Date();
  let hour = now.getHours();

  if (hour > 6 && hour < 18) {
    document.querySelector("body").style.backgroundColor = "#fff";
    document.querySelector("#weather-app").style.backgroundImage =
      "url('media/morning-background.jpg')";
    document.querySelector("#top-section").style.background =
      "hsl(210, 54%, 72%, .5)";
    document.querySelector("#box-overview").style.background =
      "hsl(210, 54%, 72%, .5)";
    document.querySelector("#box-forecast").style.background =
      "hsl(210, 54%, 72%, .5)";
    document.querySelector(".btn").style.backgroundColor = "#4E80B1";
    document.querySelector("#weather-app").style.color = "#1b1811";
  } else {
    document.querySelector("#weather-app").style.background =
      "url('media/night-background.jpg')";
    document.querySelector("#top-section").style.background =
      "hsla(230, 23%, 25%, .5)";
    document.querySelector("#box-overview").style.background =
      "hsla(230, 23%, 25%, .5)";
    document.querySelector("#box-forecast").style.background =
      "hsla(230, 23%, 25%, .5)";
    document.querySelector("#weather-app").style.color = "#f5f5f5";
    document.querySelector(".form-control").style.backgroundColor =
      "hsla(230, 23%, 25%, .5)";
    document.querySelector(".btn").style.backgroundColor = "#6164a3";
  }
}
changeColor();
