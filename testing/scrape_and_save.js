const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

// Function to scrape trail information from a webpage
async function scrapeTrailInfo(url) {
  try {
    // Fetch webpage HTML content
    const response = await axios.get(url);
    const html = response.data;

    // Load HTML content into Cheerio
    const $ = cheerio.load(html);

    // Extract trail information
    const trails = [];

    // Iterate over each trail tile
    $(".tile").each((index, element) => {
      const trailInfo = {};

      // Extract trail name
      trailInfo.name = $(element).find(".tile__title strong").text().trim();

      // Extract trail location
      trailInfo.location = $(element).find(".tile__location").text().trim();

      // Extract trail duration
      trailInfo.duration = $(element).find(".tile__duration").text().trim();

      // Extract trail difficulty
      trailInfo.difficulty = $(element).find(".tile__difficulty").text().trim();

      // Extract trail distance
      trailInfo.distance = $(element).find(".tile__length").text().trim();

      // Extract trail image URL
      trailInfo.image = $(element).find(".tile__background img").attr("src");

      // Push trail information to trails array
      trails.push(trailInfo);
    });

    return trails;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

// URL of the webpage containing trail information
const url = "https://www.valais.ch/en/explore/activities/hiking/hikes?page=4";

// Scrape trail information from the webpage
scrapeTrailInfo(url)
  .then((trails) => {
    // Convert data to JSON string
    const jsonData = JSON.stringify(trails, null, 2); // 2-space indentation for readability

    // Write JSON data to a file
    fs.writeFile("trail_data.json", jsonData, (err) => {
      if (err) {
        console.error("Error writing JSON file:", err);
      } else {
        console.log("JSON file saved successfully!");
      }
    });
  })
  .catch((error) => console.error("Error:", error));
