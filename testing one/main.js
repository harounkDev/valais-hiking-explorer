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
    function displayTrails(trails) {
      const trailList = document.getElementById("trail-list");
      trailList.innerHTML = "";

      trails.forEach((trail) => {
        const trailElement = document.createElement("div");
        trailElement.classList.add("trail");

        const trailName = document.createElement("h3");
        trailName.textContent = trail.name;
        trailElement.appendChild(trailName);

        const trailImage = document.createElement("img");
        trailImage.src = trail.image;
        trailImage.alt = trail.name;
        trailElement.appendChild(trailImage);

        const trailInfo = document.createElement("p");
        trailInfo.innerHTML = `<strong>Location:</strong> ${trail.location}<br>
                              <strong>Duration:</strong> ${trail.duration}<br>
                              <strong>Distance:</strong> ${trail.distance}<br>
                              <strong>Difficulty:</strong> ${trail.difficulty}`;
        trailElement.appendChild(trailInfo);

        trailList.appendChild(trailElement);
      });
    }

    // Initial display of all trails
    displayTrails(allTrails);
    function showAllTrails() {
      displayTrails(allTrails);
      displayTrailCount(allTrails.length);
    }
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
    document
      .getElementById("show-all")
      .addEventListener("click", showAllTrails);

    function displayTrailCount(count) {
      const trailCount = document.getElementById("trail-count");

      trailCount.textContent = `(${count} trails found)`;
    }
  })
  .catch((error) => console.error("Error loading trails:", error));

//SToped to make the filtered count showing
