// Current Date
function formarDate() {
  let currentDate = document.querySelector("#current-date");
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wensday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = daysOfWeek[now.getDay()];

  if (minutes > 10) {
    currentDate.innerHTML = `${day} ${hours}:${minutes}`;
  } else {
    currentDate.innerHTML = `${day} ${hours}:0${minutes}`;
  }
}
let now = new Date();
formarDate();

// Feature #2 Weather search
function showTemperature(response) {
  console.log(response.data);
  document.querySelector("#current-city").innerHTML = response.data.name;
  let currentTemp = Math.round(response.data.main.temp);
  todayTemperature.innerHTML = currentTemp;
  todayTemperatureValue = todayTemperature.textContent;
  document.querySelector("#weather-description").innerHTML = response.data.weather[0].main;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#feels-like").innerHTML = Math.round(response.data.main.feels_like);
}

function searchCity (city){
  let apiKey = "343d33d71141f1623d91c8c8aab91982";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = apiEndPoint + "q=" + city + "&appid=" + apiKey + "&units=metric";
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
   let city = document.querySelector("#search-input").value;
  console.log(city);

  if (!city) {
    alert("You should input a city!");
  } else {
    searchCity(city);
  }
}

//Weather API Current Location
function showPosition(position){
  let apiKey = "343d33d71141f1623d91c8c8aab91982";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather?";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = apiEndPoint + "lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=metric";
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition(){
  navigator.geolocation.getCurrentPosition(showPosition);
  document.querySelector("#search-input").value = "";
}

let currentBtn = document.querySelector("#current-btn");
currentBtn.addEventListener("click", getCurrentPosition);
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);
let todayTemperature = document.querySelector("#today-temperature");
searchCity("Kyiv");

// Feature #3
let celsiusUnit = document.querySelector("#celsius-temp");
let fahrenheitUnit = document.querySelector("#fahrenheit-temp");
let todayTemperatureValue = todayTemperature.textContent;

celsiusUnit.addEventListener("click", function (event) {
  event.preventDefault();
  let celsiusTemperature = todayTemperatureValue;
  todayTemperature.innerHTML = celsiusTemperature;
});

fahrenheitUnit.addEventListener("click", function (event) {
  event.preventDefault();
  let celsiusTemperature = todayTemperatureValue;
  let fahrTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  todayTemperature.innerHTML = fahrTemperature;
});






// function capitalizeFirstLetter() {
//   let arr = city.split(" ");

//   for (let i = 0; i < arr.length; i++) {
//     arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
//   }

//   city = arr.join(" ");
//   return city;
// }

// let weather = {
//   paris: {
//     temp: 19.7,
//     humidity: 80,
//   },
//   tokyo: {
//     temp: 17.3,
//     humidity: 50,
//   },
//   lisbon: {
//     temp: 30.2,
//     humidity: 20,
//   },
//   "san francisco": {
//     temp: 20.9,
//     humidity: 100,
//   },
//   oslo: {
//     temp: -5,
//     humidity: 20,
//   },
// };

// // write your code here
// let city = prompt("Enter a city");
// city = city.toLowerCase();

// if (weather[city] !== undefined) {
//   let cityTempCelsium = Math.round(weather[city].temp);
//   let cityTempFar = Math.round((weather[city].temp * 9) / 5 + 32);
//   let cityHumidity = weather[city].humidity;

//   alert(
//     `It is currently ${cityTempCelsium}°C (${cityTempFar}°F) in ${capitalizeFirstLetter()} with a humidity of ${cityHumidity}%`
//   );
// } else {
//   alert(
//     "Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+sydney"
//   );
// }
