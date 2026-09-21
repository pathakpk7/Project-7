# DATA PIPELINE ARCHITECTURE: CAPTAIN COOL: DECODED

```
[ CRICSHEET RAW ARCHIVES ]
Tests, ODIs, IT20s, IPL, All T20s, People Registry
               │
               ▼
[ 01_fetch_raw_data.py ]
• Download zip files
• Verify SHA-256 Checksums
• Generate data/raw/manifest.json
               │
               ▼
[ 02_process_matches_innings.py ]
• Streaming JSON zip parsing
• Entity Resolution: player_id = 'MS_DHONI' (UUID: 4a8a2e3b)
• Chronological Crease Arrival Batting Position Derivation (1 to 11)
• Innings aggregation (Runs, Balls Faced, 4s, 6s, Dismissals, SR)
• Outputs:
  - data/processed/dhoni_matches.csv
  - data/processed/dhoni_innings.csv
  - data/master/ms_dhoni_master_innings.csv
  - data/processed/dhoni_ball_by_ball.csv
               │
               ▼
[ 03_extract_keeper_captain.py ]
• Parse fielding deliveries: Catches, Stumpings, Run-outs
• Parse captaincy records: Matches, Wins, Losses, Ties, Toss outcomes
• Outputs:
  - data/processed/dhoni_wicketkeeping.csv
  - data/processed/dhoni_captaincy.csv
               │
               ▼
[ 04_build_analytics.py ]
• Aggregate 22+ analytical tables
• Batting Position stats (1 to 11)
• Role comparison: 1-4 vs 5-7 & Top/Middle/Lower Order
• Format, Yearly, Opponent, Venue, Home/Away/Neutral splits
• Chasing & Finishing (Death overs 16-20 T20 / 41-50 ODI)
• Reference tables: Trophies, Milestones, Iconic Moments, Comparisons
               │
               ▼
[ 05_validate_data.py ]
• Automated benchmarking against ESPNcricinfo, ICC & IPL official stats
• Generates data/validation/validation_report.csv & discrepancies.csv
               │
               ▼
[ export_web_data.py ]
• Exports pre-compiled JSON bundles to src/data/ for high-performance zero-latency web experience
```

---

## Reproducing the Entire Pipeline

To run the pipeline from scratch on any machine:

```bash
# 1. Fetch raw datasets and compute checksums
python scripts/pipeline/01_fetch_raw_data.py

# 2. Run master execution pipeline
python scripts/run_pipeline.py
```
