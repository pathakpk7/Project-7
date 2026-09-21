"""
03_extract_keeper_captain.py
Extracts granular wicketkeeping records (catches, stumpings, run-outs)
and captaincy match records (wins, losses, win %, toss decisions)
from Cricsheet match files.
"""

import os
import sys
import json
import zipfile
import csv

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
RAW_DIR = os.path.join(BASE_DIR, "data", "raw")
PROCESSED_DIR = os.path.join(BASE_DIR, "data", "processed")

DHONI_CRICSHEET_ID = "4a8a2e3b"
DHONI_NAMES = {"MS Dhoni", "M S Dhoni", "MSD", "Mahendra Singh Dhoni"}

def is_dhoni_involved(info):
    registry = info.get("registry", {}).get("people", {})
    for name, pid in registry.items():
        if pid == DHONI_CRICSHEET_ID or name in DHONI_NAMES:
            return name
    players = info.get("players", {})
    for team, team_players in players.items():
        for p in team_players:
            if p in DHONI_NAMES:
                return p
    return None

def normalize_format_and_comp(info, default_fmt, dhoni_team):
    raw_match_type = str(info.get("match_type", "")).lower()
    event_info = info.get("event", {})
    event_name = event_info.get("name", "")
    event_lower = event_name.lower()
    
    if raw_match_type == "test" or default_fmt == "TEST":
        return "TEST", "Test Series"
    if raw_match_type == "odi" or default_fmt == "ODI":
        return "ODI", event_name if event_name else "ODI Series"
    if raw_match_type in ["it20", "t20i"] or default_fmt == "T20I":
        return "T20I", event_name if event_name else "T20I Series"
    if "indian premier league" in event_lower or "ipl" in event_lower or default_fmt == "IPL":
        if "champions league" in event_lower or "clt20" in event_lower:
            return "CLT20", "Champions League Twenty20"
        return "IPL", "Indian Premier League"
    if "champions league" in event_lower or "clt20" in event_lower:
        return "CLT20", "Champions League Twenty20"
    if dhoni_team == "India":
        return "T20I", event_name if event_name else "T20I Series"
    if dhoni_team in ["Chennai Super Kings", "Rising Pune Supergiant", "Rising Pune Supergiants"]:
        if "champions league" in event_lower:
            return "CLT20", "Champions League Twenty20"
        return "IPL", "Indian Premier League"
    if raw_match_type == "t20":
        return "OTHER_T20", event_name if event_name else "Domestic T20"
    return default_fmt, event_name if event_name else raw_match_type

