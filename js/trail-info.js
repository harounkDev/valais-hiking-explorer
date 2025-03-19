document.addEventListener("DOMContentLoaded", () => {
  // 1. Parse URL data
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const dataString = urlParams.get("data");
  if (!dataString) return;

  const trailData = JSON.parse(decodeURIComponent(dataString));

  // 2. Fill in trail name & image
  document.getElementById("trail-name").textContent = trailData.name || "Unknown Trail";
  const trailImage = document.getElementById("trail-image");
  trailImage.src = trailData.image || "images/default.jpg";
  trailImage.alt = trailData.name || "Trail Image";

  // 3. Extra fields (location, distance, etc.)
  const locElem = document.getElementById("trail-location");
  const distElem = document.getElementById("trail-distance");
  const durElem  = document.getElementById("trail-duration");
  const diffElem = document.getElementById("trail-difficulty");
  const descElem = document.getElementById("trail-description");

  if (locElem) locElem.textContent   = trailData.location   || "N/A";
  if (distElem) distElem.textContent = trailData.distance   || "N/A";
  if (durElem)  durElem.textContent  = trailData.duration   || "N/A";
  if (diffElem) diffElem.textContent = trailData.difficulty || "N/A";
  if (descElem) descElem.textContent = trailData.description || "";

  // 4. Fetch Weather
  if (trailData.location) {
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
            Next Days <i class="fa-solid fa-angles-down"></i>
          </button>
        `;
        document.getElementById("weather-info").innerHTML = weatherInfo;

        // 5. Forecast Toggle
        document.getElementById("forecastButton").addEventListener("click", () => {
          fetchForecast(trailData.location)
            .then((forecast) => {
              const forecastContainer = document.getElementById("forecast-container");
              if (!forecastContainer) return;

              // Build forecast HTML
              let forecastHtml = forecast
                .map((day) => `
                  <div class="forecast-item">
                    <h2>${day.date}</h2>
                    <img src="${day.iconUrl}" alt="${day.condition.text} icon"><br>
                    <p>${day.condition.text}</p>
                    <p>Temp: ${day.temp_c}°C</p>
                  </div>
                `)
                .join("");

              // Add a Close button
              forecastHtml += `
                <button id="forecast-close-btn">Close</button>
              `;
              forecastContainer.innerHTML = forecastHtml;

              // Toggle the .show class
              forecastContainer.classList.toggle("show");

              // Close button to hide forecast
              const closeBtn = document.getElementById("forecast-close-btn");
              closeBtn.addEventListener("click", () => {
                forecastContainer.classList.remove("show");
              });
            })
            .catch((error) => console.error("Error fetching forecast data:", error));
        });
      })
      .catch((error) => console.error("Error fetching weather data:", error));
  }
});

// --- Weather Functions ---
function fetchWeather(location) {
  const apiKey = "a5114b1c4c17d61c8126b6aba89a6d07";
  return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch weather data");
      return res.json();
    })
    .then((data) => ({
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
    }));
}

function fetchForecast(location) {
  const apiKey = "a5114b1c4c17d61c8126b6aba89a6d07";
  return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}`)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch forecast data");
      return res.json();
    })
    .then((data) => {
      const uniqueDays = new Set();
      return data.list
        .filter((item) => {
          const date = new Date(item.dt_txt).toLocaleDateString();
          // Up to 5 unique days
          if (!uniqueDays.has(date) && uniqueDays.size < 5) {
            uniqueDays.add(date);
            return true;
          }
          return false;
        })
        .map((item) => ({
          date: new Date(item.dt_txt).toLocaleDateString(),
          temp_c: (item.main.temp - 273.15).toFixed(1),
          condition: {
            text: item.weather[0].description,
            code: item.weather[0].id,
          },
          iconUrl: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
        }));
    });
}
