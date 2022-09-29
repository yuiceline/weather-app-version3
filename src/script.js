

let now = new Date();
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let month = months[now.getMonth()];
let date = now.getDate();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Sunday"];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
    hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
console.log(`Today is ${day}, ${date} ${month} ${hour}:${minutes}`);


function showTemperature(response) {
    console.log(response.data.main.temp);
}


function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  let h3 = document.querySelector("h3");
  h3.innerHTML = city.value;

  let apiKey = "690c1586235f5c036bd74a5466b0f1f4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=london&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTemperature);
}

let checkCity = document.querySelector("#search-form");
checkCity.addEventListener("submit", changeCity);
