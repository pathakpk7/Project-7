import matchesData from "@/data/dhoni_matches.json";
import { MatchRecord, AggregatedStat, FilterState, CricketFormat, SparklinePoint, FormatSubStat } from "./types";

const ALL_MATCHES: MatchRecord[] = matchesData as MatchRecord[];

// Helper to compute average and strike rate with safe edge cases
export function calculateStatsFromInnings(inningsList: MatchRecord[]): {
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
} {
  // Unique matches count by match_id
  const matchIds = new Set(inningsList.map((i) => i.match_id));
  const matches = matchIds.size;
  const innings = inningsList.length;

  let totalRuns = 0;
  let totalBalls = 0;
  let notOuts = 0;
  let hundreds = 0;
  let fifties = 0;
  let thirties = 0;
  let ducks = 0;
  let fours = 0;
  let sixes = 0;
  let totalCatches = 0;
  let totalStumpings = 0;
  let highestScoreNum = 0;
  let highestScoreIsNO = false;

  // Yearly accumulator for trend sparkline
  const yearMap: Record<number, { runs: number; balls: number; innings: number }> = {};

  for (const inn of inningsList) {
    totalRuns += inn.runs;
    totalBalls += inn.balls;
    fours += inn.fours;
    sixes += inn.sixes;
    totalCatches += (inn.catches || 0);
    totalStumpings += (inn.stumpings || 0);

    if (inn.not_out) {
      notOuts++;
    }

    if (inn.runs >= 100) {
      hundreds++;
    } else if (inn.runs >= 50) {
      fifties++;
    } else if (inn.runs >= 30) {
      thirties++;
    }

    if (inn.runs === 0 && inn.dismissed) {
      ducks++;
    }

    if (inn.runs > highestScoreNum || (inn.runs === highestScoreNum && inn.not_out)) {
      highestScoreNum = inn.runs;
      highestScoreIsNO = inn.not_out;
    }

    const yr = inn.year;
    if (!yearMap[yr]) {
      yearMap[yr] = { runs: 0, balls: 0, innings: 0 };
    }
    yearMap[yr].runs += inn.runs;
    yearMap[yr].balls += inn.balls;
    yearMap[yr].innings += 1;
  }

  const dismissals = innings - notOuts;
  const average = dismissals > 0 
    ? (totalRuns / dismissals).toFixed(2) 
    : (innings > 0 ? "—" : "0.00");

  const strikeRate = totalBalls > 0 
    ? ((totalRuns / totalBalls) * 100).toFixed(2) 
    : (totalRuns > 0 ? "100.00" : "0.00");

  const highestScore = highestScoreNum > 0 || innings > 0
    ? `${highestScoreNum}${highestScoreIsNO ? "*" : ""}`
    : "0";

  // Build sorted sparkline trend
  const trend: SparklinePoint[] = Object.keys(yearMap)
    .map(Number)
    .sort((a, b) => a - b)
    .map((yr) => ({
      year: yr,
      runs: yearMap[yr].runs,
      balls: yearMap[yr].balls,
      innings: yearMap[yr].innings,
      sr: yearMap[yr].balls > 0 ? Number(((yearMap[yr].runs / yearMap[yr].balls) * 100).toFixed(1)) : 0
    }));

  return {
    matches,
    innings,
    runs: totalRuns,
    balls: totalBalls,
    not_outs: notOuts,
    dismissals,
    average,
    strike_rate: strikeRate,
    highest_score: highestScore,
    hundreds,
    fifties,
    thirties,
    ducks,
    fours,
    sixes,
    catches: totalCatches,
    stumpings: totalStumpings,
    dismissals_wk: totalCatches + totalStumpings,
    trend
  };
}

// Compute format-by-format breakdown
function computeFormatBreakdown(inningsList: MatchRecord[]): Record<string, FormatSubStat> {
  const formats = ["TEST", "ODI", "T20I", "IPL"];
  const result: Record<string, FormatSubStat> = {};

  for (const fmt of formats) {
    const subset = inningsList.filter((i) => i.format === fmt);
    if (subset.length > 0) {
      const stats = calculateStatsFromInnings(subset);
      result[fmt] = {
        format: fmt,
        matches: stats.matches,
        innings: stats.innings,
        runs: stats.runs,
        average: stats.average,
        strike_rate: stats.strike_rate,
        highest_score: stats.highest_score,
        hundreds: stats.hundreds,
        fifties: stats.fifties,
        catches: stats.catches,
        stumpings: stats.stumpings,
        dismissals_wk: stats.dismissals_wk
      };
    }
  }

  return result;
}

// Filter engine
export function filterMatches(filters: Partial<FilterState>): MatchRecord[] {
  return ALL_MATCHES.filter((m) => {
    // Format filter
    if (filters.format && filters.format !== "ALL") {
      if (m.format !== filters.format) return false;
    }

    // Location filter (HOME / AWAY / NEUTRAL)
    if (filters.location && filters.location !== "ALL") {
      if (m.location_type !== filters.location) return false;
    }

    return true;
  });
}

