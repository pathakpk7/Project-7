import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const masterInningsPath = path.join(rootDir, 'src', 'data', 'master_innings.json');
const venueStatsPath = path.join(rootDir, 'src', 'data', 'venue_stats.json');
const opponentStatsPath = path.join(rootDir, 'src', 'data', 'opponent_stats.json');
const homeAwayStatsPath = path.join(rootDir, 'src', 'data', 'home_away_stats.json');
const yearlyStatsPath = path.join(rootDir, 'src', 'data', 'yearly_stats.json');
const tournamentStatsPath = path.join(rootDir, 'src', 'data', 'tournament_stats.json');

const masterInnings = JSON.parse(fs.readFileSync(masterInningsPath, 'utf8'));

// Venue Normalization Map
const VENUE_NORMALIZATION = {
  "MA Chidambaram Stadium, Chepauk": "MA Chidambaram Stadium",
  "MA Chidambaram Stadium, Chepauk, Chennai": "MA Chidambaram Stadium",
  "MA Chidambaram Stadium": "MA Chidambaram Stadium",
  "M.Chinnaswamy Stadium": "M Chinnaswamy Stadium",
  "M Chinnaswamy Stadium": "M Chinnaswamy Stadium",
  "M Chinnaswamy Stadium, Bengaluru": "M Chinnaswamy Stadium",
  "Wankhede Stadium, Mumbai": "Wankhede Stadium",
  "Wankhede Stadium": "Wankhede Stadium",
  "Eden Gardens, Kolkata": "Eden Gardens",
  "Eden Gardens": "Eden Gardens",
  "Feroz Shah Kotla": "Arun Jaitley Stadium (Feroz Shah Kotla)",
  "Arun Jaitley Stadium": "Arun Jaitley Stadium (Feroz Shah Kotla)",
  "Arun Jaitley Stadium, Delhi": "Arun Jaitley Stadium (Feroz Shah Kotla)",
  "Sawai Mansingh Stadium, Jaipur": "Sawai Mansingh Stadium",
  "Sawai Mansingh Stadium": "Sawai Mansingh Stadium",
  "Rajiv Gandhi International Stadium, Uppal": "Rajiv Gandhi International Stadium",
  "Rajiv Gandhi International Stadium": "Rajiv Gandhi International Stadium",
  "Rajiv Gandhi International Stadium, Uppal, Hyderabad": "Rajiv Gandhi International Stadium",
  "Maharashtra Cricket Association Stadium": "MCA Stadium, Pune",
  "Maharashtra Cricket Association Stadium, Pune": "MCA Stadium, Pune",
  "Subrata Roy Sahara Stadium": "MCA Stadium, Pune",
  "Punjab Cricket Association Stadium, Mohali": "IS Bindra Stadium, Mohali",
  "Punjab Cricket Association IS Bindra Stadium, Mohali": "IS Bindra Stadium, Mohali",
  "Punjab Cricket Association IS Bindra Stadium": "IS Bindra Stadium, Mohali",
  "Sardar Patel Stadium, Motera": "Narendra Modi Stadium, Ahmedabad",
  "Narendra Modi Stadium, Ahmedabad": "Narendra Modi Stadium, Ahmedabad",
  "Narendra Modi Stadium": "Narendra Modi Stadium, Ahmedabad",
  "Himachal Pradesh Cricket Association Stadium": "HPCA Stadium, Dharamsala",
  "Himachal Pradesh Cricket Association Stadium, Dharamsala": "HPCA Stadium, Dharamsala",
  "Dr. Y.S. Rajasekhara Reddy ACA-VDCA Cricket Stadium": "ACA-VDCA Stadium, Visakhapatnam",
  "Dr. Y.S. Rajasekhara Reddy ACA-VDCA Cricket Stadium, Visakhapatnam": "ACA-VDCA Stadium, Visakhapatnam",
  "ACA-VDCA Stadium": "ACA-VDCA Stadium, Visakhapatnam",
  "Barabati Stadium": "Barabati Stadium, Cuttack",
  "Barabati Stadium, Cuttack": "Barabati Stadium, Cuttack",
  "Vidarbha Cricket Association Stadium, Jamtha": "VCA Stadium, Nagpur",
  "Vidarbha Cricket Association Ground": "VCA Stadium, Nagpur",
  "Brabourne Stadium, Mumbai": "Brabourne Stadium, Mumbai",
  "Brabourne Stadium": "Brabourne Stadium, Mumbai",
  "Green Park": "Green Park, Kanpur",
  "Holkar Cricket Stadium": "Holkar Cricket Stadium, Indore",
  "JSCA International Stadium Complex": "JSCA International Stadium, Ranchi",
  "JSCA International Stadium Complex, Ranchi": "JSCA International Stadium, Ranchi",
  "Saurashtra Cricket Association Stadium": "SCA Stadium, Rajkot",
  "Madhavrao Scindia Cricket Ground": "SCA Stadium, Rajkot",
  "Dubai International Cricket Stadium": "Dubai International Cricket Stadium",
  "Sharjah Cricket Stadium": "Sharjah Cricket Stadium",
  "Zayed Cricket Stadium, Abu Dhabi": "Sheikh Zayed Stadium, Abu Dhabi",
  "Sheikh Zayed Stadium": "Sheikh Zayed Stadium, Abu Dhabi",
  "Lord's, London": "Lord's",
  "Lord's": "Lord's",
  "Kennington Oval": "The Oval, London",
  "The Oval": "The Oval, London",
  "Kennington Oval, London": "The Oval, London",
  "Edgbaston, Birmingham": "Edgbaston",
  "Edgbaston": "Edgbaston",
  "Trent Bridge, Nottingham": "Trent Bridge",
  "Trent Bridge": "Trent Bridge",
  "Headingley, Leeds": "Headingley",
  "Headingley": "Headingley",
  "Old Trafford, Manchester": "Old Trafford",
  "Old Trafford": "Old Trafford",
  "Melbourne Cricket Ground": "Melbourne Cricket Ground (MCG)",
  "Sydney Cricket Ground": "Sydney Cricket Ground (SCG)",
  "Adelaide Oval": "Adelaide Oval",
  "Brisbane Cricket Ground, Woolloongabba": "The Gabba, Brisbane",
  "Brisbane Cricket Ground, Woolloongabba, Brisbane": "The Gabba, Brisbane",
  "Western Australia Cricket Association Ground": "WACA Ground, Perth",
  "W.A.C.A. Ground": "WACA Ground, Perth",
  "Perth Stadium": "Optus Stadium, Perth",
  "SuperSport Park, Centurion": "SuperSport Park, Centurion",
  "SuperSport Park": "SuperSport Park, Centurion",
  "New Wanderers Stadium": "The Wanderers Stadium, Johannesburg",
  "Wanderers Stadium": "The Wanderers Stadium, Johannesburg",
  "Newlands": "Newlands, Cape Town",
  "Newlands, Cape Town": "Newlands, Cape Town",
  "Kingsmead, Durban": "Kingsmead, Durban",
  "Kingsmead": "Kingsmead, Durban",
  "St George's Park": "St George's Park, Gqeberha",
  "R Premadasa Stadium": "R Premadasa Stadium, Colombo",
  "R Premadasa Stadium, Colombo": "R Premadasa Stadium, Colombo",
  "Sinhalese Sports Club Ground": "SSC Ground, Colombo",
  "Pallekele International Cricket Stadium": "Pallekele International Stadium",
  "Rangiri Dambulla International Stadium": "Rangiri Dambulla Stadium",
  "Shere Bangla National Stadium": "Shere Bangla National Stadium, Mirpur",
  "Shere Bangla National Stadium, Mirpur": "Shere Bangla National Stadium, Mirpur",
  "Eden Park, Auckland": "Eden Park, Auckland",
  "Seddon Park, Hamilton": "Seddon Park, Hamilton",
  "McLean Park, Napier": "McLean Park, Napier",
  "Westpac Stadium": "Sky Stadium (Westpac), Wellington",
  "Basin Reserve": "Basin Reserve, Wellington",
  "Queen's Park Oval, Port of Spain": "Queen's Park Oval, Trinidad",
  "Queen's Park Oval, Port of Spain, Trinidad": "Queen's Park Oval, Trinidad",
  "Beausejour Stadium, Gros Islet": "Daren Sammy Stadium, St Lucia",
  "Sabina Park, Kingston, Jamaica": "Sabina Park, Jamaica",
  "Kensington Oval, Bridgetown, Barbados": "Kensington Oval, Barbados",
  "Providence Stadium, Guyana": "Providence Stadium, Guyana",
  "Gaddafi Stadium, Lahore": "Gaddafi Stadium, Lahore",
  "National Stadium, Karachi": "National Stadium, Karachi",
  "Iqbal Stadium, Faisalabad": "Iqbal Stadium, Faisalabad",
  "Harare Sports Club": "Harare Sports Club, Zimbabwe",
  "Queens Sports Club, Bulawayo": "Queens Sports Club, Bulawayo"
};

