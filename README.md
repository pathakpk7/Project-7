# CAPTAIN COOL: DECODED
> *"The numbers. The decisions. The moments."*  
> *"Decoding the man behind No. 7."*

A high-precision, verified cricket data warehouse and cinematic interactive web experience exploring the career, batting, wicketkeeping, captaincy, finishing masterclasses, and legacy of **Mahendra Singh Dhoni**.

---

## 🏏 Project Highlights

- **100% Verified Cricket Data Warehouse**: Built from official Cricsheet ball-by-ball JSON archives with complete entity resolution (`player_id = MS_DHONI`, UUID `4a8a2e3b`), tracking 789 matches, 743 innings, and 25,541+ deliveries.
- **Batting Position Derivation Engine**: Determines the exact chronological crease arrival order (1 to 11) for every single match without relying on pre-calculated web snippets.
- **Top Order (1–4) vs Lower Order (5–7) Analysis**: Mathematical calculation of aggregate batting average (`Total Runs / Total Dismissals`) across Test, ODI, T20I, IPL, and All-International cricket.
- **Wicketkeeping Analytics**: Comprehensive breakdown of 829+ dismissals and world-record 195 stumpings with a 0.08-second reflex reaction simulation.
- **Captaincy Leadership & ICC Clean Sweep**: India vs CSK captaincy records detailing the only captain in cricket history to win all three ICC white-ball trophies (2007 T20 WC, 2011 CWC, 2013 CT) and 5x IPL championships.
- **Chasing & Finishing Layer**: Death-over strike rates (Overs 16–20 in T20, Overs 41–50 in ODI), 90+ average in successful ODI chases, and transparent Finisher Index formula.
- **Cinematic Interactive Web App**: Next.js 14+, Tailwind CSS, Framer Motion, dark stadium aesthetic, dual-universe switcher (India Tri-Color vs CSK Yellove), Mahi Tactical Lab scenario simulator, Ask Mahi AI data intelligence, and Number 7 easter eggs.

---

## 📂 Repository Structure

```
PROJECT 7/
├── DATA_SOURCES.md                     # Data licenses, Cricsheet terms, secondary sources
├── README.md                           # Project overview & usage guide
├── package.json                        # Next.js frontend dependencies
├── tsconfig.json                       # TypeScript compiler configuration
├── tailwind.config.js                  # Custom cinematic theme (CSK Gold, India Blue, Charcoal)
├── db/
│   ├── schema.sql                      # PostgreSQL / Supabase Relational DDL
│   └── schema.prisma                   # Production Prisma ORM schema
├── docs/
│   ├── DATA_DICTIONARY.md              # Precise column-by-column schema definitions
│   ├── METRICS.md                      # Mathematical formulas (Avg, SR, Finisher Index)
│   └── DATA_PIPELINE.md                # End-to-end ETL architecture documentation
├── scripts/
│   ├── run_pipeline.py                 # Master pipeline execution script
│   └── pipeline/
│       ├── 01_fetch_raw_data.py        # Download raw zip archives & generate SHA-256 manifest
│       ├── 02_process_matches_innings.py # Ball-by-ball parsing & batting position derivation
│       ├── 03_extract_keeper_captain.py  # Wicketkeeping & captaincy extraction
│       ├── 04_build_analytics.py       # Computes all 22+ analytical aggregations
│       ├── 05_validate_data.py         # Automated verification against official benchmarks
│       └── export_web_data.py          # Exports JSON bundles to src/data/ for Next.js
├── data/
│   ├── raw/                            # Original unmodified zip files & manifest.json
│   ├── master/
│   │   └── ms_dhoni_master_innings.csv # Golden unified innings dataset (743 innings)
│   ├── processed/                      # Normalized matches, keeper, captain, bbb CSVs
│   ├── analytics/                      # 15+ aggregated analytical tables
│   ├── reference/                      # Trophies, iconic moments, milestones, comparisons
│   └── validation/
│       ├── validation_report.csv       # Automated audit report (PASS/WARNING/FAIL)
│       └── discrepancies.csv           # Variance resolution notes
└── src/
    ├── app/
    │   ├── layout.tsx                  # Root layout, cinematic metadata & typography
    │   ├── globals.css                 # Custom scrollbars, glassmorphism, film grain
    │   └── page.tsx                    # Master interactive experience container
    ├── components/
    │   ├── layout/                     # Navbar, Footer, CinematicBackground
    │   ├── ui/                         # KpiCard, SectionHeader, Badge
    │   ├── sections/                   # 16 Interactive documentary & analytics modules
    │   └── easter-eggs/                # Helicopter Shot animation & Number 7 modal
    └── data/                           # Pre-compiled high-performance JSON bundles
```

---

## 🚀 Getting Started

### 1. Run the Data Pipeline (Python 3.9+)

```bash
# Optional: Fetch raw datasets (already downloaded with SHA256 verified manifest)
python scripts/pipeline/01_fetch_raw_data.py

# Run complete processing, extraction, analytics, validation, and web export
python scripts/run_pipeline.py
```

### 2. Launch the Interactive Web Experience

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📊 Sample Analytical Queries Answered by the Warehouse

### 1. MS Dhoni at Batting Positions 1–4 vs 5–7 (ODIs)
- **Positions 1–4**: 30 Innings, 1,446 Runs, Batting Average: **60.25**, Strike Rate: **96.40**, 4x 100s, 9x 50s, Highest Score: **183\***
- **Positions 5–7**: 248 Innings, 8,812 Runs, Batting Average: **49.79**, Strike Rate: **86.10**, 5x 100s, 63x 50s, 71 Not Outs

### 2. Unbeaten Run Chases in ODIs
- **Average in Successful Chases**: **90+** with 47+ Not Outs.

### 3. Death Overs (T20 & IPL: Overs 16–20)
- Strike Rate: **170+**, Boundary %: **22.5%**, 264 Sixes.

---

## ⚖️ Attribution & Licensing

- **Primary Cricket Data**: Sourced from [Cricsheet](https://cricsheet.org/) under [Open Data Commons / CC BY 4.0](https://cricsheet.org/license/).
- **Secondary Reference**: ESPNcricinfo, ICC Official Records, IPL Official Records, BCCI.
- **Created by**: A lifelong MS Dhoni childhood fan & Lead Data Engineer.
