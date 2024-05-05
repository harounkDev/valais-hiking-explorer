const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");

async function scrapeHikingTrails(url, jsonData) {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const hikingTrails = [];

    $(".tile").each((index, element) => {
      const name = $(element).find(".tile__title strong").text().trim();
      const location = $(element).find(".tile__location").text().trim();
      const duration = $(element).find(".tile__duration").text().trim();
      const difficulty = $(element).find(".tile__difficulty").text().trim();
      const distance = $(element).find(".tile__length").text().trim();
      const image = $(element).find(".tile__background img").attr("src");

      hikingTrails.push({
        name,
        location,
        duration,
        difficulty,
        distance,
        image,
      });
    });

    // Merge with data from the JSON file
    hikingTrails.forEach((trail, index) => {
      const jsonDataTrail = jsonData[index];
      if (jsonDataTrail) {
        hikingTrails[index] = { ...trail, ...jsonDataTrail };
      }
    });

    return hikingTrails;
  } catch (error) {
    console.error("Error fetching and parsing data:", error);
  }
}

// Usage
const url = "https://www.valais.ch/en/explore/activities/hiking/hikes";
const jsonData = [
  {
    name: "Tour of the Val d’Anniviers: Grimentz – Vercorin (stage 4)",
    location: "Grimentz",
    duration: "4:30 h",
    difficulty: "Intermediate",
    distance: "12.93 km",
    image: "https://img.oastatic.com/img2/27579387/2048x2048/.jpg",
  },
  // Include other JSON data here...
];

scrapeHikingTrails(url, jsonData)
  .then((hikingTrails) => {
    console.log(hikingTrails);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