// Opponent Normalization Map
const OPPONENT_NORMALIZATION = {
  "Royal Challengers Bangalore": "Royal Challengers Bengaluru",
  "Royal Challengers Bengaluru": "Royal Challengers Bengaluru",
  "Kings XI Punjab": "Punjab Kings",
  "Punjab Kings": "Punjab Kings",
  "Delhi Daredevils": "Delhi Capitals",
  "Delhi Capitals": "Delhi Capitals",
  "Deccan Chargers": "Sunrisers Hyderabad / Deccan",
  "Sunrisers Hyderabad": "Sunrisers Hyderabad",
  "Mumbai Indians": "Mumbai Indians",
  "Kolkata Knight Riders": "Kolkata Knight Riders",
  "Rajasthan Royals": "Rajasthan Royals",
  "Gujarat Titans": "Gujarat Titans",
  "Lucknow Super Giants": "Lucknow Super Giants",
  "Rising Pune Supergiant": "Rising Pune Supergiant",
  "Rising Pune Supergiants": "Rising Pune Supergiant",
  "Pune Warriors": "Pune Warriors India",
  "Gujarat Lions": "Gujarat Lions",
  "Kochi Tuskers Kerala": "Kochi Tuskers Kerala",
  "Australia": "Australia",
  "England": "England",
  "Pakistan": "Pakistan",
  "Sri Lanka": "Sri Lanka",
  "South Africa": "South Africa",
  "New Zealand": "New Zealand",
  "West Indies": "West Indies",
  "Bangladesh": "Bangladesh",
  "Zimbabwe": "Zimbabwe",
  "Afghanistan": "Afghanistan",
  "Ireland": "Ireland",
  "Netherlands": "Netherlands",
  "Hong Kong": "Hong Kong",
  "United Arab Emirates": "United Arab Emirates",
  "Scotland": "Scotland",
  "Bermuda": "Bermuda",
  "Kenya": "Kenya"
};

