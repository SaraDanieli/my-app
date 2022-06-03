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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastDays = document.querySelector("#forecast");

  let forecastHTML = "";

  forecast.forEach(function (day, index) {
    if (index < 6 && index > 0) {
      forecastHTML =
        forecastHTML +
        ` <div class="col-12 col-sm-5 col-lg-4 col-xl-2 mb-4 ">
        <div class="card mx-3 mx-sm-auto shadow forecast-box">
            <div class="card-body">
              <p class="card-title day-name">${formatDay(day.dt)}</p>
              <p class="card-text"> <img id="forecast-icon" class="forecast-icon" src="http://openweathermap.org/img/wn/${
                day.weather[0].icon
              }@2x.png" alt="" />
              
              </p>
              <p><span class="temp-min">${Math.round(
                day.temp.min
              )}°</span> / ${Math.round(day.temp.max)}°</p>
            </div>
          </div>
          </div>`;
    }
  });

  forecastDays.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "926d89a58987d421e38ebd919d3dc9fe";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

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

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "2f82b437e561d6487abf6249f713bd77";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function searchCityWeather(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

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
