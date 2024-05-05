// Load trails from JSON file
fetch("trails.json")
  .then((response) => response.json())
  .then((trails) => {
    // Store trails data in a variable
    const allTrails = trails;

    // Function to filter trails based on user selections
    function filterTrails() {
      const difficulty = document.getElementById("difficulty").value;
      const distance = parseFloat(document.getElementById("distance").value);
      const length = parseFloat(document.getElementById("length").value);
      const attractions = Array.from(
        document.querySelectorAll(
          '#attractions-list input[type="checkbox"]:checked'
        )
      ).map((attraction) => attraction.value);

      const filteredTrails = allTrails.filter((trail) => {
        // Check difficulty if it's selected
        const isDifficultyMatch =
          difficulty === "any" || trail.difficulty === difficulty;

        // Check distance if it's selected
        const isDistanceMatch = trail.distance <= distance;

        // Check length if it's selected
        const isLengthMatch = trail.duration <= length;

        // Check attractions if they're selected
        const isAttractionsMatch =
          attractions.length === 0 ||
          attractions.every((attraction) =>
            trail.attractions.includes(attraction)
          );

        // Return true if all criteria match
        return (
          isDifficultyMatch &&
          isDistanceMatch &&
          isLengthMatch &&
          isAttractionsMatch
        );
      });

      // Display filtered trails on the webpage
      displayTrails(filteredTrails);
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

        const trailInfo = document.createElement("p");
        trailInfo.innerHTML = `<strong>Location:</strong> ${trail.location}<br>
                              <strong>Duration:</strong> ${trail.duration}<br>
                              <strong>Distance:</strong> ${trail.distance}`;
        trailElement.appendChild(trailInfo);

        trailList.appendChild(trailElement);
      });
    }

    // Initial display of all trails
    displayTrails(allTrails);

    // Update distance value display
    document.getElementById("distance").addEventListener("input", function () {
      document.getElementById("distance-value").textContent =
        this.value + " km";
    });

    // Update length value display
    document.getElementById("length").addEventListener("input", function () {
      document.getElementById("length-value").textContent =
        this.value + " hours";
    });

    // Add event listener to apply filters button
    document
      .getElementById("apply-filters")
      .addEventListener("click", filterTrails);
  })
  .catch((error) => console.error("Error loading trails:", error));

// function filterTrails() {
//   const difficulty = document.getElementById("difficulty").value;
//   const distance = parseFloat(document.getElementById("distance").value);
//   const length = parseFloat(document.getElementById("length").value);
//   const attractions = Array.from(
//     document.querySelectorAll(
//       '#attractions-list input[type="checkbox"]:checked'
//     )
//   ).map((attraction) => attraction.value);

//   const filteredTrails = trails.filter((trail) => {
//     // Check difficulty if it's selected
//     const isDifficultyMatch =
//       difficulty === "any" || trail.difficulty === difficulty;

//     // Check distance if it's selected
//     const isDistanceMatch = trail.distance <= distance;

//     // Check length if it's selected
//     const isLengthMatch = trail.length <= length;

//     // Check attractions if they're selected
//     const isAttractionsMatch =
//       attractions.length === 0 ||
//       attractions.every((attraction) => trail.attractions.includes(attraction));

//     // Return true if at least one criteria matches
//     return (
//       isDifficultyMatch &&
//       isDistanceMatch &&
//       isLengthMatch &&
//       isAttractionsMatch
//     );
//   });

//   displayTrails(filteredTrails);
// }

// function displayTrails(trails) {
//   const trailList = document.getElementById("trail-list");
//   trailList.innerHTML = "";

//   trails.forEach((trail) => {
//     const trailElement = document.createElement("div");
//     trailElement.classList.add("trail");

//     const trailName = document.createElement("h3");
//     trailName.textContent = trail.name;
//     trailElement.appendChild(trailName);

//     const trailInfo = document.createElement("p");
//     trailInfo.innerHTML = `<strong>Difficulty:</strong> ${trail.difficulty}<br>
//                               <strong>Distance:</strong> ${
//                                 trail.distance
//                               } km<br>
//                               <strong>Length:</strong> ${trail.length} hours<br>
//                               <strong>Elevation Gain:</strong> ${
//                                 trail.elevationGain
//                               } m<br>
//                               <strong>Attractions:</strong> ${trail.attractions.join(
//                                 ", "
//                               )}`;
//     trailElement.appendChild(trailInfo);

//     trailList.appendChild(trailElement);
//   });
// }

// // Initial display of all trails
// displayTrails(trails);

// // Update distance value display
// document.getElementById("distance").addEventListener("input", function () {
//   document.getElementById("distance-value").textContent = this.value + " km";
// });

// // Update length value display
// document.getElementById("length").addEventListener("input", function () {
//   document.getElementById("length-value").textContent = this.value + " hours";
// });