// Country deduction by venue/city
function resolveCountry(venueName, cityName, existingCountry) {
  if (existingCountry && existingCountry !== "Unknown" && existingCountry !== "") {
    return existingCountry;
  }
  const v = (venueName || '').toLowerCase();
  const c = (cityName || '').toLowerCase();
  if (v.includes('chennai') || v.includes('mumbai') || v.includes('kolkata') || v.includes('delhi') || v.includes('bangalore') || v.includes('bengaluru') || v.includes('jaipur') || v.includes('hyderabad') || v.includes('pune') || v.includes('ahmedabad') || v.includes('mohali') || v.includes('dharamsala') || v.includes('visakhapatnam') || v.includes('cuttack') || v.includes('nagpur') || v.includes('kanpur') || v.includes('indore') || v.includes('ranchi') || v.includes('rajkot') || v.includes('guwahati') || v.includes('kochi') || v.includes('vadodara') || v.includes('gwalior') || v.includes('chattogram')) {
    if (v.includes('chattogram') || c.includes('chattogram')) return 'Bangladesh';
    return 'India';
  }
  if (v.includes('lord') || v.includes('oval') || v.includes('edgbaston') || v.includes('trent bridge') || v.includes('headingley') || v.includes('old trafford') || v.includes('birmingham') || v.includes('cardiff') || v.includes('southampton') || v.includes('bristol') || v.includes('chester-le-street')) return 'England';
  if (v.includes('melbourne') || v.includes('sydney') || v.includes('adelaide') || v.includes('brisbane') || v.includes('perth') || v.includes('hobart') || v.includes('canberra')) return 'Australia';
  if (v.includes('johannesburg') || v.includes('centurion') || v.includes('cape town') || v.includes('durban') || v.includes('gqeberha') || v.includes('port elizabeth') || v.includes('bloemfontein')) return 'South Africa';
  if (v.includes('colombo') || v.includes('kandy') || v.includes('dambulla') || v.includes('pallekele') || v.includes('galle')) return 'Sri Lanka';
  if (v.includes('auckland') || v.includes('hamilton') || v.includes('wellington') || v.includes('napier') || v.includes('christchurch') || v.includes('dunedin')) return 'New Zealand';
  if (v.includes('mirpur') || v.includes('dhaka') || v.includes('chittagong') || v.includes('chattogram') || v.includes('sylhet') || v.includes('fatullah')) return 'Bangladesh';
  if (v.includes('trinidad') || v.includes('kingston') || v.includes('jamaica') || v.includes('barbados') || v.includes('guyana') || v.includes('antigua') || v.includes('st lucia') || v.includes('st kitts')) return 'West Indies';
  if (v.includes('dubai') || v.includes('sharjah') || v.includes('abu dhabi')) return 'United Arab Emirates';
  if (v.includes('lahore') || v.includes('karachi') || v.includes('faisalabad') || v.includes('rawalpindi') || v.includes('multan')) return 'Pakistan';
  if (v.includes('harare') || v.includes('bulawayo')) return 'Zimbabwe';
  if (v.includes('dublin') || v.includes('belfast') || v.includes('malahide')) return 'Ireland';
  return 'India';
}