def main():
    print("=" * 60)
    print("STEP 3: EXTRACTING WICKETKEEPING & CAPTAINCY RECORDS")
    print("=" * 60)
    
    archives = [
        ("tests_male_json.zip", "TEST"),
        ("odis_male_json.zip", "ODI"),
        ("it20s_male_json.zip", "T20I"),
        ("ipl_male_json.zip", "IPL"),
        ("t20s_male_json.zip", "OTHER_T20")
    ]
    
    wicketkeeping_records = []
    captaincy_records = []
    seen_matches = set()
    
    for filename, default_fmt in archives:
        zip_path = os.path.join(RAW_DIR, filename)
        if not os.path.exists(zip_path):
            continue
            
        with zipfile.ZipFile(zip_path, 'r') as z:
            namelist = [n for n in z.namelist() if n.endswith('.json')]
            for fn in namelist:
                match_id = os.path.splitext(os.path.basename(fn))[0]
                if match_id in seen_matches:
                    continue
                    
                try:
                    data = json.loads(z.read(fn).decode('utf-8'))
                except Exception:
                    continue
                    
                info = data.get("info", {})
                dhoni_name = is_dhoni_involved(info)
                if not dhoni_name:
                    continue
                    
                seen_matches.add(match_id)
                
                dates = info.get("dates", [])
                match_date = dates[0] if dates else "Unknown"
                match_year = int(match_date.split("-")[0]) if match_date != "Unknown" and "-" in match_date else 0
                season = str(info.get("season", match_year))
                
                players_dict = info.get("players", {})
                dhoni_team = None
                opponent = None
                for t, p_list in players_dict.items():
                    if dhoni_name in p_list:
                        dhoni_team = t
                    else:
                        opponent = t
                        
                fmt, comp = normalize_format_and_comp(info, default_fmt, dhoni_team)
                venue = info.get("venue", "")
                
                catches = 0
                stumpings = 0
                run_outs = 0
                
                innings = data.get("innings", [])
                for inn in innings:
                    inn_team = inn.get("team", "")
                    if inn_team != dhoni_team:
                        overs = inn.get("overs", [])
                        for over_obj in overs:
                            deliveries = over_obj.get("deliveries", [])
                            for d in deliveries:
                                wickets = d.get("wickets", [])
                                for w in wickets:
                                    kind = w.get("kind", "")
                                    fielders = [f.get("name", "") for f in w.get("fielders", []) if "name" in f]
                                    if dhoni_name in fielders:
                                        if kind == "caught":
                                            catches += 1
                                        elif kind == "stumped":
                                            stumpings += 1
                                        elif kind == "run out":
                                            run_outs += 1
                                            
                total_wk_dismissals = catches + stumpings
                
                wicketkeeping_records.append({
                    "match_id": match_id,
                    "date": match_date,
                    "year": match_year,
                    "format": fmt,
                    "competition": comp,
                    "team": dhoni_team,
                    "opponent": opponent,
                    "venue": venue,
                    "catches": catches,
                    "stumpings": stumpings,
                    "run_outs": run_outs,
                    "total_dismissals": total_wk_dismissals
                })
                
                captains = info.get("captains", {})
                is_cap = False
                if captains.get(dhoni_team) == dhoni_name:
                    is_cap = True
                elif dhoni_name in info.get("team_captains", {}).get(dhoni_team, []):
                    is_cap = True
                else:
                    if dhoni_team == "India":
                        if fmt == "TEST" and "2008-04-11" <= match_date <= "2014-12-30" and match_id != "345671":
                            if not captains: is_cap = True
                        elif fmt == "ODI" and ("2007-09-29" <= match_date <= "2016-10-29" or match_date == "2018-09-25"):
                            if not captains: is_cap = True
                        elif fmt == "T20I" and "2007-09-13" <= match_date <= "2016-09-01":
                            if not captains: is_cap = True
                    elif dhoni_team == "Chennai Super Kings":
                        if season in ["2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2018", "2019", "2020", "2021", "2023"]:
                            if not captains: is_cap = True
                        elif season == "2022":
                            if match_date >= "2022-05-01": is_cap = True
                    elif dhoni_team in ["Rising Pune Supergiant", "Rising Pune Supergiants"]:
                        if season == "2016": is_cap = True
                            
                if is_cap:
                    toss = info.get("toss", {})
                    outcome = info.get("outcome", {})
                    winner = outcome.get("winner", "")
                    result = outcome.get("result", "")
                    
                    outcome_status = "LOST"
                    if winner == dhoni_team:
                        outcome_status = "WON"
                    elif result == "tie":
                        outcome_status = "TIED"
                    elif result == "draw":
                        outcome_status = "DRAWN"
                    elif result == "no result" or outcome.get("result") == "no result":
                        outcome_status = "NO_RESULT"
                        
                    margin = ""
                    by_dict = outcome.get("by", {})
                    if "runs" in by_dict:
                        margin = f"{by_dict['runs']} runs"
                    elif "wickets" in by_dict:
                        margin = f"{by_dict['wickets']} wickets"
                    elif "innings" in by_dict:
                        margin = f"Innings & {by_dict.get('runs', 0)} runs"
                        
                    captaincy_records.append({
                        "match_id": match_id,
                        "date": match_date,
                        "year": match_year,
                        "format": fmt,
                        "competition": comp,
                        "team": dhoni_team,
                        "opponent": opponent,
                        "venue": venue,
                        "toss_winner": toss.get("winner", ""),
                        "toss_decision": toss.get("decision", ""),
                        "toss_won_by_dhoni": (toss.get("winner", "") == dhoni_team),
                        "winner": winner,
                        "result": outcome_status,
                        "margin": margin
                    })
                    
    wicketkeeping_records.sort(key=lambda x: (x["date"], x["match_id"]))
    captaincy_records.sort(key=lambda x: (x["date"], x["match_id"]))
    
    wk_path = os.path.join(PROCESSED_DIR, "dhoni_wicketkeeping.csv")
    cap_path = os.path.join(PROCESSED_DIR, "dhoni_captaincy.csv")
    
    with open(wk_path, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=wicketkeeping_records[0].keys())
        w.writeheader()
        w.writerows(wicketkeeping_records)
        
    with open(cap_path, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=captaincy_records[0].keys())
        w.writeheader()
        w.writerows(captaincy_records)
        
    print(f"  Extracted {len(wicketkeeping_records)} wicketkeeping match entries.")
    print(f"  Extracted {len(captaincy_records)} captaincy match entries.")
    print("Wicketkeeping & captaincy extraction complete.")

if __name__ == "__main__":
    main()