// Aggregations: By Opponent
export function getOpponentAnalytics(filters: Partial<FilterState>): AggregatedStat[] {
  const matches = filterMatches(filters);
  const grouped: Record<string, MatchRecord[]> = {};

  for (const m of matches) {
    if (!grouped[m.opponent]) {
      grouped[m.opponent] = [];
    }
    grouped[m.opponent].push(m);
  }

  const result: AggregatedStat[] = Object.keys(grouped).map((opponentName) => {
    const subset = grouped[opponentName];
    const stats = calculateStatsFromInnings(subset);
    const sample = subset[0];

    return {
      id: opponentName,
      name: opponentName,
      code: sample.opponent_code,
      subtext: `${subset.filter((i, idx, arr) => arr.findIndex(x => x.format === i.format) === idx).map(x => x.format).join(" • ")}`,
      ...stats,
      format_breakdown: computeFormatBreakdown(subset)
    };
  });

  return applySearchAndSort(result, filters.searchQuery, filters.sortField, filters.sortDirection);
}

// Aggregations: By Venue / Stadium
export function getVenueAnalytics(filters: Partial<FilterState>): AggregatedStat[] {
  const matches = filterMatches(filters);
  const grouped: Record<string, MatchRecord[]> = {};

  for (const m of matches) {
    if (!grouped[m.venue]) {
      grouped[m.venue] = [];
    }
    grouped[m.venue].push(m);
  }

  const result: AggregatedStat[] = Object.keys(grouped).map((venueName) => {
    const subset = grouped[venueName];
    const stats = calculateStatsFromInnings(subset);
    const sample = subset[0];

    return {
      id: venueName,
      name: venueName,
      city: sample.city,
      country: sample.country,
      subtext: sample.city ? `${sample.city}, ${sample.country}` : sample.country,
      ...stats,
      format_breakdown: computeFormatBreakdown(subset)
    };
  });

  return applySearchAndSort(result, filters.searchQuery, filters.sortField, filters.sortDirection);
}

// Aggregations: By Host Country
export function getCountryAnalytics(filters: Partial<FilterState>): AggregatedStat[] {
  const matches = filterMatches(filters);
  const grouped: Record<string, MatchRecord[]> = {};

  for (const m of matches) {
    const country = m.country || "India";
    if (!grouped[country]) {
      grouped[country] = [];
    }
    grouped[country].push(m);
  }

  const result: AggregatedStat[] = Object.keys(grouped).map((countryName) => {
    const subset = grouped[countryName];
    const stats = calculateStatsFromInnings(subset);

    const venuesCount = new Set(subset.map((i) => i.venue)).size;

    return {
      id: countryName,
      name: countryName,
      country: countryName,
      subtext: `${venuesCount} Host Grounds Played`,
      ...stats,
      format_breakdown: computeFormatBreakdown(subset)
    };
  });

  return applySearchAndSort(result, filters.searchQuery, filters.sortField, filters.sortDirection);
}

// Aggregations: By Home / Away / Neutral
export function getHomeAwayAnalytics(filters: Partial<FilterState>): AggregatedStat[] {
  const matches = filterMatches(filters);
  const grouped: Record<string, MatchRecord[]> = {
    "HOME": [],
    "AWAY": [],
    "NEUTRAL": []
  };

  for (const m of matches) {
    const loc = m.location_type || "HOME";
    if (grouped[loc]) {
      grouped[loc].push(m);
    }
  }

  const labels: Record<string, { name: string; subtext: string }> = {
    "HOME": { name: "HOME CONDITIONS", subtext: "Matches Played In India / CSK Home" },
    "AWAY": { name: "AWAY CONDITIONS", subtext: "True Bilateral Road Fixtures" },
    "NEUTRAL": { name: "NEUTRAL CONDITIONS", subtext: "ICC Tournaments, Tri-Series & Overseas Multi-team" }
  };

  const result: AggregatedStat[] = Object.keys(grouped).map((locKey) => {
    const subset = grouped[locKey];
    const stats = calculateStatsFromInnings(subset);

    return {
      id: locKey,
      name: labels[locKey]?.name || locKey,
      subtext: labels[locKey]?.subtext || "",
      ...stats,
      format_breakdown: computeFormatBreakdown(subset)
    };
  });

  return result;
}

// Aggregations: By Year / Season
export function getYearlyAnalytics(filters: Partial<FilterState>): AggregatedStat[] {
  const matches = filterMatches(filters);
  const grouped: Record<number, MatchRecord[]> = {};

  for (const m of matches) {
    if (!grouped[m.year]) {
      grouped[m.year] = [];
    }
    grouped[m.year].push(m);
  }

  const result: AggregatedStat[] = Object.keys(grouped)
    .map(Number)
    .sort((a, b) => b - a)
    .map((yearNum) => {
      const subset = grouped[yearNum];
      const stats = calculateStatsFromInnings(subset);

      return {
        id: String(yearNum),
        name: String(yearNum),
        subtext: `Season / Calendar Year ${yearNum}`,
        ...stats,
        format_breakdown: computeFormatBreakdown(subset)
      };
    });

  return applySearchAndSort(result, filters.searchQuery, filters.sortField || "name", filters.sortDirection || "desc");
}

