document.addEventListener("DOMContentLoaded", () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const trailData = JSON.parse(decodeURIComponent(urlParams.get("data")));

  document.getElementById("trail-name").textContent = trailData.name;
  const trailImage = document.getElementById("trail-image");
  trailImage.src = trailData.image;
  trailImage.alt = trailData.name;

  fetchWeather(trailData.location)
    .then((weather) => {
      const weatherInfo = `
            <img src="${weather.iconUrl}" alt="${weather.condition.text} icon"><br>
            Condition: ${weather.condition.text}<br>
            Temperature: ${weather.temp_c}°C<br>
            Wind Speed: ${weather.wind_kph} kph<br>
            Wind Direction: ${weather.wind_dir}°<br>
            Pressure: ${weather.pressure_mb} mb<br>
            Precipitation: ${weather.precip_mm} mm<br>
            Humidity: ${weather.humidity}%<br>
            Visibility: ${weather.vis_km} km
            <button id="forecastButton">
            Next Days
            <i class="fa-solid fa-angles-right"></i>
          </button>`;
      document.getElementById("weather-info").innerHTML = weatherInfo;

      document
        .getElementById("forecastButton")
        .addEventListener("click", () => {
          fetchForecast(trailData.location)
            .then((forecast) => {
              const forecastHtml = forecast
                .map(
                  (day) => `
                  <div class="forecast-item">
                    <h2>${day.date}</h2>
                    <img src="${day.iconUrl}" alt="${day.condition.text} icon"><br>
                    <p>${day.condition.text}</p>
                    <p>Temp: ${day.temp_c}°C</p>
                  </div>`
                )
                .join("");

              const forecastContainer =
                document.getElementById("forecast-container");
              if (!forecastContainer) {
                console.error("Forecast container element not found");
                return;
              }
              forecastContainer.innerHTML = forecastHtml;
              forecastContainer.style.display =
                forecastContainer.style.display === "none" ? "flex" : "none";
            })
            .catch((error) =>
              console.error("Error fetching forecast data:", error)
            );
        });
    })
    .catch((error) => console.error("Error fetching weather data:", error));
});

function fetchWeather(location) {
  const apiKey = "a5114b1c4c17d61c8126b6aba89a6d07";
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      return response.json();
    })
    .then((data) => {
      return {
        temp_c: (data.main.temp - 273.15).toFixed(1),
        condition: {
          text: data.weather[0].description,
          code: data.weather[0].id,
        },
        iconUrl: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        wind_kph: data.wind.speed,
        wind_dir: data.wind.deg,
        pressure_mb: data.main.pressure,
        precip_mm: data.rain ? data.rain["1h"] || 0 : 0,
        humidity: data.main.humidity,
        vis_km: (data.visibility / 1000).toFixed(1),
      };
    });
}

function fetchForecast(location) {
  const apiKey = "a5114b1c4c17d61c8126b6aba89a6d07";
  return fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch forecast data");
      }
      return response.json();
    })
    .then((data) => {
      const uniqueDays = new Set();
      return data.list
        .filter((item) => {
          const date = new Date(item.dt_txt).toLocaleDateString();
          if (!uniqueDays.has(date) && uniqueDays.size < 5) {
            uniqueDays.add(date);
            return true;
          }
          return false;
        })
        .map((item) => {
          return {
            date: new Date(item.dt_txt).toLocaleDateString(),
            temp_c: (item.main.temp - 273.15).toFixed(1),
            condition: {
              text: item.weather[0].description,
              code: item.weather[0].id,
            },
            iconUrl: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
          };
        });
    });
}
