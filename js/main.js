document.querySelector("video").playbackRate = 0.8;

// Load trails from JSON file
fetch("trails.json")
  .then((response) => response.json())
  .then((trails) => {
    let allTrails = trails;
    let currentPage = 1;
    const trailsPerPage = 12;
    let filteredTrails = allTrails;

    function filterTrails() {
      const difficulty = document.getElementById("difficulty").value;
      const distance = parseFloat(document.getElementById("distance").value);
      const duration = parseFloat(document.getElementById("length").value);

      filteredTrails = allTrails.filter((trail) => {
        const isDifficultyMatch =
          difficulty === "any" || trail.difficulty === difficulty;
        const isDistanceMatch = parseFloat(trail.distance) <= distance;
        const isDurationMatch = parseFloat(trail.duration) <= duration;
        return isDifficultyMatch && isDistanceMatch && isDurationMatch;
      });

      currentPage = 1;
      displayTrails();
      displayTrailCount(filteredTrails.length);
    }

    function displayTrails() {
      const trailList = document.getElementById("trail-list");
      trailList.innerHTML = "";

      const start = (currentPage - 1) * trailsPerPage;
      const end = start + trailsPerPage;
      const paginatedTrails = filteredTrails.slice(start, end);

      for (const trail of paginatedTrails) {
        const trailElement = document.createElement("section");
        trailElement.classList.add("trail");

        const trailName = document.createElement("h3");
        trailName.textContent = trail.name;
        trailElement.appendChild(trailName);

        const imgContainer = document.createElement("figure");

        const trailImage = document.createElement("img");
        trailImage.src = trail.image;
        trailImage.alt = trail.name;

        trailImage.addEventListener("click", () => {
          openTrailInfoWindow(trail);
        });
        imgContainer.appendChild(trailImage);
        trailElement.appendChild(imgContainer);

        const trailInfo = document.createElement("p");
        trailInfo.innerHTML = `<strong>Location:</strong> ${trail.location}<br>
                              <strong>Duration:</strong> ${trail.duration}<br>
                              <strong>Distance:</strong> ${trail.distance}<br>
                              <strong>Difficulty:</strong> ${trail.difficulty}`;
        trailElement.appendChild(trailInfo);

        trailList.appendChild(trailElement);
      }

      updatePagination();
      // Scroll to the trail list
      // trailList.scrollIntoView({ behavior: "smooth" });
    }

    function updatePagination() {
      const totalPages = Math.ceil(filteredTrails.length / trailsPerPage);
      document.getElementById(
        "pageInfo"
      ).textContent = `Page ${currentPage} of ${totalPages}`;
      document.getElementById("prevPage").disabled = currentPage === 1;
      document.getElementById("nextPage").disabled = currentPage === totalPages;
    }

    document.getElementById("prevPage").addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        displayTrails();
      }
    });

    document.getElementById("nextPage").addEventListener("click", () => {
      if (currentPage < Math.ceil(filteredTrails.length / trailsPerPage)) {
        currentPage++;
        displayTrails();
      }
    });

    document.getElementById("distance").addEventListener("input", function () {
      document.getElementById("distance-value").textContent =
        this.value + " km";
    });

    document.getElementById("length").addEventListener("input", function () {
      document.getElementById("length-value").textContent =
        this.value + " hours";
    });

    document.getElementById("apply-filters").addEventListener("click", () => {
      filterTrails();
      document
        .getElementById("trail-list")
        .scrollIntoView({ behavior: "smooth" });
    });

    document.getElementById("show-all").addEventListener("click", () => {
      filteredTrails = allTrails;
      currentPage = 1;
      displayTrails();
      displayTrailCount(allTrails.length);
      document
        .getElementById("trail-list")
        .scrollIntoView({ behavior: "smooth" });
    });

    function displayTrailCount(count) {
      const trailCount = document.getElementById("trail-count");
      trailCount.textContent = `(${count} trails found)`;
    }

    // Initial display
    displayTrails();

    // Initial call to set the correct position of the sliders
    document.getElementById("distance-value").textContent =
      document.getElementById("distance").value + " km";
    document.getElementById("length-value").textContent =
      document.getElementById("length").value + " hours";
  })
  .catch((error) => console.error("Error loading trails:", error));

function openTrailInfoWindow(trail) {
  const trailData = encodeURIComponent(JSON.stringify(trail));
  window.open(`trail-info.html?data=${trailData}`, "_blank");
}

function downloadPDF() {
  const link = document.createElement("a");
  link.href = "pdf/the hiking map.pdf";
  link.download = "pdf/the hiking map.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
