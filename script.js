//function gets weather from API and sends it to be put into the DOM
let place = "chicago";
async function getWeather() {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=8bda2dd7ddc74b3983f204121230906&q=${place}`
    );
    if (response.status === 400) {
      invalid();
      throw new Error("unknown location");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}
getWeather().then((result) => {
  assignWeatherValues(result);
});
function invalid() {
  searchBar.value = "location not found";
  searchBar.classList.add("invalid");
}
function assignWeatherValues(weatherInfo) {
  temp.innerHTML = weatherInfo.current.temp_c + "\u00B0";
  condition.innerHTML = weatherInfo.current.condition.text;
  tempFeelsLike.innerHTML = weatherInfo.current.feelslike_f + "\u00B0";
  wind.innerHTML = weatherInfo.current.wind_mph + " mph";
  rain.innerHTML = weatherInfo.current.precip_in + " in";
  humidity.innerHTML = weatherInfo.current.humidity + "%";
  locationName.innerHTML = weatherInfo.location.name;
  //setImage(condition.innerHTML);
}
function setImage(condition) {
  console.log(condition);
  if (condition === "Partly cloudy") {
    console.log(document.body.style.backgroundImage);
    document.body.style.backgroundImage = "url('sunny.jpeg')";
    document.body.style.color = "black";
  } else {
    document.body.style.backgroundImage = "url('rain.jpeg')";
    document.body.style.color = "white";
  }
}
//selectors for different weather info
const temp = document.querySelector("#temp");
const condition = document.querySelector("#condition");
const tempFeelsLike = document.querySelector("#tempFeelsLike");
const wind = document.querySelector("#wind");
const rain = document.querySelector("#rain");
const humidity = document.querySelector("#humidity");
const locationName = document.querySelector("#locationName");
const searchBar = document.querySelector("#searchBar");
const searchButton = document.querySelector("#searchButton");

searchButton.addEventListener("click", () => {
  place = searchBar.value;
  getWeather().then((result) => {
    assignWeatherValues(result);
  });
});
searchBar.addEventListener("click", () => {
  searchBar.classList.remove("invalid");
  searchBar.value = "";
});
