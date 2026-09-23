import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const dataDir = path.join(rootDir, 'src', 'data');
const processedDir = path.join(rootDir, 'data', 'processed');

const matches = JSON.parse(fs.readFileSync(path.join(dataDir, 'dhoni_matches.json'), 'utf8'));

// Read wicketkeeping csv if available
const csvPath = path.join(processedDir, 'dhoni_wicketkeeping.csv');
const wkMapByDate = new Map();
const wkMapById = new Map();

if (fs.existsSync(csvPath)) {
  const content = fs.readFileSync(csvPath, 'utf8');
  const lines = content.split('\n').filter(l => l.trim().length > 0);
  const header = lines[0].split(',');
  
  for (let i = 1; i < lines.length; i++) {
    const parts = lines[i].split(',');
    const matchId = parts[0];
    const date = parts[1];
    const fmt = parts[3];
    const catches = parseInt(parts[8], 10) || 0;
    const stumpings = parseInt(parts[9], 10) || 0;
    const runOuts = parseInt(parts[10], 10) || 0;
    const totalDismissals = parseInt(parts[11], 10) || (catches + stumpings);
    
    wkMapById.set(matchId, { catches, stumpings, runOuts, totalDismissals });
    wkMapByDate.set(`${date}_${fmt}`, { catches, stumpings, runOuts, totalDismissals });
  }
}

let totalCatches = 0;
let totalStumpings = 0;

for (const m of matches) {
  let wk = wkMapById.get(m.match_id) || wkMapByDate.get(`${m.date}_${m.format}`);
  if (wk) {
    m.catches = wk.catches;
    m.stumpings = wk.stumpings;
    m.dismissals_wk = wk.totalDismissals;
  } else {
    m.catches = 0;
    m.stumpings = 0;
    m.dismissals_wk = 0;
  }
  totalCatches += m.catches;
  totalStumpings += m.stumpings;
}

console.log(`Enriched ${matches.length} matches with wicketkeeping data.`);
console.log(`Accumulated Catches: ${totalCatches}, Stumpings: ${totalStumpings}, Total WK Dismissals: ${totalCatches + totalStumpings}`);

fs.writeFileSync(path.join(dataDir, 'dhoni_matches.json'), JSON.stringify(matches, null, 2));
