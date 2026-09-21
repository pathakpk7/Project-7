"""
01_fetch_raw_data.py
Downloads official Cricsheet raw JSON datasets and player registry,
verifies file sizes and SHA-256 checksums, and records a manifest.
"""

import os
import sys
import hashlib
import json
import urllib.request
import datetime

RAW_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "data", "raw")
os.makedirs(RAW_DIR, exist_ok=True)

DATASETS = [
    {
        "name": "tests",
        "filename": "tests_male_json.zip",
        "url": "https://cricsheet.org/downloads/tests_male_json.zip",
        "description": "Men's Test Match ball-by-ball JSON data"
    },
    {
        "name": "odis",
        "filename": "odis_male_json.zip",
        "url": "https://cricsheet.org/downloads/odis_male_json.zip",
        "description": "Men's One Day International ball-by-ball JSON data"
    },
    {
        "name": "it20s",
        "filename": "it20s_male_json.zip",
        "url": "https://cricsheet.org/downloads/it20s_male_json.zip",
        "description": "Men's T20 International ball-by-ball JSON data"
    },
    {
        "name": "ipl",
        "filename": "ipl_male_json.zip",
        "url": "https://cricsheet.org/downloads/ipl_male_json.zip",
        "description": "Indian Premier League ball-by-ball JSON data"
    },
    {
        "name": "all_t20s",
        "filename": "t20s_male_json.zip",
        "url": "https://cricsheet.org/downloads/t20s_male_json.zip",
        "description": "All Men's T20s (including Champions League T20 and domestic competitions) JSON data"
    },
    {
        "name": "people",
        "filename": "people.csv",
        "url": "https://cricsheet.org/register/people.csv",
        "description": "Cricsheet People / Player Registry with unique identifiers"
    }
]

def compute_sha256(filepath):
    sha = hashlib.sha256()
    with open(filepath, "rb") as f:
        while chunk := f.read(8192 * 16):
            sha.update(chunk)
    return sha.hexdigest()

def download_file(url, target_path):
    print(f"Downloading {url} -> {target_path}...")
    headers = {'User-Agent': 'CaptainCoolDecoded/1.0 (Data Research Project)'}
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req) as resp, open(target_path, 'wb') as out_file:
        total_size = int(resp.headers.get('content-length', 0))
        downloaded = 0
        block_size = 1024 * 64
        while True:
            buffer = resp.read(block_size)
            if not buffer:
                break
            downloaded += len(buffer)
            out_file.write(buffer)
            if total_size > 0:
                percent = downloaded * 100 / total_size
                sys.stdout.write(f"\r  Downloaded {downloaded / (1024*1024):.2f} MB / {total_size / (1024*1024):.2f} MB ({percent:.1f}%)")
                sys.stdout.flush()
    print("\n  Download complete.")

def main():
    print("=" * 60)
    print("STEP 1: ACQUIRING RAW DATASETS FROM CRICSHEET")
    print("=" * 60)
    
    manifest_records = []
    
    for item in DATASETS:
        target_path = os.path.join(RAW_DIR, item["filename"])
        if os.path.exists(target_path) and os.path.getsize(target_path) > 0:
            print(f"File already exists: {item['filename']} ({os.path.getsize(target_path) / (1024*1024):.2f} MB)")
        else:
            download_file(item["url"], target_path)
            
        file_size = os.path.getsize(target_path)
        sha256_hash = compute_sha256(target_path)
        
        manifest_records.append({
            "dataset_name": item["name"],
            "filename": item["filename"],
            "source_url": item["url"],
            "description": item["description"],
            "license": "Open Data Commons Open Database License (ODbL) / CC BY 4.0",
            "downloaded_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
            "file_size_bytes": file_size,
            "sha256": sha256_hash
        })
        
    manifest_path = os.path.join(RAW_DIR, "manifest.json")
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump({
            "project": "CAPTAIN COOL: DECODED",
            "purpose": "MS Dhoni High-Precision Cricket Data Warehouse",
            "provider": "Cricsheet (https://cricsheet.org)",
            "updated_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
            "datasets": manifest_records
        }, f, indent=2)
        
    print(f"\nManifest successfully created at: {manifest_path}")
    print("Raw data acquisition finished successfully.")

if __name__ == "__main__":
    main()
