"""
export_web_data.py
Converts all processed and analytical CSVs into structured JSON bundles
optimized for the Next.js interactive web app (src/data/).
"""

import os
import sys
import csv
import json

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
ANALYTICS_DIR = os.path.join(BASE_DIR, "data", "analytics")
MASTER_DIR = os.path.join(BASE_DIR, "data", "master")
PROCESSED_DIR = os.path.join(BASE_DIR, "data", "processed")
REFERENCE_DIR = os.path.join(BASE_DIR, "data", "reference")
VALIDATION_DIR = os.path.join(BASE_DIR, "data", "validation")

WEB_DATA_DIR = os.path.join(BASE_DIR, "src", "data")
os.makedirs(WEB_DATA_DIR, exist_ok=True)

def load_csv(filepath):
    if not os.path.exists(filepath):
        return []
    with open(filepath, "r", encoding="utf-8") as f:
        return list(csv.DictReader(f))

def main():
    print("=" * 60)
    print("STEP 6: EXPORTING WEB-OPTIMIZED JSON BUNDLES TO SRC/DATA/")
    print("=" * 60)
    
    files_to_export = {
        "master_innings": os.path.join(MASTER_DIR, "ms_dhoni_master_innings.csv"),
        "matches": os.path.join(PROCESSED_DIR, "dhoni_matches.csv"),
        "format_stats": os.path.join(ANALYTICS_DIR, "dhoni_format_stats.csv"),
        "position_stats": os.path.join(ANALYTICS_DIR, "dhoni_position_stats.csv"),
        "position_format_stats": os.path.join(ANALYTICS_DIR, "dhoni_position_format_stats.csv"),
        "role_comparison": os.path.join(ANALYTICS_DIR, "dhoni_role_comparison.csv"),
        "yearly_stats": os.path.join(ANALYTICS_DIR, "dhoni_yearly_stats.csv"),
        "opponent_stats": os.path.join(ANALYTICS_DIR, "dhoni_opponent_stats.csv"),
        "venue_stats": os.path.join(ANALYTICS_DIR, "dhoni_venue_stats.csv"),
        "home_away_stats": os.path.join(ANALYTICS_DIR, "dhoni_home_away_stats.csv"),
        "innings_phase_stats": os.path.join(ANALYTICS_DIR, "dhoni_innings_phase_stats.csv"),
        "chasing_stats": os.path.join(ANALYTICS_DIR, "dhoni_chasing_stats.csv"),
        "finishing_stats": os.path.join(ANALYTICS_DIR, "dhoni_finishing_stats.csv"),
        "wicketkeeping_stats": os.path.join(ANALYTICS_DIR, "dhoni_wicketkeeping_stats.csv"),
        "captaincy_stats": os.path.join(ANALYTICS_DIR, "dhoni_captaincy_stats.csv"),
        "tournament_stats": os.path.join(ANALYTICS_DIR, "dhoni_tournament_stats.csv"),
        "career_timeline": os.path.join(ANALYTICS_DIR, "dhoni_career_timeline.csv"),
        "trophies": os.path.join(REFERENCE_DIR, "dhoni_trophies.csv"),
        "iconic_moments": os.path.join(REFERENCE_DIR, "dhoni_iconic_moments.csv"),
        "milestones": os.path.join(REFERENCE_DIR, "dhoni_milestones.csv"),
        "comparisons": os.path.join(REFERENCE_DIR, "dhoni_comparisons.csv"),
        "validation_report": os.path.join(VALIDATION_DIR, "validation_report.csv")
    }
    
    compiled_bundle = {}
    
    for key, path in files_to_export.items():
        data = load_csv(path)
        compiled_bundle[key] = data
        json_path = os.path.join(WEB_DATA_DIR, f"{key}.json")
        with open(json_path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)
        print(f"  Exported {len(data)} items -> {key}.json")
        
    master_bundle_path = os.path.join(WEB_DATA_DIR, "dhoni_warehouse_bundle.json")
    with open(master_bundle_path, "w", encoding="utf-8") as f:
        json.dump(compiled_bundle, f, indent=2)
        
    print(f"\nMaster unified bundle exported to: {master_bundle_path}")
    print("Web export finished successfully.")

if __name__ == "__main__":
    main()
