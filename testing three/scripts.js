// Load trails from JSON file
fetch("trails.json")
  .then((response) => response.json())
  .then((trails) => {
    // Store trails data in a variable
    let allTrails = trails;

    // Function to filter trails based on user selections
    function filterTrails() {
      const difficulty = document.getElementById("difficulty").value;
      const distance = parseFloat(document.getElementById("distance").value);
      const duration = parseFloat(document.getElementById("length").value);

      const filteredTrails = allTrails.filter((trail) => {
        // Check difficulty if it's selected
        const isDifficultyMatch =
          difficulty === "any" || trail.difficulty === difficulty;

        // Check distance if it's selected
        const isDistanceMatch = parseFloat(trail.distance) <= distance;

        // Check duration if it's selected
        const isDurationMatch = parseFloat(trail.duration) <= duration;

        // Return true if all criteria match
        return isDifficultyMatch && isDistanceMatch && isDurationMatch;
      });

      // Display filtered trails on the webpage
      displayTrails(filteredTrails);
      // Display the count of filtered trails
      displayTrailCount(filteredTrails.length);
    }

    // Function to display trails on the webpage
    async function displayTrails(trails) {
      const trailList = document.getElementById("trail-list");
      trailList.innerHTML = "";

      for (const trail of trails) {
        const trailElement = document.createElement("div");
        trailElement.classList.add("trail");

        const trailName = document.createElement("h3");
        trailName.textContent = trail.name;
        trailElement.appendChild(trailName);

        const trailImage = document.createElement("img");
        trailImage.src = trail.image;
        trailImage.alt = trail.name;

        // Add event listener to open new window with trail information
        trailImage.addEventListener("click", () => {
          openTrailInfoWindow(trail);
        });

        trailElement.appendChild(trailImage);

        // Add trail information below the image
        const trailInfo = document.createElement("p");
        trailInfo.innerHTML = `<strong>Location:</strong> ${trail.location}<br>
                              <strong>Duration:</strong> ${trail.duration}<br>
                              <strong>Distance:</strong> ${trail.distance}<br>
                              <strong>Difficulty:</strong> ${trail.difficulty}`;
        trailElement.appendChild(trailInfo);

        trailList.appendChild(trailElement);
      }
    }

    // Function to fetch weather data
    async function fetchWeather(location) {
      const apiKey = "f85bc0169d944cacb28193949240505";
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(
          location
        )}`
      );
      if (!response.ok) {
        console.error("Failed to fetch weather data");
        return {
          temp_c: "N/A",
          condition: { text: "N/A" },
          wind_kph: "N/A",
          wind_dir: "N/A",
          pressure_mb: "N/A",
          precip_mm: "N/A",
          humidity: "N/A",
          cloud: "N/A",
          feelslike_c: "N/A",
          vis_km: "N/A",
          uv: "N/A",
        };
      }
      const data = await response.json();
      return {
        temp_c: data.current.temp_c,
        condition: data.current.condition,
        wind_kph: data.current.wind_kph,
        wind_dir: data.current.wind_dir,
        pressure_mb: data.current.pressure_mb,
        precip_mm: data.current.precip_mm,
        humidity: data.current.humidity,
        cloud: data.current.cloud,
        feelslike_c: data.current.feelslike_c,
        vis_km: data.current.vis_km,
        uv: data.current.uv,
      };
    }

    // Initial display of all trails
    displayTrails(allTrails);

    // Update distance value display
    document.getElementById("distance").addEventListener("input", function () {
      document.getElementById("distance-value").textContent =
        this.value + " km";
    });

    // Update duration value display
    document.getElementById("length").addEventListener("input", function () {
      document.getElementById("length-value").textContent =
        this.value + " hours";
    });

    // Add event listener to apply filters button
    document
      .getElementById("apply-filters")
      .addEventListener("click", filterTrails);

    // Function to display all trails without applying filters
    function showAllTrails() {
      displayTrails(allTrails);
      displayTrailCount(allTrails.length);
    }

    // Add event listener to the "Show All" button
    document
      .getElementById("show-all")
      .addEventListener("click", showAllTrails);

    // Function to display trail count
    function displayTrailCount(count) {
      const trailCount = document.getElementById("trail-count");
      trailCount.textContent = `(${count} trails found)`;
    }

    // Function to open new window with trail information
    function openTrailInfoWindow(trail) {
      const newWindow = window.open("", "_blank");
      fetchWeather(trail.location).then((weather) => {
        const weatherInfo = `Weather:
          - Temperature: ${weather.temp_c}°C
          - Condition: ${weather.condition.text}
          - Wind Speed: ${weather.wind_kph} kph
          - Wind Direction: ${weather.wind_dir}
          - Pressure: ${weather.pressure_mb} mb
          - Precipitation: ${weather.precip_mm} mm
          - Humidity: ${weather.humidity}%
          - Cloud Cover: ${weather.cloud}%
          - Feels Like: ${weather.feelslike_c}°C
          - Visibility: ${weather.vis_km} km
          - UV Index: ${weather.uv}`;

        newWindow.document.write(
          `<html><head><title>${trail.name}</title></head><body><h1>${trail.name}</h1><img src="${trail.image}" alt="${trail.name}"><p>${weatherInfo}</p></body></html>`
        );
        newWindow.document.close();
      });
    }
  })
  .catch((error) => console.error("Error loading trails:", error));
