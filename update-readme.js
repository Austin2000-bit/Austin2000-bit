const fs = require('fs');
const path = require('path');

// Paths
const readmePath = path.join(__dirname, 'README.md');
const quotesPath = path.join(__dirname, 'quotes.txt');

// Read quotes
let quotes = fs.readFileSync(quotesPath, 'utf-8')
  .split('\n')
  .map(q => q.trim())
  .filter(q => q.length > 0);

// Read current README
let readme = fs.readFileSync(readmePath, 'utf-8');

// Extract current quote
const quoteRegex = /<!--DAILY_QUOTE-->([\s\S]*?)\n/;
const match = readme.match(quoteRegex);
let currentQuote = match ? match[1].trim() : null;

// Filter out current quote so it's not repeated
let availableQuotes = quotes.filter(q => q !== currentQuote);
if (availableQuotes.length === 0) {
  availableQuotes = quotes; // if only one quote, allow it
}

// Pick random quote
const newQuote = availableQuotes[Math.floor(Math.random() * availableQuotes.length)];

// Replace DAILY_QUOTE placeholder
readme = readme.replace(/<!--DAILY_QUOTE-->[\s\S]*?\n/, `<!--DAILY_QUOTE-->${newQuote}\n`);

// Update last updated timestamp
const timestamp = new Date().toISOString().replace('T', ' ').split('.')[0] + ' UTC';
readme = readme.replace(/<!--LAST_UPDATED-->[\s\S]*?\n/, `<!--LAST_UPDATED-->Updated on: ${timestamp}\n`);

// Write back README
fs.writeFileSync(readmePath, readme, 'utf-8');
console.log(`Updated quote: "${newQuote}"`);
