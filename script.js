// city input
const city_input = document.querySelector(".city-input");
// main weather card
const current_weather = document.querySelector(".current-weather");
// 5 day weather cards
const weather_cards = document.querySelector(".extra");
// api key
const api_key = "693e207f5ac76dd7c41eabfe04bfd00e";
// create cards that will be displayed after getting weather info from api 
const createWeatherCard = (city_name, weather_item, i) => {
  if (i == 0) {
    return `<div class="card text-bg-info current-weather">
                <div class="row">
                    <div class="col-9 col-sm-9 col-md-7 col-lg-7">
                        <div class="card-header"><b>(${city_name})</b> ${weather_item.dt_txt.split(" ")[0]}</div>
                        <div class="card-body">
                            <p class="card-text">Temperatūra: ${(weather_item.main.temp - 273.15).toFixed(2)} °C</p>
                            <p class="card-text">Drėgnumas: ${weather_item.main.humidity} %</p>
                            <p class="card-text">Vėjas: ${weather_item.wind.speed} m/s, P</p>
                            <p class="card-text">Slėgis: ${weather_item.main.pressure} hPa</p>
                        </div>
                    </div>
                    <div class="col-3 col-sm-3 col-md-4 col-lg-4 d-flex justify-content-center align-items-center">
                        <div class="icon">
                            <img src="https://openweathermap.org/img/wn/${weather_item.weather[0].icon}@4x.png" alt="weather-icon">
                        </div>
                    </div>
                </div>
            </div>`;
  } else { 
    return `<div class="card text-bg-secondary col-12 col-md-5 col-xxl-3">
                <div class="card-header">${weather_item.dt_txt.split(" ")[0]}</div>
                <div class="card-body">
                    <img src="https://openweathermap.org/img/wn/${weather_item.weather[0].icon}@4x.png" alt="weather-icon">
                    <p class="card-text">Temperatūra: ${(weather_item.main.temp - 273.15).toFixed(2)} °C</p>
                    <p class="card-text">Drėgnumas: ${ weather_item.main.humidity} %</p>
                    <p class="card-text">Vėjas: ${weather_item.wind.speed} m/s, P</p>
                    <p class="card-text">Slėgis: ${weather_item.main.pressure} hPa</p>
                </div>
            </div>`;
  }
};
// collect info from api
const getWeatherDetails = (city_name, lat, lon) => {
  const weather_api_url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`;
  fetch(weather_api_url).then((response) => response.json()).then((data) => {
      const unique_forecast_days = [];
      const five_days_forecast = data.list.filter((forecast) => {
        const forecastDate = new Date(forecast.dt_txt).getDate();
        if (!unique_forecast_days.includes(forecastDate)) {
          return unique_forecast_days.push(forecastDate);
        }
      });
      city_input.value = "";
      current_weather.innerHTML = "";
      weather_cards.innerHTML = "";
      five_days_forecast.forEach((weather_item, i) => {
        const html = createWeatherCard(city_name, weather_item, i);
        if (i == 0) { 
          current_weather.insertAdjacentHTML("beforeend", html);
        } else { 
          weather_cards.insertAdjacentHTML("beforeend", html);
        }
      });
    }).catch(() => { 
      alert("Error fetching forecast");
    });
};
// get data from specific longitude and latitude found by city name, create cards and display them
const getCityCoordinates = () => {
  const city_name = city_input.value.trim();
  if (city_name == "") return;
  const api_url = `https://api.openweathermap.org/geo/1.0/direct?q=${city_name}&limit=1&appid=${api_key}`;
  fetch(api_url).then((response) => response.json()).then((data) => {
      if (!data.length) return alert(`No coordinates found`);
      const { lat, lon, name } = data[0];
      getWeatherDetails(name, lat, lon);
    }).catch(() => {
      alert("Error fetching coordinates");
    });
};









