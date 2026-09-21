"""
run_pipeline.py
Master runner script that executes the complete MS Dhoni Cricket Data Warehouse pipeline
from raw JSON parsing to analytics generation, verification, and web asset export.
"""

import subprocess
import sys
import os

SCRIPTS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "pipeline")

STEPS = [
    ("02_process_matches_innings.py", "Extract Matches, Innings & Batting Positions"),
    ("03_extract_keeper_captain.py", "Extract Wicketkeeping & Captaincy Data"),
    ("04_build_analytics.py", "Compute 22+ Analytical Aggregations & Reference Tables"),
    ("05_validate_data.py", "Run Verification Suite Against Authoritative Benchmarks"),
    ("export_web_data.py", "Export High-Performance JSON Bundles for Web UI")
]

def run_step(script_name, description):
    print("\n" + "=" * 70)
    print(f"RUNNING: {description} ({script_name})")
    print("=" * 70)
    script_path = os.path.join(SCRIPTS_DIR, script_name)
    res = subprocess.run([sys.executable, script_path])
    if res.returncode != 0:
        print(f"Error: Step {script_name} failed with exit code {res.returncode}")
        sys.exit(res.returncode)

def main():
    print("=" * 70)
    print("CAPTAIN COOL: DECODED — DATA WAREHOUSE PIPELINE ENGINE")
    print("=" * 70)
    for script_name, desc in STEPS:
        run_step(script_name, desc)
    print("\n" + "=" * 70)
    print("PIPELINE EXECUTION COMPLETED SUCCESSFULLY!")
    print("=" * 70)

if __name__ == "__main__":
    main()
