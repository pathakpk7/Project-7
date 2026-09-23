import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const dataDir = path.join(rootDir, 'src', 'data');

// Read existing matches
const existing = JSON.parse(fs.readFileSync(path.join(dataDir, 'dhoni_matches.json'), 'utf8'));

// Filter out any duplicate or synthetic IDs
const seen = new Map();
const cleaned = [];

for (const m of existing) {
  // normalize key
  const key = m.format === 'TEST' 
    ? `${m.date}_${m.opponent}_${m.innings_number}`
    : `${m.date}_${m.format}_${m.opponent}`;
  
  if (!seen.has(key)) {
    seen.set(key, true);
    cleaned.push(m);
  }
}

console.log(`Cleaned existing unique entries: ${cleaned.length}`);

// Check format totals in cleaned
function getTotals(list, fmt) {
  const subset = list.filter(m => m.format === fmt);
  let runs = 0, hundreds = 0, fifties = 0, no = 0, balls = 0, fours = 0, sixes = 0;
  for (const m of subset) {
    runs += m.runs;
    balls += m.balls;
    fours += m.fours;
    sixes += m.sixes;
    if (m.not_out) no++;
    if (m.runs >= 100) hundreds++;
    else if (m.runs >= 50) fifties++;
  }
  return { count: subset.length, runs, hundreds, fifties, not_outs: no, balls, fours, sixes };
}

console.log("Current ODI:", getTotals(cleaned, "ODI"));
console.log("Current TEST:", getTotals(cleaned, "TEST"));
console.log("Current T20I:", getTotals(cleaned, "T20I"));
console.log("Current IPL:", getTotals(cleaned, "IPL"));

// Save final reconciled dataset
fs.writeFileSync(path.join(dataDir, 'dhoni_matches.json'), JSON.stringify(cleaned, null, 2));
