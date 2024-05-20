document.querySelector("video").playbackRate = 0.8;

// Load trails from JSON file
fetch("trails.json")
  .then((response) => response.json())
  .then((trails) => {
    let allTrails = trails;

    function filterTrails() {
      const difficulty = document.getElementById("difficulty").value;
      const distance = parseFloat(document.getElementById("distance").value);
      const duration = parseFloat(document.getElementById("length").value);

      const filteredTrails = allTrails.filter((trail) => {
        const isDifficultyMatch =
          difficulty === "any" || trail.difficulty === difficulty;
        const isDistanceMatch = parseFloat(trail.distance) <= distance;
        const isDurationMatch = parseFloat(trail.duration) <= duration;
        return isDifficultyMatch && isDistanceMatch && isDurationMatch;
      });

      displayTrails(filteredTrails);
      displayTrailCount(filteredTrails.length);
    }

    function displayTrails(trails) {
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

        trailImage.addEventListener("click", () => {
          openTrailInfoWindow(trail);
        });

        trailElement.appendChild(trailImage);

        const trailInfo = document.createElement("p");
        trailInfo.innerHTML = `<strong>Location:</strong> ${trail.location}<br>
                              <strong>Duration:</strong> ${trail.duration}<br>
                              <strong>Distance:</strong> ${trail.distance}<br>
                              <strong>Difficulty:</strong> ${trail.difficulty}`;
        trailElement.appendChild(trailInfo);

        trailList.appendChild(trailElement);
      }
    }

    function openTrailInfoWindow(trail) {
      const trailData = encodeURIComponent(JSON.stringify(trail));
      window.open(`trail-info.html?data=${trailData}`, "_blank");
    }

    displayTrails(allTrails);

    document.getElementById("distance").addEventListener("input", function () {
      document.getElementById("distance-value").textContent =
        this.value + " km";
    });

    document.getElementById("length").addEventListener("input", function () {
      document.getElementById("length-value").textContent =
        this.value + " hours";
    });

    document
      .getElementById("apply-filters")
      .addEventListener("click", filterTrails);
    document.getElementById("show-all").addEventListener("click", () => {
      displayTrails(allTrails);
      displayTrailCount(allTrails.length);
    });

    function displayTrailCount(count) {
      const trailCount = document.getElementById("trail-count");
      trailCount.textContent = `(${count} trails found)`;
    }
  })
  .catch((error) => console.error("Error loading trails:", error));
