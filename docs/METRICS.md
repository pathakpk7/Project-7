# METRICS & STATISTICAL METHODOLOGY

**Project**: CAPTAIN COOL: DECODED  
**Authoritative Standard**: Marylebone Cricket Club (MCC) Laws of Cricket & ICC Official Statistical Standards

---

## 1. Core Batting Metrics

### Batting Average (Avg)
$$\text{Batting Average} = \frac{\sum \text{Runs}}{\sum \text{Dismissals}}$$
- **Rule**: If $\sum \text{Dismissals} = 0$, the average is mathematically undefined and recorded explicitly as `NA [Not Out]` rather than $\infty$.
- **Aggregating Subgroups**: When computing aggregate average across multiple positions (e.g. positions 1–4 combined), we calculate $\frac{\sum \text{Runs}_{1..4}}{\sum \text{Dismissals}_{1..4}}$. Averaging individual averages is mathematically invalid and strictly avoided.

### Strike Rate (SR)
$$\text{Strike Rate} = \left( \frac{\sum \text{Runs}}{\sum \text{Balls Faced}} \right) \times 100$$
- **Balls Faced**: Standard legal deliveries faced by the batter. Wides are excluded from balls faced (as per ICC rules); No-balls are included.

### Not Out Percentage (NO %)
$$\text{Not Out \%} = \left( \frac{\text{Not Outs}}{\text{Innings}} \right) \times 100$$

---

## 2. Batting Position Derivation Methodology

A batter's position is derived dynamically from chronological ball-by-ball delivery event flow:
1. **Openers (Positions 1 & 2)**: The two batters present at the crease on delivery 0.1 of an innings.
2. **Positions 3 to 11**: Every new batter who enters the crease as striker or non-striker following a dismissal or retirement receives the next sequential position index ($3, 4, \dots, 11$).
3. **Role Classification Bins**:
   - **User Custom Grouping**:
     - `POS_1_4`: Batting positions 1, 2, 3, 4
     - `POS_5_7`: Batting positions 5, 6, 7
     - `POS_8_11`: Batting positions 8, 9, 10, 11
   - **Standard Non-overlapping Grouping**:
     - `TOP_ORDER_1_3`: Positions 1, 2, 3
     - `MIDDLE_ORDER_4_6`: Positions 4, 5, 6
     - `LOWER_ORDER_7_11`: Positions 7, 8, 9, 10, 11

---

## 3. Chasing & Finishing Analytics

### Chasing Context
- An innings is classified as a **Chase** (`chasing = True`) when Dhoni's team is batting in the 2nd innings of a limited-overs match (ODI/T20) or the 4th innings of a Test match.
- **Successful Chase**: A chase where the match outcome is `WON`.

### Death Overs Definition
- **Twenty20 / IPL / CLT20**: Overs 16 to 20 (Deliveries 15.1 to 20.0).
- **One Day Internationals (ODI)**: Overs 41 to 50 (Deliveries 40.1 to 50.0).
- **Tests**: Death overs are not applicable.

### Finisher Index (Original Project Metric)
To quantify clutch finishing impact without arbitrary ranking, the project provides a transparent derived index:
$$\text{Finisher Index} = (\text{Death SR} \times 0.50) + (\text{Boundary \%} \times 1.50) + ((100 - \text{Dot \%}) \times 0.20)$$
- **Rationale**:
  - `Death SR * 0.50`: Rewards sheer scoring velocity at the death.
  - `Boundary % * 1.50`: Heavily values boundary-hitting ability under pressure.
  - `(100 - Dot %) * 0.20`: Rewards strike rotation and minimisation of wasted deliveries.
- *Notice*: This is explicitly labelled as a derived project analytics metric and never conflated with official ICC records.

---

## 4. Captaincy & Wicketkeeping Metrics

### Win Percentage (Win %)
$$\text{Win \%} = \left( \frac{\text{Wins}}{\text{Matches Captained} - \text{No Results}} \right) \times 100$$
- In matches resulting in a Tie or Draw, they are considered completed matches without a win.

### Dismissals per Match (DPM)
$$\text{DPM} = \frac{\text{Catches} + \text{Stumpings}}{\text{Matches Played as Wicketkeeper}}$$
- Run-outs are tracked separately and not counted towards official keeper dismissals (as per standard ICC wicketkeeping statistical criteria).
