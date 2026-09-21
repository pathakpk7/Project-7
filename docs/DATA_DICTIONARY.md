# DATA DICTIONARY: CAPTAIN COOL: DECODED

**Version**: 1.0.0  
**Target Subject**: Mahendra Singh Dhoni (`player_id = MS_DHONI`, Cricsheet Registry `4a8a2e3b`)

---

## 1. Master Innings Dataset (`data/master/ms_dhoni_master_innings.csv`)

| Column Name | Data Type | Nullable | Description | Example Values |
| :--- | :--- | :--- | :--- | :--- |
| `match_id` | String | No | Unique identifier of the match from source | `"64867"`, `"1136561"` |
| `innings_id` | String | No | Composite identifier `{match_id}_{innings_num}` | `"64867_1"`, `"1136561_2"` |
| `date` | Date (YYYY-MM-DD) | No | Date when the match commenced | `"2011-04-02"`, `"2005-10-31"` |
| `year` | Integer | No | Calendar year of the match | `2011`, `2023` |
| `month` | Integer | No | Calendar month (1-12) of the match | `4`, `10` |
| `format` | String | No | Match cricket format (`TEST`, `ODI`, `T20I`, `IPL`, `CLT20`, `OTHER_T20`) | `"ODI"`, `"IPL"` |
| `competition` | String | No | Name of the tournament or series | `"ICC Cricket World Cup"`, `"Indian Premier League"` |
| `season` | String | No | Season identifier | `"2011"`, `"2020/21"` |
| `team` | String | No | Team represented by MS Dhoni | `"India"`, `"Chennai Super Kings"`, `"Rising Pune Supergiant"`, `"Asia XI"` |
| `opponent` | String | No | Opposing team | `"Sri Lanka"`, `"Mumbai Indians"`, `"Pakistan"` |
| `venue` | String | No | Stadium / Ground name | `"Wankhede Stadium, Mumbai"`, `"MA Chidambaram Stadium, Chennai"` |
| `city` | String | Yes | Host city | `"Mumbai"`, `"Chennai"`, `"Johannesburg"` |
| `country` | String | No | Host country | `"India"`, `"Australia"`, `"South Africa"`, `"England"` |
| `home_away` | String | No | Match classification (`HOME`, `AWAY`, `NEUTRAL`) | `"HOME"`, `"AWAY"`, `"NEUTRAL"` |
| `innings_number` | Integer | No | Innings order (1, 2, 3, 4) | `1`, `2` |
| `batting_position`| Integer | No | Derived arrival position (1 to 11) | `3`, `5`, `6`, `7` |
| `runs` | Integer | No | Total individual runs scored by Dhoni | `183`, `91`, `0` |
| `balls_faced` | Integer | No | Total legal deliveries faced (excluding wides) | `145`, `79`, `1` |
| `fours` | Integer | No | Total 4s hit by Dhoni | `15`, `8` |
| `sixes` | Integer | No | Total 6s hit by Dhoni | `10`, `2` |
| `dots` | Integer | No | Total dot deliveries faced | `45`, `22` |
| `strike_rate` | Float | No | `(runs / balls_faced) * 100` | `126.21`, `115.19` |
| `dismissed` | Boolean | No | Whether Dhoni was out in this innings | `True`, `False` |
| `not_out` | Boolean | No | Whether Dhoni remained unbeaten | `True`, `False` |
| `dismissal_type` | String | No | Dismissal method or `"not out"` | `"caught"`, `"bowled"`, `"run out"`, `"lbw"`, `"not out"` |
| `bowler` | String | Yes | Name of bowler who dismissed Dhoni | `"Lasith Malinga"`, `""` |
| `fielder` | String | Yes | Name of fielder involved in dismissal | `"Kumar Sangakkara"`, `""` |
| `captain` | Boolean | No | Whether Dhoni captained the team in this match | `True`, `False` |
| `chasing` | Boolean | No | Whether the innings was a run-chase | `True`, `False` |
| `target` | Integer | Yes | Target score to win when chasing | `275`, `180`, `null` |
| `result` | String | No | Match outcome for Dhoni's team (`WON`, `LOST`, `TIED`, `DRAWN`, `NO_RESULT`) | `"WON"`, `"LOST"` |
| `margin` | String | Yes | Victory or defeat margin | `"6 wickets"`, `"24 runs"` |
| `player_of_match`| Boolean | No | Whether Dhoni was awarded Player of the Match | `True`, `False` |
| `tournament_stage`| String | Yes | Stage in competition | `"Final"`, `"Semi-Final"`, `"Group Stage"` |

---

## 2. Analytical Datasets Overview

### `dhoni_position_stats.csv` & `dhoni_position_format_stats.csv`
- Aggregates by `format` and `batting_position` (1 to 11).
- Metrics: `innings`, `runs`, `balls_faced`, `dismissals`, `not_outs`, `average`, `strike_rate`, `fours`, `sixes`, `fifties`, `hundreds`, `highest_score`.

### `dhoni_role_comparison.csv`
- Compares performance across strategic role buckets:
  - User requested: `POS_1_4` (1 to 4), `POS_5_7` (5 to 7), `POS_8_11` (8 to 11).
  - Standard cricket order: `TOP_ORDER_1_3` (1 to 3), `MIDDLE_ORDER_4_6` (4 to 6), `LOWER_ORDER_7_11` (7 to 11).
- Key feature: Batting average is computed as `Sum(Runs) / Sum(Dismissals)`.

### `dhoni_finishing_stats.csv`
- Focuses on death overs:
  - T20 / IPL: Overs 16–20 (overs index 15 to 19).
  - ODI: Overs 41–50 (overs index 40 to 49).
- Metrics: `balls_faced`, `runs_scored`, `strike_rate`, `fours`, `sixes`, `dot_balls`, `dot_ball_percentage`, `boundary_percentage`, `finisher_index`.

### `dhoni_wicketkeeping.csv` & `dhoni_wicketkeeping_stats.csv`
- Granular and aggregated wicketkeeping stats: `catches`, `stumpings`, `run_outs`, `total_dismissals`, `dismissals_per_match`.

### `dhoni_captaincy.csv` & `dhoni_captaincy_stats.csv`
- Match-by-match and aggregate captaincy records separated across teams (`India`, `Chennai Super Kings`, `Rising Pune Supergiant`) and formats.
- Metrics: `matches_captained`, `wins`, `losses`, `ties`, `draws`, `no_results`, `win_percentage`, `toss_win_percentage`.
