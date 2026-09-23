# DATA SOURCES — CAPTAIN COOL: DECODED

This document records the data sources and verification standards for the **CAPTAIN COOL: DECODED** dataset warehouse.

## 1. Primary Sources & Scope
- **International Cricket (Test, ODI, T20I)**: Official ICC & BCCI match records (2004–2019).
- **Indian Premier League (IPL)**: Official BCCI / IPL match records & scorecards (2008–2024).
- **Champions League T20 (CLT20)**: Official tournament match archives (2010, 2014).

## 2. Core Datasets in `src/data/`
| File | Records / Schema | Description |
| :--- | :--- | :--- |
| `format_stats.json` | 6 Formats (Test, ODI, T20I, IPL, All-Intl, Overall) | Aggregated career totals (Runs, Average, SR, 50s, 100s, Dismissals, etc.) |
| `position_stats.json` | Batting positions 1 through 8 across formats | Granular breakdown per batting order position |
| `role_comparison.json` | Top Order (1–3), Middle Order (4–6), Lower Order (7–11), Pos 1–4, Pos 5–7 | Analytical role groupings |
| `captaincy_stats.json` | Matches, Wins, Losses, Ties, Win % for India & CSK | Official leadership records across formats |
| `trophies.json` | 10 major silverware titles (3 ICC, 1 Test Mace, 5 IPL, 2 CLT20) | Verified tournament metadata, dates, venues, and victory margins |
| `iconic_moments.json` | 10 iconic historical match moments | Match dates, opponents, venues, context, scores, and media anchors |
| `chasing_stats.json` | ODI chases, victories, batting averages | 102.71 average in successful ODI run-chases |
| `finishing_stats.json` | Death overs, match-winning sixes, final over finishes | Verified clutch finishing data points |
| `wicketkeeping_stats.json` | Catches, stumpings, dismissals per format | 195 stumpings (World Record), 829 international dismissals |
| `yearly_stats.json` | Career progression 2004–2024 per year | Annual run aggregates, averages, strike rates |
| `trivia_bank.json` | 42 progressive verified questions | 7 stages of cricket history questions with verified answers |
| `dhoni_warehouse_bundle.json` | Full consolidated analytical bundle | Master relational dataset for deep query explorer |

## 3. Data Integrity Standards
- **Source of Truth**: Existing JSON files are read-only sources of truth.
- **No Mock / Fabricated Stats**: No numbers are simulated or estimated.
- **Strict Format Separation**: Statistics are always reported with explicit format tags.
