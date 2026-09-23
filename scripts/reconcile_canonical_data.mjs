import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const dataDir = path.join(rootDir, 'src', 'data');

// ==========================================
// 1. CANONICAL FORMAT STATS
// ==========================================
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

// ==========================================
// 2. CANONICAL WICKETKEEPING STATS
// ==========================================
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

// ==========================================
// 3. CANONICAL CAPTAINCY STATS
// ==========================================
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

// ==========================================
// 4. CANONICAL ROLE COMPARISONS (1-4 vs 5-7)
// ==========================================
const roleComparison = [
  // ODI
  {
    format: "ODI",
    role_group: "POS_1_4",
    innings: "43",
    runs: "2146",
    dismissals: "34",
    not_outs: "9",
    average: "63.12",
    strike_rate: "95.23",
    hundreds: "4",
    fifties: "14",
    fours: "198",
    sixes: "49"
  },
  {
    format: "ODI",
    role_group: "POS_5_7",
    innings: "240",
    runs: "8358",
    dismissals: "164",
    not_outs: "76",
    average: "50.96",
    strike_rate: "85.87",
    hundreds: "6",
    fifties: "58",
    fours: "614",
    sixes: "178"
  },
  {
    format: "ODI",
    role_group: "TOP_ORDER_1_3",
    innings: "16",
    runs: "993",
    dismissals: "12",
    not_outs: "4",
    average: "82.75",
    strike_rate: "99.69",
    hundreds: "2",
    fifties: "6",
    fours: "98",
    sixes: "28"
  },
  {
    format: "ODI",
    role_group: "MIDDLE_ORDER_4_6",
    innings: "233",
    runs: "8542",
    dismissals: "168",
    not_outs: "65",
    average: "50.85",
    strike_rate: "86.12",
    hundreds: "7",
    fifties: "60",
    fours: "648",
    sixes: "182"
  },
  {
    format: "ODI",
    role_group: "LOWER_ORDER_7_11",
    innings: "37",
    runs: "1115",
    dismissals: "21",
    not_outs: "16",
    average: "53.10",
    strike_rate: "91.80",
    hundreds: "1",
    fifties: "7",
    fours: "80",
    sixes: "19"
  },

  // TEST
  {
    format: "TEST",
    role_group: "POS_1_4",
    innings: "2",
    runs: "105",
    dismissals: "1",
    not_outs: "1",
    average: "105.00",
    strike_rate: "72.41",
    hundreds: "0",
    fifties: "1",
    fours: "12",
    sixes: "2"
  },
  {
    format: "TEST",
    role_group: "POS_5_7",
    innings: "133",
    runs: "4199",
    dismissals: "119",
    not_outs: "14",
    average: "35.29",
    strike_rate: "57.82",
    hundreds: "6",
    fifties: "29",
    fours: "472",
    sixes: "70"
  },
  {
    format: "TEST",
    role_group: "TOP_ORDER_1_3",
    innings: "2",
    runs: "105",
    dismissals: "1",
    not_outs: "1",
    average: "105.00",
    strike_rate: "72.41",
    hundreds: "0",
    fifties: "1",
    fours: "12",
    sixes: "2"
  },
  {
    format: "TEST",
    role_group: "MIDDLE_ORDER_4_6",
    innings: "27",
    runs: "1208",
    dismissals: "23",
    not_outs: "4",
    average: "52.52",
    strike_rate: "60.36",
    hundreds: "1",
    fifties: "8",
    fours: "138",
    sixes: "18"
  },
  {
    format: "TEST",
    role_group: "LOWER_ORDER_7_11",
    innings: "115",
    runs: "3563",
    dismissals: "104",
    not_outs: "11",
    average: "34.26",
    strike_rate: "58.60",
    hundreds: "5",
    fifties: "24",
    fours: "394",
    sixes: "58"
  },

  // T20I
  {
    format: "T20I",
    role_group: "POS_1_4",
    innings: "17",
    runs: "378",
    dismissals: "10",
    not_outs: "7",
    average: "37.80",
    strike_rate: "144.27",
    hundreds: "0",
    fifties: "1",
    fours: "32",
    sixes: "14"
  },
  {
    format: "T20I",
    role_group: "POS_5_7",
    innings: "66",
    runs: "1206",
    dismissals: "33",
    not_outs: "33",
    average: "36.55",
    strike_rate: "121.57",
    hundreds: "0",
    fifties: "1",
    fours: "82",
    sixes: "37"
  },
  {
    format: "T20I",
    role_group: "TOP_ORDER_1_3",
    innings: "5",
    runs: "123",
    dismissals: "5",
    not_outs: "0",
    average: "24.60",
    strike_rate: "129.47",
    hundreds: "0",
    fifties: "0",
    fours: "10",
    sixes: "4"
  },
  {
    format: "T20I",
    role_group: "MIDDLE_ORDER_4_6",
    innings: "68",
    runs: "1329",
    dismissals: "35",
    not_outs: "33",
    average: "37.97",
    strike_rate: "124.79",
    hundreds: "0",
    fifties: "2",
    fours: "96",
    sixes: "44"
  },
  {
    format: "T20I",
    role_group: "LOWER_ORDER_7_11",
    innings: "12",
    runs: "165",
    dismissals: "3",
    not_outs: "9",
    average: "55.00",
    strike_rate: "140.00",
    hundreds: "0",
    fifties: "0",
    fours: "10",
    sixes: "4"
  },

  // IPL
  {
    format: "IPL",
    role_group: "POS_1_4",
    innings: "74",
    runs: "1756",
    dismissals: "49",
    not_outs: "25",
    average: "35.84",
    strike_rate: "136.50",
    hundreds: "0",
    fifties: "9",
    fours: "134",
    sixes: "68"
  },
  {
    format: "IPL",
    role_group: "POS_5_7",
    innings: "151",
    runs: "3416",
    dismissals: "86",
    not_outs: "65",
    average: "39.72",
    strike_rate: "138.40",
    hundreds: "0",
    fifties: "15",
    fours: "223",
    sixes: "178"
  },
  {
    format: "IPL",
    role_group: "TOP_ORDER_1_3",
    innings: "8",
    runs: "196",
    dismissals: "6",
    not_outs: "2",
    average: "32.67",
    strike_rate: "124.84",
    hundreds: "0",
    fifties: "1",
    fours: "18",
    sixes: "8"
  },
  {
    format: "IPL",
    role_group: "MIDDLE_ORDER_4_6",
    innings: "192",
    runs: "4532",
    dismissals: "116",
    not_outs: "76",
    average: "39.07",
    strike_rate: "137.80",
    hundreds: "0",
    fifties: "23",
    fours: "318",
    sixes: "228"
  },
  {
    format: "IPL",
    role_group: "LOWER_ORDER_7_11",
    innings: "42",
    runs: "711",
    dismissals: "20",
    not_outs: "22",
    average: "35.55",
    strike_rate: "139.14",
    hundreds: "0",
    fifties: "1",
    fours: "45",
    sixes: "24"
  },

  // ALL_INTERNATIONAL
  {
    format: "ALL_INTERNATIONAL",
    role_group: "POS_1_4",
    innings: "62",
    runs: "2629",
    dismissals: "45",
    not_outs: "17",
    average: "58.42",
    strike_rate: "97.80",
    hundreds: "4",
    fifties: "16",
    fours: "242",
    sixes: "65"
  },
  {
    format: "ALL_INTERNATIONAL",
    role_group: "POS_5_7",
    innings: "439",
    runs: "13763",
    dismissals: "316",
    not_outs: "123",
    average: "43.55",
    strike_rate: "76.40",
    hundreds: "12",
    fifties: "88",
    fours: "1168",
    sixes: "285"
  },
  {
    format: "ALL_INTERNATIONAL",
    role_group: "TOP_ORDER_1_3",
    innings: "23",
    runs: "1221",
    dismissals: "18",
    not_outs: "5",
    average: "67.83",
    strike_rate: "98.20",
    hundreds: "2",
    fifties: "7",
    fours: "120",
    sixes: "34"
  },
  {
    format: "ALL_INTERNATIONAL",
    role_group: "MIDDLE_ORDER_4_6",
    innings: "328",
    runs: "11079",
    dismissals: "226",
    not_outs: "102",
    average: "49.02",
    strike_rate: "83.60",
    hundreds: "8",
    fifties: "70",
    fours: "882",
    sixes: "244"
  },
  {
    format: "ALL_INTERNATIONAL",
    role_group: "LOWER_ORDER_7_11",
    innings: "164",
    runs: "4843",
    dismissals: "128",
    not_outs: "36",
    average: "37.84",
    strike_rate: "70.10",
    hundreds: "6",
    fifties: "31",
    fours: "484",
    sixes: "81"
  },

  // OVERALL
  {
    format: "OVERALL",
    role_group: "POS_1_4",
    innings: "136",
    runs: "4385",
    dismissals: "94",
    not_outs: "42",
    average: "46.65",
    strike_rate: "110.20",
    hundreds: "4",
    fifties: "25",
    fours: "376",
    sixes: "133"
  },
  {
    format: "OVERALL",
    role_group: "POS_5_7",
    innings: "590",
    runs: "17179",
    dismissals: "402",
    not_outs: "188",
    average: "42.73",
    strike_rate: "84.50",
    hundreds: "12",
    fifties: "103",
    fours: "1391",
    sixes: "463"
  },
  {
    format: "OVERALL",
    role_group: "TOP_ORDER_1_3",
    innings: "31",
    runs: "1417",
    dismissals: "24",
    not_outs: "7",
    average: "59.04",
    strike_rate: "101.40",
    hundreds: "2",
    fifties: "8",
    fours: "138",
    sixes: "42"
  },
  {
    format: "OVERALL",
    role_group: "MIDDLE_ORDER_4_6",
    innings: "520",
    runs: "15611",
    dismissals: "342",
    not_outs: "178",
    average: "45.65",
    strike_rate: "94.20",
    hundreds: "8",
    fifties: "93",
    fours: "1200",
    sixes: "472"
  },
  {
    format: "OVERALL",
    role_group: "LOWER_ORDER_7_11",
    innings: "206",
    runs: "5554",
    dismissals: "148",
    not_outs: "58",
    average: "37.53",
    strike_rate: "74.80",
    hundreds: "6",
    fifties: "32",
    fours: "529",
    sixes: "105"
  }
];

// Write format_stats.json, wicketkeeping_stats.json, captaincy_stats.json, role_comparison.json
fs.writeFileSync(path.join(dataDir, 'format_stats.json'), JSON.stringify(formatStats, null, 2));
fs.writeFileSync(path.join(dataDir, 'wicketkeeping_stats.json'), JSON.stringify(wicketkeepingStats, null, 2));
fs.writeFileSync(path.join(dataDir, 'captaincy_stats.json'), JSON.stringify(captaincyStats, null, 2));
fs.writeFileSync(path.join(dataDir, 'role_comparison.json'), JSON.stringify(roleComparison, null, 2));

console.log('Successfully updated canonical format_stats, wicketkeeping_stats, captaincy_stats, and role_comparison.');
