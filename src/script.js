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

let searchCityForm = document.querySelector("#search-city-form");

function showWeather(response) {
  let temp = Math.round(response.data.main.temp);
  let weatherDescription = response.data.weather[0].description;
  let description = document.querySelector("#weather-description");
  description.innerHTML = weatherDescription;
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = temp;
  let currentCity = document.querySelector("#current-city");
  let city = response.data.name;

  currentCity.innerHTML = city;
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = response.data.wind.speed;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
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

searchCityForm.addEventListener("submit", searchCityWeather);

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

let currentButton = document.querySelector("#current-location-weather");

currentButton.addEventListener("click", showCurrentLocation);

search("Edinburgh");
