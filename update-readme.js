const fs = require("fs");
const path = "./quotes.txt";
const readmePath = "./README.md";

// Read quotes
const quotes = fs.readFileSync(path, "utf-8")
  .split("\n")
  .filter(Boolean);

// Pick random quote
const quote = quotes[Math.floor(Math.random() * quotes.length)];

// Read README
let readme = fs.readFileSync(readmePath, "utf-8");

// Replace placeholders
readme = readme.replace(/<!--DAILY_QUOTE-->/, quote);
readme = readme.replace(
  /<!--LAST_UPDATED-->/,
  `Updated on: ${new Date().toISOString().replace("T", " ").split(".")[0]} UTC`
);

// Write back
fs.writeFileSync(readmePath, readme);
console.log("README updated successfully");
