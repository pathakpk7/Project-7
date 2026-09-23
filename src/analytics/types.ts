export type CricketFormat = "ALL" | "TEST" | "ODI" | "T20I" | "IPL";
export type AnalyticsMode = "OPPONENTS" | "VENUES" | "COUNTRIES" | "HOME_AWAY" | "YEARS" | "TOURNAMENTS";
export type LocationType = "ALL" | "HOME" | "AWAY" | "NEUTRAL";

export interface MatchRecord {
  match_id: string;
  innings_id: string;
  date: string;
  year: number;
  month: number;
  format: "TEST" | "ODI" | "T20I" | "IPL";
  competition: string;
  season: string;
  team: string;
  opponent: string;
  opponent_code: string;
  venue: string;
  city: string;
  country: string;
  location_type: "HOME" | "AWAY" | "NEUTRAL";
  innings_number: number;
  batting_position: number;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strike_rate: number;
  dismissed: boolean;
  not_out: boolean;
  dismissal_type: string;
  bowler: string;
  captain: boolean;
  chasing: boolean;
  result: string;
  catches?: number;
  stumpings?: number;
  dismissals_wk?: number;
}

export interface SparklinePoint {
  year: number;
  runs: number;
  balls?: number;
  innings?: number;
  sr?: number;
}

export interface FormatSubStat {
  format: string;
  matches: number;
  innings: number;
  runs: number;
  average: string;
  strike_rate: string;
  highest_score: string;
  hundreds: number;
  fifties: number;
  catches?: number;
  stumpings?: number;
  dismissals_wk?: number;
}

export interface AggregatedStat {
  id: string;
  name: string;
  subtext?: string;
  code?: string;
  country?: string;
  city?: string;
  matches: number;
  innings: number;
  runs: number;
  balls: number;
  not_outs: number;
  dismissals: number;
  average: string;
  strike_rate: string;
  highest_score: string;
  hundreds: number;
  fifties: number;
  thirties: number;
  ducks: number;
  fours: number;
  sixes: number;
  catches: number;
  stumpings: number;
  dismissals_wk: number;
  trend: SparklinePoint[];
  format_breakdown?: Record<string, FormatSubStat>;
}

export interface FilterState {
  format: CricketFormat;
  mode: AnalyticsMode;
  location: LocationType;
  searchQuery: string;
  sortField: string;
  sortDirection: "asc" | "desc";
  viewMode: "table" | "cards";
}
