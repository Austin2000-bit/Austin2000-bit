const fs = require('fs');

// Read quotes from quotes.txt
const quotes = fs.readFileSync('quotes.txt', 'utf-8')
  .split('\n')
  .filter(Boolean);

// Pick a random quote
const quote = quotes[Math.floor(Math.random() * quotes.length)];

// Read README.md
let readme = fs.readFileSync('README.md', 'utf-8');

// Replace placeholders
readme = readme.replace(/<!--DAILY_QUOTE-->/, quote);
readme = readme.replace(
  /<!--LAST_UPDATED-->/,
  `Updated on: ${new Date().toISOString().replace('T', ' ').replace(/\..+/, '')} UTC`
);

// Write back
fs.writeFileSync('README.md', readme);
console.log('README updated successfully');
