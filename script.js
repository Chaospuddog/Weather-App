let location = "Łódź";

async function getWeather(location) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&contentType=json`,
    );
    if (!response.ok) {
      throw new Error(`Błąd HTTP: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Nie udało się pobrać pogody:", error);
  }
}
let weatherData = await getWeather(location);

const cityMessage = document.querySelector(".cityInfo h1");
const cityDetails = document.querySelector(".cityInfo p");
const currentTemp = document.querySelector(".cardLeft h2");
const feelsLike = document.querySelector(".feelsLike");
const highestTemp = document.querySelector(".highest");
const lowestTemp = document.querySelector(".lowest");

const weatherDescription = document.querySelector(".weatherDescription");
const weatherIcon = document.querySelector(".weatherIcon");

const cityMenuBtn = document.querySelector(".cityMenuButton");
cityMenuBtn.textContent = location;

updateWeather(weatherData);

function updateWeather(weatherData) {
  lowestTemp.textContent = `Min: ${weatherData.days[0].tempmin}\u00B0C`;
  highestTemp.textContent = `Max: ${weatherData.days[0].tempmax}\u00B0C`;
  feelsLike.textContent = `Odczuwalne: ${weatherData.currentConditions.feelslike}\u00B0C`;
  currentTemp.textContent = `${weatherData.currentConditions.temp}\u00B0C`;
  cityDetails.textContent = `${weatherData.resolvedAddress}`;
  cityMessage.textContent = `Pogoda ${weatherData.address}`;

  if (weatherData.currentConditions.icon === "rain") {
    weatherIcon.src = "./media/rain.svg";
    weatherDescription.textContent = "Deszcz";
  } else if (weatherData.currentConditions.icon === "showers-day") {
    weatherIcon.src = "./media/rain.svg";
    weatherDescription.textContent = "Przelotny Deszcz";
  } else if (weatherData.currentConditions.icon === "fog") {
    weatherIcon.src = "./media/fog.svg";
    weatherDescription.textContent = "Mgła";
  } else if (weatherData.currentConditions.icon === "cloudy") {
    weatherIcon.src = "./media/cloud.svg";
    weatherDescription.textContent = "Pochmurnie";
  } else if (
    weatherData.currentConditions.icon === "partly-cloudy-day" ||
    weatherData.currentConditions.icon === "partly-cloudy-night"
  ) {
    weatherIcon.src = "./media/cloud-sunny.svg";
    weatherDescription.textContent = "Częściowe zachmurzenie";
  } else if (
    weatherData.currentConditions.icon === "clear-day" ||
    weatherData.currentConditions.icon === "clear-night"
  ) {
    weatherIcon.src = "./media/sun.svg";
    weatherDescription.textContent = "Słonecznie";
  } else if (weatherData.currentConditions.icon === "snow") {
    weatherIcon.src = "./media/snow.svg";
    weatherDescription.textContent = "Śnieg";
  } else if (
    weatherData.currentConditions.icon === "snow-showers-day" ||
    weatherData.currentConditions.icon === "snow-showers-night"
  ) {
    weatherIcon.src = "./media/snow.svg";
    weatherDescription.textContent = "Przelotny Śnieg";
  } else if (
    weatherData.currentConditions.icon === "thunder-showers-day" ||
    weatherData.currentConditions.icon === "thunder-showers"
  ) {
    weatherIcon.src = "./media/thunderstorm.svg";
    weatherDescription.textContent = "Przelotna burza";
  } else if (weatherData.currentConditions.icon === "thunder-rain") {
    weatherIcon.src = "./media/thunderstorm.svg";
    weatherDescription.textContent = "Burza";
  }
}

const searchBtn = document.querySelector(".searchButton");
const searchUser = document.querySelector(".citySearch input");
searchBtn.addEventListener("click", async () => {
  location = searchUser.value;
  weatherData = await getWeather(location);
  updateWeather(weatherData);
  cityMenu.setAttribute("hidden", true);
});
searchUser.addEventListener("keyup", async (e) => {
  const keyName = e.key;
  if (keyName === "Enter") {
    location = searchUser.value;
    weatherData = await getWeather(location);
    updateWeather(weatherData);
    cityMenu.setAttribute("hidden", true);
  }
});

const cityBtn = document.querySelector(".cityMenuButton");
const cityMenu = document.querySelector(".cityMenu");

cityBtn.addEventListener("click", () => {
  if (cityMenu.hasAttribute("hidden")) {
    cityMenu.removeAttribute("hidden");
  } else {
    cityMenu.setAttribute("hidden", true);
  }
});
