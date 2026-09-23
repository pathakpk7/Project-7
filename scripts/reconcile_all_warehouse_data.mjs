import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const dataDir = path.join(rootDir, 'src', 'data');

// 1. FORMAT STATS
const formatStats = [
  {
    format: "TEST",
    matches: "90",
    innings: "144",
    runs: "4876",
    balls: "8249",
    dismissals: "128",
    not_outs: "16",
    average: "38.09",
    strike_rate: "59.11",
    fours: "544",
    sixes: "78",
    fifties: "33",
    hundreds: "6",
    highest_score: "224"
  },
  {
    format: "ODI",
    matches: "350",
    innings: "297",
    runs: "10773",
    balls: "12303",
    dismissals: "213",
    not_outs: "84",
    average: "50.58",
    strike_rate: "87.56",
    fours: "826",
    sixes: "229",
    fifties: "73",
    hundreds: "10",
    highest_score: "183*"
  },
  {
    format: "T20I",
    matches: "98",
    innings: "85",
    runs: "1617",
    balls: "1281",
    dismissals: "43",
    not_outs: "42",
    average: "37.60",
    strike_rate: "126.13",
    fours: "116",
    sixes: "52",
    fifties: "2",
    hundreds: "0",
    highest_score: "56"
  },
  {
    format: "IPL",
    matches: "264",
    innings: "229",
    runs: "5243",
    balls: "3819",
    dismissals: "134",
    not_outs: "95",
    average: "39.13",
    strike_rate: "137.29",
    fours: "363",
    sixes: "252",
    fifties: "24",
    hundreds: "0",
    highest_score: "84*"
  },
  {
    format: "ALL_INTERNATIONAL",
    matches: "538",
    innings: "526",
    runs: "17266",
    balls: "21833",
    dismissals: "384",
    not_outs: "142",
    average: "44.96",
    strike_rate: "79.08",
    fours: "1486",
    sixes: "359",
    fifties: "108",
    hundreds: "16",
    highest_score: "224"
  },
  {
    format: "OVERALL",
    matches: "802",
    innings: "755",
    runs: "22509",
    balls: "25652",
    dismissals: "518",
    not_outs: "237",
    average: "43.45",
    strike_rate: "87.75",
    fours: "1849",
    sixes: "611",
    fifties: "132",
    hundreds: "16",
    highest_score: "224"
  }
];

// 2. WICKETKEEPING STATS
const wicketkeepingStats = [
  {
    format: "TEST",
    matches: "90",
    catches: "256",
    stumpings: "38",
    run_outs: "12",
    total_dismissals: "294",
    dismissals_per_match: "3.27"
  },
  {
    format: "ODI",
    matches: "350",
    catches: "321",
    stumpings: "123",
    run_outs: "89",
    total_dismissals: "444",
    dismissals_per_match: "1.27"
  },
  {
    format: "T20I",
    matches: "98",
    catches: "57",
    stumpings: "34",
    run_outs: "23",
    total_dismissals: "91",
    dismissals_per_match: "0.93"
  },
  {
    format: "IPL",
    matches: "264",
    catches: "154",
    stumpings: "42",
    run_outs: "54",
    total_dismissals: "196",
    dismissals_per_match: "0.74"
  },
  {
    format: "ALL_INTERNATIONAL",
    matches: "538",
    catches: "634",
    stumpings: "195",
    run_outs: "124",
    total_dismissals: "829",
    dismissals_per_match: "1.54"
  },
  {
    format: "OVERALL",
    matches: "802",
    catches: "788",
    stumpings: "237",
    run_outs: "178",
    total_dismissals: "1025",
    dismissals_per_match: "1.28"
  }
];

// 3. CAPTAINCY STATS
const captaincyStats = [
  {
    team: "India",
    format: "TEST",
    matches_captained: "60",
    wins: "27",
    losses: "18",
    ties: "0",
    draws: "15",
    no_results: "0",
    win_percentage: "45.00%",
    toss_win_percentage: "43.33%"
  },
  {
    team: "India",
    format: "ODI",
    matches_captained: "200",
    wins: "110",
    losses: "74",
    ties: "5",
    draws: "0",
    no_results: "11",
    win_percentage: "59.52%",
    toss_win_percentage: "49.00%"
  },
  {
    team: "India",
    format: "T20I",
    matches_captained: "72",
    wins: "41",
    losses: "28",
    ties: "1",
    draws: "0",
    no_results: "2",
    win_percentage: "59.42%",
    toss_win_percentage: "50.00%"
  },
  {
    team: "India",
    format: "OVERALL",
    matches_captained: "332",
    wins: "178",
    losses: "120",
    ties: "6",
    draws: "15",
    no_results: "13",
    win_percentage: "59.52%",
    toss_win_percentage: "48.19%"
  },
  {
    team: "Chennai Super Kings",
    format: "IPL",
    matches_captained: "226",
    wins: "133",
    losses: "91",
    ties: "0",
    draws: "0",
    no_results: "2",
    win_percentage: "58.85%",
    toss_win_percentage: "54.42%"
  },
  {
    team: "Rising Pune Supergiant",
    format: "IPL",
    matches_captained: "14",
    wins: "5",
    losses: "9",
    ties: "0",
    draws: "0",
    no_results: "0",
    win_percentage: "35.71%",
    toss_win_percentage: "50.00%"
  },
  {
    team: "ALL_TEAMS",
    format: "IPL",
    matches_captained: "240",
    wins: "138",
    losses: "100",
    ties: "0",
    draws: "0",
    no_results: "2",
    win_percentage: "57.50%",
    toss_win_percentage: "54.17%"
  },
  {
    team: "ALL_TEAMS",
    format: "OVERALL",
    matches_captained: "572",
    wins: "316",
    losses: "220",
    ties: "6",
    draws: "15",
    no_results: "15",
    win_percentage: "58.68%",
    toss_win_percentage: "50.70%"
  }
];

// Write format_stats, wicketkeeping_stats, captaincy_stats
fs.writeFileSync(path.join(dataDir, 'format_stats.json'), JSON.stringify(formatStats, null, 2));
fs.writeFileSync(path.join(dataDir, 'wicketkeeping_stats.json'), JSON.stringify(wicketkeepingStats, null, 2));
fs.writeFileSync(path.join(dataDir, 'captaincy_stats.json'), JSON.stringify(captaincyStats, null, 2));

console.log('Successfully wrote format_stats.json, wicketkeeping_stats.json, captaincy_stats.json');
