export interface InningsRecord {
  match_id: string;
  innings_id: string;
  date: string;
  year: string;
  month: string;
  format: string;
  competition: string;
  season: string;
  team: string;
  opponent: string;
  venue: string;
  city: string;
  country: string;
  home_away: string;
  innings_number: string;
  batting_position: string;
  runs: string;
  balls_faced: string;
  fours: string;
  sixes: string;
  dots: string;
  strike_rate: string;
  dismissed: string;
  not_out: string;
  dismissal_type: string;
  bowler: string;
  fielder: string;
  captain: string;
  chasing: string;
  target: string;
  result: string;
  margin: string;
  player_of_match: string;
  tournament_stage: string;
}

export interface FormatStat {
  format: string;
  matches: string;
  innings: string;
  runs: string;
  balls: string;
  dismissals: string;
  not_outs: string;
  average: string;
  strike_rate: string;
  fours: string;
  sixes: string;
  fifties: string;
  hundreds: string;
  highest_score: string;
}

export interface PositionStat {
  format: string;
  batting_position: string;
  innings: string;
  runs: string;
  balls_faced: string;
  dismissals: string;
  not_outs: string;
  average: string;
  strike_rate: string;
  fours: string;
  sixes: string;
  fifties: string;
  hundreds: string;
  highest_score: string;
}

export interface RoleComparisonStat {
  format: string;
  role_group: string;
  innings: string;
  runs: string;
  balls: string;
  dismissals: string;
  not_outs: string;
  average: string;
  strike_rate: string;
  fifties: string;
  hundreds: string;
  fours: string;
  sixes: string;
}

export interface YearlyStat {
  year: string;
  format: string;
  matches: string;
  innings: string;
  runs: string;
  balls: string;
  dismissals: string;
  not_outs: string;
  average: string;
  strike_rate: string;
  fifties: string;
  hundreds: string;
  fours: string;
  sixes: string;
  highest_score: string;
}

export interface TrophyRecord {
  year: string;
  competition: string;
  team: string;
  captain: string;
  stage: string;
  opponent: string;
  venue: string;
  result: string;
  significance: string;
  source: string;
}

export interface IconicMomentRecord {
  moment_id: string;
  date: string;
  year: string;
  competition: string;
  match: string;
  opponent: string;
  venue: string;
  context: string;
  performance: string;
  result: string;
  category: string;
  source: string;
}

export interface MilestoneRecord {
  date: string;
  milestone: string;
  format: string;
  details: string;
}

export interface ComparisonRecord {
  player: string;
  role: string;
  period: string;
  tests_runs: string;
  tests_avg: string;
  tests_sr: string;
  odis_runs: string;
  odis_avg: string;
  odis_sr: string;
  t20is_runs: string;
  t20is_avg: string;
  t20is_sr: string;
  ipl_runs: string;
  ipl_avg: string;
  ipl_sr: string;
  total_catches: string;
  total_stumpings: string;
  icc_trophies_as_captain: string;
  ipl_titles_as_captain: string;
  finishing_not_outs_odis: string;
}
