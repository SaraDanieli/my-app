//feature 1

function showDay() {
  let currentDate = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[currentDate.getDay()];
}

function showTime() {
  let currentDate = new Date();
  let currentHour = currentDate.getHours();
  let currentMinute = currentDate.getMinutes();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }
  let time = `${currentHour}:${currentMinute}`;
  return time;
}

function showDateAndTime() {
  let currentDay = document.querySelector("#current-day");
  let currentTime = document.querySelector("#current-time");
  let day = (currentDay.innerHTML = showDay());
  let time = (currentTime.innerHTML = showTime());

  return day, time;
}

showDateAndTime();

//feature 2

function showWeather(response) {
  let weatherDescription = response.data.weather[0].description;
  let description = document.querySelector("#weather-description");
  let currentTemperature = document.querySelector("#current-temperature");
  let currentCity = document.querySelector("#current-city");
  let city = response.data.name;
  let windSpeed = document.querySelector("#wind-speed");
  let humidity = document.querySelector("#humidity");
  let forecastIcon = document.querySelector("#forecast-icon");

  temperature = Math.round(response.data.main.temp);
  currentTemperature.innerHTML = temperature;
  description.innerHTML = weatherDescription;
  currentCity.innerHTML = city;
  windSpeed.innerHTML = response.data.wind.speed;
  humidity.innerHTML = response.data.main.humidity;
  forecastIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  forecastIcon.setAttribute("alt", weatherDescription);
}

function search(city) {
  let apiKey = "2f82b437e561d6487abf6249f713bd77";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function searchCityWeather(event) {
  event.preventDefault();

  let cityName = document.querySelector("#city-input");
  search(cityName.value);
}

function getPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "2f82b437e561d6487abf6249f713bd77";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function showCurrentLocation() {
  navigator.geolocation.getCurrentPosition(getPosition);
}

function convertTofahrenheit(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#current-temperature");
  let fahrenheitTemperature = (temperature * 9) / 5 + 32;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  temperatureElement.innerHTML = Math.round(temperature);
}

let currentButton = document.querySelector("#current-location-weather");
let temperature = null;
let searchCityForm = document.querySelector("#search-city-form");
let fahrenheitLink = document.querySelector("#fahrenheit");
let celsiusLink = document.querySelector("#celsius");

searchCityForm.addEventListener("submit", searchCityWeather);
currentButton.addEventListener("click", showCurrentLocation);
fahrenheitLink.addEventListener("click", convertTofahrenheit);
celsiusLink.addEventListener("click", convertToCelsius);

search("Edinburgh");
