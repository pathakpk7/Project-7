# DATA SOURCES & LICENSING DOCUMENTATION

**Project**: CAPTAIN COOL: DECODED  
**Purpose**: Verified, Reproducible Cricket Data Warehouse & Analytics Engine for MS Dhoni  
**Lead Data Engineer & Cricket Data Researcher**: Antigravity AI  

---

## 1. Primary Data Source

### Cricsheet
- **URL**: [https://cricsheet.org/](https://cricsheet.org/)
- **Downloads Directory**: [https://cricsheet.org/downloads/](https://cricsheet.org/downloads/)
- **Format Specification**: [https://cricsheet.org/format/](https://cricsheet.org/format/)
- **Format Used**: Cricsheet Modern JSON (Version 1.0.0+)
- **License**: [Open Data Commons Open Database License (ODbL) / Creative Commons Attribution (CC BY 4.0)](https://cricsheet.org/license/)
- **Date Accessed**: September 2026
- **Datasets Downloaded**:
  1. `tests_male_json.zip` (Men's Test match ball-by-ball JSON data)
  2. `odis_male_json.zip` (Men's One Day International ball-by-ball JSON data)
  3. `it20s_male_json.zip` (Men's Twenty20 International ball-by-ball JSON data)
  4. `ipl_male_json.zip` (Indian Premier League ball-by-ball JSON data)
  5. `t20s_male_json.zip` (All Men's T20s including Champions League T20 & domestic matches)
  6. `people.csv` (Cricsheet canonical player register)
- **Integrity**: Preserved in raw state under `data/raw/` with full SHA-256 checksums documented in `data/raw/manifest.json`.
- **Notes & Limitations**: Cricsheet provides structured ball-by-ball deliveries with batter runs, extras, bowling figures, dismissals, fielders, toss, venues, dates, and player registry mappings. For pre-2004 domestic first-class games or non-broadcasted tour matches, limited ball-by-ball records exist; these are explicitly documented.

---

## 2. Secondary Data Sources & Benchmarks

### 1. ESPNcricinfo / Statsguru
- **URL**: [https://stats.espncricinfo.com/](https://stats.espncricinfo.com/)
- **Purpose**: Authoritative statistical baseline for validating career totals, batting average, strike rate, centuries, fifties, wicketkeeping catches/stumpings, and captaincy records across Tests, ODIs, and T20Is.
- **Usage**: Used strictly for cross-validation and benchmarking in `scripts/pipeline/05_validate_data.py`. No mass-scraping or paywall bypassing was performed.

### 2. IPL Official Records
- **URL**: [https://www.iplt20.com/stats/](https://www.iplt20.com/stats/)
- **Purpose**: Verification of MS Dhoni's IPL statistics (2008–2024), tournament titles with Chennai Super Kings, captaincy records, and wicketkeeping milestones.

### 3. ICC Official Archives
- **URL**: [https://www.icc-cricket.com/](https://www.icc-cricket.com/)
- **Purpose**: Verification of ICC Tournament records (2007 ICC World T20, 2011 ICC Cricket World Cup, 2013 ICC Champions Trophy) and ICC ranking milestones (No. 1 ODI Batter in 2006, No. 1 Test Team in 2009).

### 4. Asian Cricket Council (ACC) & BCCI
- **Purpose**: Verification of Asia Cup titles (2010, 2016), bilateral trophies (CB Series 2008 in Australia, Border-Gavaskar Trophy 2013), and CLT20 victories (2010, 2014).

---

## 3. Data Attribution & Terms of Use

1. **Attribution**: Ball-by-ball cricket data is provided courtesy of Cricsheet ([cricsheet.org](https://cricsheet.org)).
2. **Derivative Works**: All analytical tables (`dhoni_position_stats.csv`, `dhoni_role_comparison.csv`, `dhoni_finishing_stats.csv`, etc.) and the "Finisher Index" are derived calculations engineered strictly from underlying chronological ball-by-ball data and are clearly documented in `docs/METRICS.md`.
3. **Reproducibility**: The complete pipeline script suite (`scripts/pipeline/`) enables 100% deterministic reproduction from raw Cricsheet archives to final analytical outputs.
