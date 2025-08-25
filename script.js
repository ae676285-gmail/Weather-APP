"use strict";
// API key
const apiKey = "5843e55671420e3d4790f6c229149ed2";
//API url
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

//variables declarations
const cityName = document.querySelector(".city");
const cityTemp = document.querySelector(".temp");
const cityWindSpeed = document.querySelector(".wind-speed");
const cityHumidity = document.querySelector(".humidity");
const weatherIcon = document.querySelector(".weather-icon");
const userInput = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weatherName = document.querySelector(".weather-name");
const btnReset = document.querySelector(".btn-reset");
const hiddenInfo = document.querySelector(".hidden-info");
const cityNotFound = document.querySelector(".not-found");
const enterCity = document.querySelector(".enter-city");

//sychronizing data from  the API
async function checkWeather(country) {
  const response = await fetch(apiUrl + country + `&appid=${apiKey}`);
  if (response.status == 404) {
    //showing not found message when city name is not found
    cityNotFound.classList.remove("hide-text");
    hiddenInfo.classList.add("hidden-info");
    btnReset.classList.add("hidden");
    enterCity.classList.add("hide-city");
    userInput.value = "";
  } else {
    let data = await response.json();
    // console.log(data);

    //showing weather information when city is found
    hiddenInfo.classList.remove("hidden-info");
    btnReset.classList.remove("hidden");
    cityNotFound.classList.add("hide-text");
    enterCity.classList.add("hide-city");

    //all the weather conditions
    cityName.innerHTML = data.name;
    weatherName.innerHTML = data.weather[0].description;
    cityTemp.innerHTML = Math.trunc(data.main.temp);
    cityWindSpeed.innerHTML = data.wind.speed;
    cityHumidity.innerHTML = data.main.humidity;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  }
}

// function to take city name from user
searchbtn.addEventListener("click", () => {
  if (userInput.value == "") {
    enterCity.classList.remove("hide-city");
    hiddenInfo.classList.add("hidden-info");
    btnReset.classList.add("hidden");
    userInput.value = "";
  } else {
    checkWeather(userInput.value);
  }
});

// A button to reset the page to default
btnReset.addEventListener("click", () => {
  hiddenInfo.classList.add("hidden-info");
  userInput.value = "";
});
