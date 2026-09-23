import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const dataDir = path.join(rootDir, 'src', 'data');

const matches = JSON.parse(fs.readFileSync(path.join(dataDir, 'dhoni_matches.json'), 'utf8'));

// Helper to compute batting stats
function aggregate(inningsList) {
  let runs = 0, balls = 0, fours = 0, sixes = 0, no = 0, hundreds = 0, fifties = 0, hsNum = 0, hsIsNO = false;
  const matchSet = new Set();
  
  for (const inn of inningsList) {
    matchSet.add(inn.match_id);
    runs += inn.runs;
    balls += inn.balls;
    fours += inn.fours;
    sixes += inn.sixes;
    if (inn.not_out) no++;
    if (inn.runs >= 100) hundreds++;
    else if (inn.runs >= 50) fifties++;
    if (inn.runs > hsNum || (inn.runs === hsNum && inn.not_out)) {
      hsNum = inn.runs;
      hsIsNO = inn.not_out;
    }
  }

  const inns = inningsList.length;
  const dismissals = inns - no;
  const avg = dismissals > 0 ? (runs / dismissals).toFixed(2) : (inns > 0 ? "—" : "0.00");
  const sr = balls > 0 ? ((runs / balls) * 100).toFixed(2) : (runs > 0 ? "100.00" : "0.00");
  const hs = hsNum > 0 || inns > 0 ? `${hsNum}${hsIsNO ? "*" : ""}` : "0";

  return {
    matches: matchSet.size,
    innings: inns,
    runs,
    balls,
    dismissals,
    not_outs: no,
    average: avg,
    strike_rate: sr,
    fours,
    sixes,
    hundreds,
    fifties,
    highest_score: hs
  };
}

// ==========================================
// 1. POSITION STATS
// ==========================================
const positionStats = [];
const positionFormatStats = [];
const formats = ["TEST", "ODI", "T20I", "IPL", "ALL_INTERNATIONAL", "OVERALL"];

for (const fmt of formats) {
  let subset = matches;
  if (fmt === "ALL_INTERNATIONAL") subset = matches.filter(m => m.format !== "IPL");
  else if (fmt !== "OVERALL") subset = matches.filter(m => m.format === fmt);

  const byPos = {};
  for (const m of subset) {
    const pos = m.batting_position || 7;
    if (!byPos[pos]) byPos[pos] = [];
    byPos[pos].push(m);
  }

  for (const pos of Object.keys(byPos).sort((a, b) => Number(a) - Number(b))) {
    const stats = aggregate(byPos[pos]);
    positionStats.push({
      format: fmt,
      batting_position: String(pos),
      innings: String(stats.innings),
      runs: String(stats.runs),
      balls_faced: String(stats.balls),
      dismissals: String(stats.dismissals),
      not_outs: String(stats.not_outs),
      average: stats.average,
      strike_rate: stats.strike_rate,
      fours: String(stats.fours),
      sixes: String(stats.sixes),
      fifties: String(stats.fifties),
      hundreds: String(stats.hundreds),
      highest_score: stats.highest_score
    });

    positionFormatStats.push({
      format: fmt,
      position: String(pos),
      innings: String(stats.innings),
      runs: String(stats.runs),
      dismissals: String(stats.dismissals),
      average: stats.average,
      strike_rate: stats.strike_rate
    });
  }
}

// ==========================================
// 2. ROLE COMPARISONS (1-4 vs 5-7, Top, Mid, Low)
// ==========================================
const roleComparison = [];

for (const fmt of formats) {
  let subset = matches;
  if (fmt === "ALL_INTERNATIONAL") subset = matches.filter(m => m.format !== "IPL");
  else if (fmt !== "OVERALL") subset = matches.filter(m => m.format === fmt);

  const pos1_4 = subset.filter(m => (m.batting_position || 7) <= 4);
  const pos5_7 = subset.filter(m => (m.batting_position || 7) >= 5 && (m.batting_position || 7) <= 7);
  const topOrder = subset.filter(m => (m.batting_position || 7) <= 3);
  const midOrder = subset.filter(m => (m.batting_position || 7) >= 4 && (m.batting_position || 7) <= 6);
  const lowOrder = subset.filter(m => (m.batting_position || 7) >= 7);

  const groups = [
    { key: "POS_1_4", list: pos1_4 },
    { key: "POS_5_7", list: pos5_7 },
    { key: "TOP_ORDER_1_3", list: topOrder },
    { key: "MIDDLE_ORDER_4_6", list: midOrder },
    { key: "LOWER_ORDER_7_11", list: lowOrder }
  ];

  for (const g of groups) {
    const stats = aggregate(g.list);
    roleComparison.push({
      format: fmt,
      role_group: g.key,
      innings: String(stats.innings),
      runs: String(stats.runs),
      dismissals: String(stats.dismissals),
      not_outs: String(stats.not_outs),
      average: stats.average,
      strike_rate: stats.strike_rate,
      hundreds: String(stats.hundreds),
      fifties: String(stats.fifties),
      fours: String(stats.fours),
      sixes: String(stats.sixes)
    });
  }
}

// Save derived files
fs.writeFileSync(path.join(dataDir, 'position_stats.json'), JSON.stringify(positionStats, null, 2));
fs.writeFileSync(path.join(dataDir, 'position_format_stats.json'), JSON.stringify(positionFormatStats, null, 2));
fs.writeFileSync(path.join(dataDir, 'role_comparison.json'), JSON.stringify(roleComparison, null, 2));

console.log("Successfully recomputed position_stats, position_format_stats, and role_comparison.");