// Aggregations: By Tournament Category
export function getTournamentAnalytics(filters: Partial<FilterState>): AggregatedStat[] {
  const matches = filterMatches(filters);
  const grouped: Record<string, MatchRecord[]> = {};

  for (const m of matches) {
    let compKey = m.competition || "Bilateral Series";
    if (m.format === "IPL") {
      compKey = "Indian Premier League (IPL)";
    } else if (compKey.toLowerCase().includes("world cup") || compKey.toLowerCase().includes("cwc")) {
      compKey = "ICC Cricket World Cup (ODI)";
    } else if (compKey.toLowerCase().includes("twenty20") || compKey.toLowerCase().includes("t20 world cup")) {
      compKey = "ICC Men's T20 World Cup";
    } else if (compKey.toLowerCase().includes("champions trophy")) {
      compKey = "ICC Champions Trophy";
    } else if (compKey.toLowerCase().includes("asia cup")) {
      compKey = "Asia Cup (ODI & T20I)";
    } else if (compKey.toLowerCase().includes("tri-nation") || compKey.toLowerCase().includes("tri-series") || compKey.toLowerCase().includes("commonwealth bank")) {
      compKey = "Multi-Nation & Tri-Series";
    } else {
      compKey = m.format === "TEST" ? "Bilateral Test Series" : "Bilateral ODI/T20I Tours";
    }

    if (!grouped[compKey]) {
      grouped[compKey] = [];
    }
    grouped[compKey].push(m);
  }

  const result: AggregatedStat[] = Object.keys(grouped).map((compName) => {
    const subset = grouped[compName];
    const stats = calculateStatsFromInnings(subset);

    return {
      id: compName,
      name: compName,
      subtext: `${subset.length} Recorded Innings`,
      ...stats,
      format_breakdown: computeFormatBreakdown(subset)
    };
  });

  return applySearchAndSort(result, filters.searchQuery, filters.sortField, filters.sortDirection);
}

// Get Overall Summary for Filtered View
export function getOverallCareerSummary(filters: Partial<FilterState>) {
  const matches = filterMatches(filters);
  return calculateStatsFromInnings(matches);
}

// Match-by-match drilldown retriever
export function getMatchesForEntity(type: string, entityId: string, format?: CricketFormat): MatchRecord[] {
  return ALL_MATCHES.filter((m) => {
    if (format && format !== "ALL" && m.format !== format) {
      return false;
    }

    switch (type) {
      case "OPPONENTS":
        return m.opponent.toLowerCase() === entityId.toLowerCase() || m.opponent_code.toLowerCase() === entityId.toLowerCase();
      case "VENUES":
        return m.venue.toLowerCase() === entityId.toLowerCase();
      case "COUNTRIES":
        return m.country.toLowerCase() === entityId.toLowerCase();
      case "HOME_AWAY":
        return m.location_type.toLowerCase() === entityId.toLowerCase() || entityId.includes(m.location_type);
      case "YEARS":
        return String(m.year) === entityId;
      case "TOURNAMENTS":
        return m.competition.toLowerCase().includes(entityId.toLowerCase()) || entityId.toLowerCase().includes(m.competition.toLowerCase());
      default:
        return true;
    }
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Generic search & sort helper
function applySearchAndSort(
  list: AggregatedStat[],
  query?: string,
  sortField: string = "runs",
  sortDirection: "asc" | "desc" = "desc"
): AggregatedStat[] {
  let filtered = list;

  if (query && query.trim() !== "") {
    const q = query.toLowerCase().trim();
    filtered = list.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        (item.city && item.city.toLowerCase().includes(q)) ||
        (item.country && item.country.toLowerCase().includes(q)) ||
        (item.code && item.code.toLowerCase().includes(q))
    );
  }

  return [...filtered].sort((a, b) => {
    let valA: any = (a as any)[sortField];
    let valB: any = (b as any)[sortField];

    if (sortField === "average" || sortField === "strike_rate") {
      valA = valA === "—" ? -1 : parseFloat(valA) || 0;
      valB = valB === "—" ? -1 : parseFloat(valB) || 0;
    } else if (sortField === "highest_score") {
      valA = parseInt(valA.replace("*", ""), 10) || 0;
      valB = parseInt(valB.replace("*", ""), 10) || 0;
    } else if (typeof valA === "string") {
      valA = valA.toLowerCase();
      valB = (valB || "").toLowerCase();
      return sortDirection === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }

    if (sortDirection === "asc") {
      return valA > valB ? 1 : -1;
    } else {
      return valA < valB ? 1 : -1;
    }
  });
}