// Build Canonical Matches Array
const canonicalMatches = masterInnings.map((inn, idx) => {
  const normVenue = VENUE_NORMALIZATION[inn.venue] || inn.venue;
  const normOpponent = OPPONENT_NORMALIZATION[inn.opponent] || inn.opponent;
  const country = resolveCountry(normVenue, inn.city, inn.country);
  
  // Clean numbers
  const runs = Number(inn.runs) || 0;
  const balls = Number(inn.balls_faced) || 0;
  const fours = Number(inn.fours) || 0;
  const sixes = Number(inn.sixes) || 0;
  const notOut = inn.not_out === "True" || inn.not_out === true || inn.dismissed === "False" || inn.dismissed === false;
  const dismissed = !notOut;
  const sr = balls > 0 ? Number(((runs / balls) * 100).toFixed(2)) : (runs > 0 ? 100.0 : 0.0);
  
  // Opponent code
  let opponentCode = normOpponent.substring(0, 3).toUpperCase();
  if (normOpponent === "Royal Challengers Bengaluru") opponentCode = "RCB";
  else if (normOpponent === "Mumbai Indians") opponentCode = "MI";
  else if (normOpponent === "Chennai Super Kings") opponentCode = "CSK";
  else if (normOpponent === "Kolkata Knight Riders") opponentCode = "KKR";
  else if (normOpponent === "Punjab Kings") opponentCode = "PBKS";
  else if (normOpponent === "Delhi Capitals") opponentCode = "DC";
  else if (normOpponent === "Rajasthan Royals") opponentCode = "RR";
  else if (normOpponent === "Sunrisers Hyderabad") opponentCode = "SRH";
  else if (normOpponent === "Gujarat Titans") opponentCode = "GT";
  else if (normOpponent === "Lucknow Super Giants") opponentCode = "LSG";
  else if (normOpponent === "Australia") opponentCode = "AUS";
  else if (normOpponent === "England") opponentCode = "ENG";
  else if (normOpponent === "Pakistan") opponentCode = "PAK";
  else if (normOpponent === "Sri Lanka") opponentCode = "SL";
  else if (normOpponent === "South Africa") opponentCode = "SA";
  else if (normOpponent === "New Zealand") opponentCode = "NZ";
  else if (normOpponent === "West Indies") opponentCode = "WI";
  else if (normOpponent === "Bangladesh") opponentCode = "BAN";

  return {
    match_id: inn.match_id || `match_${idx + 1}`,
    innings_id: inn.innings_id || `${inn.match_id || idx + 1}_1`,
    date: inn.date,
    year: Number(inn.year) || Number(inn.date.substring(0, 4)),
    month: Number(inn.month) || (inn.date ? Number(inn.date.substring(5, 7)) : 1),
    format: inn.format,
    competition: inn.competition || (inn.format === "IPL" ? "Indian Premier League" : "International Series"),
    season: inn.season || `${inn.year}`,
    team: inn.team || (inn.format === "IPL" ? "Chennai Super Kings" : "India"),
    opponent: normOpponent,
    opponent_code: opponentCode,
    venue: normVenue,
    city: inn.city || "",
    country: country,
    location_type: inn.home_away || (country === "India" ? "HOME" : "AWAY"),
    innings_number: Number(inn.innings_number) || 1,
    batting_position: Number(inn.batting_position) || 0,
    runs: runs,
    balls: balls,
    fours: fours,
    sixes: sixes,
    strike_rate: sr,
    dismissed: dismissed,
    not_out: notOut,
    dismissal_type: inn.dismissal_type || "",
    bowler: inn.bowler || "",
    captain: inn.captain === "True" || inn.captain === true,
    chasing: inn.chasing === "True" || inn.chasing === true,
    result: inn.result || "WON"
  };
});

console.log(`Generated ${canonicalMatches.length} canonical match records.`);

// Write canonical matches
fs.writeFileSync(
  path.join(rootDir, 'src', 'data', 'dhoni_matches.json'),
  JSON.stringify(canonicalMatches, null, 2)
);

// Save Aliases
fs.writeFileSync(
  path.join(rootDir, 'src', 'data', 'dhoni_venue_aliases.json'),
  JSON.stringify(VENUE_NORMALIZATION, null, 2)
);

fs.writeFileSync(
  path.join(rootDir, 'src', 'data', 'dhoni_team_aliases.json'),
  JSON.stringify(OPPONENT_NORMALIZATION, null, 2)
);

console.log('Successfully written dhoni_matches.json, dhoni_venue_aliases.json, dhoni_team_aliases.json');
