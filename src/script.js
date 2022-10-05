let now = new Date();
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let date = now.getDate();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Sunday",
];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let h4 = document.querySelector("h4");
h4.innerHTML = `${day}, ${date} ${month} ${hour}:${minutes}`;

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
                  )}</span>
                  <span class="weather-forecast-min">${Math.round(
                    forecastDay.temp.min
                  )}</span>
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
  console.log(response.data);
  let currentTemperature = document.querySelector("#current-temperature");

  currentTemperature.innerHTML = Math.round(response.data.main.temp);

  celciusTemperature = response.data.main.temp;

  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = response.data.weather[0].description;

  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = response.data.name;

  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);

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
  cityImage.innerHTML = `<img src=${hits} width="300px" class="pixabay-img">`;
}

function getImage(city) {
  let imgApiKey = "30364853-d7b6bed8d79e1332ebe8e60cc";
  let imgApiUrl = `https://pixabay.com/api/?key=${imgApiKey}&q=${city}&image_type=photo`;
  console.log(imgApiUrl);
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

function convertToF(event) {
  event.preventDefault();
  let fahrenheit = (celciusTemperature * 9) / 5 + 32;
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let currentFahrenheit = document.querySelector("#current-temperature");
  currentFahrenheit.innerHTML = Math.round(fahrenheit);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToF);

let celciusTemperature = null;
console.log(celciusTemperature);

function convertToC(event) {
  event.preventDefault();
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let currentCelcius = document.querySelector("#current-temperature");
  currentCelcius.innerHTML = Math.round(celciusTemperature);
}

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", convertToC);

search("London");
getImage("London");

function hourAlert() {
  let hour = now.getHours();

  if (hour < 19) {
    document.querySelector("body").style.background =
      "linear-gradient(109.6deg, rgb(204, 228, 247) 11.2%, rgb(237, 246, 250) 100.2%)";
    document.querySelector("#weather-app").style.backgroundColor = "#fafafa";
    document.querySelector("#top-section").style.backgroundColor = "#f5f5f5";
    document.querySelector("#box-overview").style.backgroundColor = "#f5f5f5";
    document.querySelector("#box-forecast").style.backgroundColor = "#f5f5f5";
    document.querySelector("#weather-app").style.color = "#000";
    document.querySelector("body").style.color = "#000";
  } else {
    document.querySelector("body").style.backgroundColor = "#1f2933";
    document.querySelector("#weather-app").style.backgroundColor = "#323f4b";
    document.querySelector("#top-section").style.backgroundColor = "#616e7c";
    document.querySelector("#box-overview").style.backgroundColor = "#616e7c";
    document.querySelector("#box-forecast").style.backgroundColor = "#616e7c";
    document.querySelector("#weather-app").style.color = "#f5f5f5";
    document.querySelector("body").style.color = "#f5f5f5";
  }
}
hourAlert();
