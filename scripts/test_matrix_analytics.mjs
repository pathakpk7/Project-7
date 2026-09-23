import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const dataDir = path.join(rootDir, 'src', 'data');

const matches = JSON.parse(fs.readFileSync(path.join(dataDir, 'dhoni_matches.json'), 'utf8'));

function calculateStats(list) {
  let runs = 0, balls = 0, no = 0, hundreds = 0, fifties = 0, fours = 0, sixes = 0;
  let hsNum = 0, hsNO = false;
  const matchSet = new Set(list.map(m => m.match_id));

  for (const inn of list) {
    runs += inn.runs;
    balls += inn.balls;
    fours += inn.fours;
    sixes += inn.sixes;
    if (inn.not_out) no++;
    if (inn.runs >= 100) hundreds++;
    else if (inn.runs >= 50) fifties++;
    if (inn.runs > hsNum || (inn.runs === hsNum && inn.not_out)) {
      hsNum = inn.runs;
      hsNO = inn.not_out;
    }
  }

  const dismissals = list.length - no;
  const avg = dismissals > 0 ? (runs / dismissals).toFixed(2) : "—";
  const sr = balls > 0 ? ((runs / balls) * 100).toFixed(2) : "0.00";
  const hs = `${hsNum}${hsNO ? "*" : ""}`;

  return {
    matches: matchSet.size,
    innings: list.length,
    runs,
    average: avg,
    strike_rate: sr,
    highest_score: hs,
    hundreds,
    fifties,
    not_outs: no,
    fours,
    sixes
  };
}

console.log("=== ODI TEST ===");
const odiMatches = matches.filter(m => m.format === 'ODI');
console.log(calculateStats(odiMatches));

console.log("=== TEST MATCHES ===");
const testMatches = matches.filter(m => m.format === 'TEST');
console.log(calculateStats(testMatches));

console.log("=== T20I MATCHES ===");
const t20iMatches = matches.filter(m => m.format === 'T20I');
console.log(calculateStats(t20iMatches));

console.log("=== IPL MATCHES ===");
const iplMatches = matches.filter(m => m.format === 'IPL');
console.log(calculateStats(iplMatches));

console.log("=== OVERALL MATCHES ===");
console.log(calculateStats(matches));
