const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

// Function to download image from URL
async function downloadImage(imageUrl, imageName) {
  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    fs.writeFileSync(imageName, response.data);
    console.log(`Image downloaded: ${imageName}`);
    return imageName;
  } catch (error) {
    console.error("Error downloading image:", error);
  }
}

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

    $(".OfferTeaser").each(async (index, element) => {
      const trailInfo = {};
      trailInfo.name = $(element).find(".OfferTeaser--title").text().trim();
      trailInfo.location = $(element).find(".OfferTeaser--text").text().trim();
      trailInfo.duration = $(element)
        .find(".OfferTeaser--meta--data--value")
        .eq(0)
        .text()
        .trim();
      trailInfo.distance = $(element)
        .find(".OfferTeaser--meta--data--value")
        .eq(1)
        .text()
        .trim();
      // Add more trail information as needed

      // Download image and attach path to trail object
      const imageUrl = $(element).find(".OfferTeaser--image").attr("src");
      if (imageUrl) {
        const imageName = `${trailInfo.name
          .replace(/\s/g, "_")
          .toLowerCase()}.jpg`;
        const imagePath = await downloadImage(imageUrl, imageName);
        trailInfo.image = imagePath;
      }

      trails.push(trailInfo);
    });

    return trails;
  } catch (error) {
    console.error("Error:", error);
  }
}

// URL of the webpage containing trail information
const url =
  "https://www.myswitzerland.com/en-ch/experiences/summer-autumn/hiking/hiking-search/";

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
