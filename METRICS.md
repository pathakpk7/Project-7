# METRICS & ANALYTICAL FORMULAS — CAPTAIN COOL: DECODED

This document formalizes the boundary between **Official ICC/BCCI Cricket Statistics** and **Custom Analytical Groupings**.

---

## 1. Official Cricket Metrics
These metrics follow official international cricket laws:
- **Batting Average**:
  $$\text{Batting Average} = \frac{\sum \text{Runs}}{\sum (\text{Innings} - \text{Not Outs})}$$
  *Never calculated as the average of averages.*
- **Batting Strike Rate**:
  $$\text{Strike Rate} = \frac{\sum \text{Runs}}{\sum \text{Balls Faced}} \times 100$$
- **Wicketkeeping Dismissal Rate**:
  $$\text{Dismissals Per Innings} = \frac{\text{Catches} + \text{Stumpings}}{\text{Keeping Innings}}$$

---

## 2. Custom Analytical Groupings (Clearly Labeled in UI)
To evaluate MS Dhoni's transformation from top-order aggressor to middle/lower-order crisis manager, our analytical layer provides explicit groupings:

1. **Analytical Grouping A: Top vs Finisher Core (`POS_1_4` vs `POS_5_7`)**
   - **Positions 1–4**: The explosive early phase (maiden 148 in Vizag, 183* in Jaipur, 148 in Faisalabad).
   - **Positions 5–7**: The tactical anchor & death overs finisher phase.
   - *Label in UI: "Analytical Position Grouping (1–4 vs 5–7)"*

2. **Analytical Grouping B: Standard Cricket Segments (`TOP_ORDER_1_3`, `MIDDLE_ORDER_4_6`, `LOWER_ORDER_7_11`)**
   - *Label in UI: "Standard Batting Segments (1–3, 4–6, 7–11)"*

3. **Chasing Average Metric**:
   - Focuses strictly on ODI matches batting second where India won:
   $$\text{Chasing Average in Wins} = \frac{\text{Runs in Successful Chases}}{\text{Dismissals in Successful Chases}} = 102.71$$

---

## 3. Strict Integrity Policy
- No subjective scores (e.g. `98/100 finisher score`) are used without explicit formula transparency.
- Every metric displayed on the website cites its sample size, format, and time period.
