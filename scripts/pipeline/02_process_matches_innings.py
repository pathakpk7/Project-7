"""
02_process_matches_innings.py
Parses Cricsheet raw JSON archives, resolves MS Dhoni across all matches,
derives exact chronological batting positions (1 to 11) from ball-by-ball arrival,
extracts match-level and master innings-level records, and saves structured CSVs.
"""

import os
import sys
import json
import zipfile
import csv
import datetime

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
RAW_DIR = os.path.join(BASE_DIR, "data", "raw")
PROCESSED_DIR = os.path.join(BASE_DIR, "data", "processed")
MASTER_DIR = os.path.join(BASE_DIR, "data", "master")

os.makedirs(PROCESSED_DIR, exist_ok=True)
os.makedirs(MASTER_DIR, exist_ok=True)

DHONI_CRICSHEET_ID = "4a8a2e3b"
DHONI_NAMES = {"MS Dhoni", "M S Dhoni", "MSD", "Mahendra Singh Dhoni"}

VENUE_COUNTRY_MAP = {
    # India
    "Wankhede Stadium": "India", "Eden Gardens": "India", "M Chinnaswamy Stadium": "India",
    "MA Chidambaram Stadium": "India", "Feroz Shah Kotla": "India", "Arun Jaitley Stadium": "India",
    "Punjab Cricket Association Stadium": "India", "Sawai Mansingh Stadium": "India",
    "Rajiv Gandhi International Stadium": "India", "Vidarbha Cricket Association Stadium": "India",
    "Green Park": "India", "Brabourne Stadium": "India", "Dr. Y.S. Rajasekhara Reddy ACA-VDCA Cricket Stadium": "India",
    "Holkar Cricket Stadium": "India", "Maharashtra Cricket Association Stadium": "India",
    "Barabati Stadium": "India", "JSCA International Stadium Complex": "India", "Sardar Patel Stadium": "India",
    "Narendra Modi Stadium": "India", "Nehru Stadium": "India", "IPCL Sports Complex Ground": "India",
    "Madhavrao Scindia Cricket Ground": "India", "Sector 16 Stadium": "India", "Barkatullah Khan Stadium": "India",
    "Bharat Ratna Shri Atal Bihari Vajpayee Ekana Cricket Stadium": "India", "Barsapara Cricket Stadium": "India",
    "Himachal Pradesh Cricket Association Stadium": "India", "Subrata Roy Sahara Stadium": "India",
    # England
    "Lord's": "England", "The Oval": "England", "Kennington Oval": "England", "Edgbaston": "England",
    "Trent Bridge": "England", "Headingley": "England", "Old Trafford": "England", "Sophia Gardens": "England",
    "The Rose Bowl": "England", "St Lawrence Ground": "England", "Riverside Ground": "England",
    # Australia
    "Melbourne Cricket Ground": "Australia", "Sydney Cricket Ground": "Australia", "Adelaide Oval": "Australia",
    "Brisbane Cricket Ground": "Australia", "Gabba": "Australia", "W.A.C.A. Ground": "Australia",
    "Perth Stadium": "Australia", "Manuka Oval": "Australia", "Bellerive Oval": "Australia",
    # South Africa
    "New Wanderers Stadium": "South Africa", "Wanderers Stadium": "South Africa", "Kingsmead": "South Africa",
    "SuperSport Park": "South Africa", "Newlands": "South Africa", "St George's Park": "South Africa",
    "Buffalo Park": "South Africa", "Mangaung Oval": "South Africa", "De Beers Diamond Oval": "South Africa",
    # New Zealand
    "Eden Park": "New Zealand", "Seddon Park": "New Zealand", "Basin Reserve": "New Zealand",
    "Westpac Stadium": "New Zealand", "McLean Park": "New Zealand", "University Oval": "New Zealand",
    "AMI Stadium": "New Zealand", "Hagley Oval": "New Zealand", "Cobham Oval": "New Zealand",
    # Sri Lanka
    "R Premadasa Stadium": "Sri Lanka", "Sinhalese Sports Club Ground": "Sri Lanka", "P Sara Oval": "Sri Lanka",
    "Galle International Stadium": "Sri Lanka", "Pallekele International Cricket Stadium": "Sri Lanka",
    "Rangiri Dambulla International Stadium": "Sri Lanka", "Tyronne Fernando Stadium": "Sri Lanka",
    # West Indies
    "Kensington Oval": "Barbados", "Queen's Park Oval": "Trinidad and Tobago", "Sabina Park": "Jamaica",
    "Beausejour Stadium": "Saint Lucia", "Darren Sammy National Cricket Stadium": "Saint Lucia",
    "Providence Stadium": "Guyana", "Sir Vivian Richards Stadium": "Antigua and Barbuda",
    "Warner Park": "Saint Kitts and Nevis", "Arnos Vale Ground": "Saint Vincent and the Grenadines",
    # UAE
    "Dubai International Cricket Stadium": "United Arab Emirates", "Sharjah Cricket Stadium": "United Arab Emirates",
    "Sheikh Zayed Stadium": "United Arab Emirates",
    # Bangladesh
    "Sher-e-Bangla National Cricket Stadium": "Bangladesh", "Zohur Ahmed Chowdhury Stadium": "Bangladesh",
    "Khan Shaheb Osman Ali Stadium": "Bangladesh", "Bangabandhu National Stadium": "Bangladesh",
    # Pakistan
    "National Stadium": "Pakistan", "Gaddafi Stadium": "Pakistan", "Rawalpindi Cricket Stadium": "Pakistan",
    "Iqbal Stadium": "Pakistan", "Multan Cricket Stadium": "Pakistan", "Arbab Niaz Stadium": "Pakistan",
    # Zimbabwe
    "Harare Sports Club": "Zimbabwe", "Queens Sports Club": "Zimbabwe",
    # Others
    "Central Broward Regional Park Stadium Turf Ground": "United States of America"
}

def determine_country(venue, city, teams):
    if not venue:
        return "Unknown"
    for v_key, country in VENUE_COUNTRY_MAP.items():
        if v_key.lower() in venue.lower():
            return country
    if city:
        city_lower = city.lower()
        if city_lower in ["mumbai", "delhi", "chennai", "kolkata", "bengaluru", "bangalore", "hyderabad", "ahmedabad", "pune", "jaipur", "mohali", "cuttack", "nagpur", "kanpur", "ranchi", "dharamsala", "indore", "visakhapatnam", "lucknow", "guwahati", "rajkot", "vadodara", "gwalior", "kochi"]:
            return "India"
        if city_lower in ["london", "birmingham", "nottingham", "leeds", "manchester", "cardiff", "southampton", "chester-le-street", "bristol", "taunton"]:
            return "England"
        if city_lower in ["melbourne", "sydney", "adelaide", "brisbane", "perth", "canberra", "hobart"]:
            return "Australia"
        if city_lower in ["johannesburg", "durban", "centurion", "cape town", "port elizabeth", "gqeberha", "bloemfontein", "east london", "potchefstroom", "kimberley"]:
            return "South Africa"
        if city_lower in ["auckland", "hamilton", "wellington", "napier", "dunedin", "christchurch", "whangarei"]:
            return "New Zealand"
        if city_lower in ["colombo", "galle", "kandy", "dambulla"]:
            return "Sri Lanka"
        if city_lower in ["dubai", "sharjah", "abu dhabi"]:
            return "United Arab Emirates"
        if city_lower in ["mirpur", "dhaka", "chittagong", "fatullah"]:
            return "Bangladesh"
        if city_lower in ["karachi", "lahore", "rawalpindi", "multan", "faisalabad", "peshawar"]:
            return "Pakistan"
        if city_lower in ["harare", "bulawayo"]:
            return "Zimbabwe"
        if city_lower in ["kingston", "port of spain", "bridgetown", "gros islet", "st lucia", "st john's", "antigua", "basseterre", "providence"]:
            return "West Indies"
        if city_lower in ["lauderhill", "florida", "dallas", "new york"]:
            return "United States of America"
    return "Unknown"

def determine_home_away(dhoni_team, opponent, country, venue, city, fmt):
    if dhoni_team in ["India", "Indians"]:
        if country == "India":
            return "HOME"
        elif country in ["England", "Australia", "South Africa", "New Zealand", "Sri Lanka", "Pakistan", "West Indies", "Bangladesh", "Zimbabwe", "Barbados", "Trinidad and Tobago", "Jamaica", "Saint Lucia", "Guyana", "Antigua and Barbuda"]:
            opp_lower = opponent.lower() if opponent else ""
            if (country.lower() in opp_lower) or (country == "West Indies" and opp_lower == "west indies") or (country in ["Barbados", "Trinidad and Tobago", "Jamaica", "Saint Lucia", "Guyana", "Antigua and Barbuda"] and opp_lower == "west indies") or (country == "England" and opp_lower == "england") or (country == "Australia" and opp_lower == "australia") or (country == "South Africa" and opp_lower == "south africa") or (country == "New Zealand" and opp_lower == "new zealand") or (country == "Sri Lanka" and opp_lower == "sri lanka") or (country == "Bangladesh" and opp_lower == "bangladesh") or (country == "Zimbabwe" and opp_lower == "zimbabwe") or (country == "Pakistan" and opp_lower == "pakistan"):
                return "AWAY"
            else:
                return "NEUTRAL"
        else:
            return "NEUTRAL"
    elif dhoni_team == "Chennai Super Kings":
        if "Chidambaram" in venue or "Chennai" in city or "Chepauk" in venue:
            return "HOME"
        elif country in ["United Arab Emirates", "South Africa"]:
            return "NEUTRAL"
        else:
            return "AWAY"
    elif dhoni_team in ["Rising Pune Supergiant", "Rising Pune Supergiants"]:
        if "Pune" in city or "Maharashtra Cricket Association" in venue or "Subrata Roy" in venue:
            return "HOME"
        else:
            return "AWAY"
    return "NEUTRAL"

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
        # Ensure CLT20 is not misclassified as IPL
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

def process_archive(zip_path, default_fmt):
    if not os.path.exists(zip_path):
        return [], [], []
        
    matches_list = []
    innings_list = []
    bbb_list = []
    
    with zipfile.ZipFile(zip_path, 'r') as z:
        namelist = [n for n in z.namelist() if n.endswith('.json')]
        for filename in namelist:
            try:
                data = json.loads(z.read(filename).decode('utf-8'))
            except Exception:
                continue
                
            info = data.get("info", {})
            dhoni_name = is_dhoni_involved(info)
            if not dhoni_name:
                continue
                
            match_id = os.path.splitext(os.path.basename(filename))[0]
            dates = info.get("dates", [])
            match_date = dates[0] if dates else "Unknown"
            match_year = int(match_date.split("-")[0]) if match_date != "Unknown" and "-" in match_date else 0
            match_month = int(match_date.split("-")[1]) if match_date != "Unknown" and len(match_date.split("-")) > 1 else 0
            
            # Teams
            teams = info.get("teams", [])
            players_dict = info.get("players", {})
            dhoni_team = None
            opponent = None
            for t, p_list in players_dict.items():
                if dhoni_name in p_list:
                    dhoni_team = t
                else:
                    opponent = t
            if not dhoni_team and len(teams) == 2:
                dhoni_team = teams[0]
                opponent = teams[1]
                
            fmt, comp = normalize_format_and_comp(info, default_fmt, dhoni_team)
            
            event_info = info.get("event", {})
            tournament_stage = event_info.get("stage", "")
            season = str(info.get("season", match_year))
            
            venue = info.get("venue", "")
            city = info.get("city", "")
            country = determine_country(venue, city, teams)
            
            toss = info.get("toss", {})
            toss_winner = toss.get("winner", "")
            toss_decision = toss.get("decision", "")
            
            outcome = info.get("outcome", {})
            match_winner = outcome.get("winner", "")
            result_type = outcome.get("result", "")
            
            if match_winner == dhoni_team:
                match_result = "WON"
            elif match_winner == opponent:
                match_result = "LOST"
            elif result_type == "tie":
                match_result = "TIED"
            elif result_type == "draw":
                match_result = "DRAWN"
            elif result_type == "no result" or outcome.get("result") == "no result":
                match_result = "NO_RESULT"
            else:
                match_result = "NO_RESULT" if not match_winner else ("WON" if match_winner == dhoni_team else "LOST")
                
            margin = ""
            by_dict = outcome.get("by", {})
            if "runs" in by_dict:
                margin = f"{by_dict['runs']} runs"
            elif "wickets" in by_dict:
                margin = f"{by_dict['wickets']} wickets"
            elif "innings" in by_dict:
                margin = f"Innings & {by_dict.get('runs', 0)} runs"
                
            poms = info.get("player_of_match", [])
            is_pom = (dhoni_name in poms)
            
            captains = info.get("captains", {})
            is_captain = False
            if captains.get(dhoni_team) == dhoni_name:
                is_captain = True
            elif dhoni_name in info.get("team_captains", {}).get(dhoni_team, []):
                is_captain = True
            else:
                # Historical verification
                if dhoni_team == "India":
                    if fmt == "TEST" and "2008-04-11" <= match_date <= "2014-12-30" and match_id != "345671":
                        if not captains: is_captain = True
                    elif fmt == "ODI" and ("2007-09-29" <= match_date <= "2016-10-29" or match_date == "2018-09-25"):
                        if not captains: is_captain = True
                    elif fmt == "T20I" and "2007-09-13" <= match_date <= "2016-09-01":
                        if not captains: is_captain = True
                elif dhoni_team == "Chennai Super Kings":
                    if season in ["2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2018", "2019", "2020", "2021", "2023"]:
                        if not captains: is_captain = True
                    elif season == "2022":
                        # Ravindra Jadeja captained first 8 matches (up to 2022-04-30), Dhoni resumed from 2022-05-01
                        if match_date >= "2022-05-01": is_captain = True
                elif dhoni_team in ["Rising Pune Supergiant", "Rising Pune Supergiants"]:
                    if season == "2016": is_captain = True
                    
            home_away = determine_home_away(dhoni_team, opponent, country, venue, city, fmt)
            
            matches_list.append({
                "match_id": match_id,
                "date": match_date,
                "year": match_year,
                "month": match_month,
                "format": fmt,
                "competition": comp,
                "season": season,
                "team": dhoni_team,
                "opponent": opponent,
                "venue": venue,
                "city": city,
                "country": country,
                "home_away": home_away,
                "toss_winner": toss_winner,
                "toss_decision": toss_decision,
                "winner": match_winner,
                "result": match_result,
                "margin": margin,
                "captain": is_captain,
                "player_of_match": is_pom,
                "tournament_stage": tournament_stage
            })
            
            # Parse Innings & Ball-by-Ball
            raw_innings = data.get("innings", [])
            first_inns_total = None
            
            for inn_idx, inn in enumerate(raw_innings):
                inn_team = inn.get("team", "")
                inn_num = inn_idx + 1
                
                batter_arrival_order = []
                dhoni_faced_balls = []
                dhoni_dismissal = None
                
                overs = inn.get("overs", [])
                inn_total_runs = 0
                
                for over_obj in overs:
                    over_num = over_obj.get("over", 0)
                    deliveries = over_obj.get("deliveries", [])
                    for del_idx, d in enumerate(deliveries):
                        batter = d.get("batter", "")
                        bowler = d.get("bowler", "")
                        non_striker = d.get("non_striker", "")
                        runs_dict = d.get("runs", {})
                        batter_runs = runs_dict.get("batter", 0)
                        extras_runs = runs_dict.get("extras", 0)
                        total_runs = runs_dict.get("total", 0)
                        inn_total_runs += total_runs
                        
                        extras_dict = d.get("extras", {})
                        is_wide = "wides" in extras_dict
                        is_noball = "noballs" in extras_dict
                        
                        if batter and batter not in batter_arrival_order:
                            batter_arrival_order.append(batter)
                        if non_striker and non_striker not in batter_arrival_order:
                            batter_arrival_order.append(non_striker)
                            
                        if batter == dhoni_name:
                            dhoni_faced_balls.append({
                                "over": over_num,
                                "ball": del_idx + 1,
                                "bowler": bowler,
                                "non_striker": non_striker,
                                "batter_runs": batter_runs,
                                "extras_runs": extras_runs,
                                "total_runs": total_runs,
                                "is_wide": is_wide,
                                "is_noball": is_noball,
                                "is_four": (batter_runs == 4),
                                "is_six": (batter_runs == 6),
                                "is_dot": (total_runs == 0)
                            })
                            
                            bbb_list.append({
                                "match_id": match_id,
                                "format": fmt,
                                "innings_number": inn_num,
                                "over": over_num,
                                "ball_in_over": del_idx + 1,
                                "batter": dhoni_name,
                                "bowler": bowler,
                                "non_striker": non_striker,
                                "batter_runs": batter_runs,
                                "extras_runs": extras_runs,
                                "total_runs": total_runs,
                                "is_wide": is_wide,
                                "is_noball": is_noball
                            })
                            
                        wickets = d.get("wickets", [])
                        for w in wickets:
                            player_out = w.get("player_out", "")
                            kind = w.get("kind", "")
                            fielders = [f.get("name", "") for f in w.get("fielders", []) if "name" in f]
                            if player_out == dhoni_name:
                                dhoni_dismissal = {
                                    "kind": kind,
                                    "bowler": bowler,
                                    "fielders": ", ".join(fielders) if fielders else ""
                                }
                                
                if inn_idx == 0:
                    first_inns_total = inn_total_runs
                    
                if inn_team == dhoni_team:
                    did_bat = (dhoni_name in batter_arrival_order)
                    batting_pos = (batter_arrival_order.index(dhoni_name) + 1) if did_bat else None
                    
                    if did_bat:
                        total_batter_runs = sum(b["batter_runs"] for b in dhoni_faced_balls)
                        valid_balls_faced = sum(1 for b in dhoni_faced_balls if not b["is_wide"])
                        fours_count = sum(1 for b in dhoni_faced_balls if b["is_four"])
                        sixes_count = sum(1 for b in dhoni_faced_balls if b["is_six"])
                        dots_count = sum(1 for b in dhoni_faced_balls if b["is_dot"])
                        strike_rate = round((total_batter_runs / valid_balls_faced * 100), 2) if valid_balls_faced > 0 else 0.0
                        
                        is_dismissed = (dhoni_dismissal is not None)
                        is_not_out = not is_dismissed
                        dismissal_kind = dhoni_dismissal["kind"] if is_dismissed else "not out"
                        dismissal_bowler = dhoni_dismissal["bowler"] if is_dismissed else ""
                        dismissal_fielder = dhoni_dismissal["fielders"] if is_dismissed else ""
                        
                        is_chasing = (inn_num in [2, 4])
                        target = (first_inns_total + 1) if (is_chasing and first_inns_total is not None and inn_num == 2) else None
                        
                        innings_list.append({
                            "match_id": match_id,
                            "innings_id": f"{match_id}_{inn_num}",
                            "date": match_date,
                            "year": match_year,
                            "month": match_month,
                            "format": fmt,
                            "competition": comp,
                            "season": season,
                            "team": dhoni_team,
                            "opponent": opponent,
                            "venue": venue,
                            "city": city,
                            "country": country,
                            "home_away": home_away,
                            "innings_number": inn_num,
                            "batting_position": batting_pos,
                            "runs": total_batter_runs,
                            "balls_faced": valid_balls_faced,
                            "fours": fours_count,
                            "sixes": sixes_count,
                            "dots": dots_count,
                            "strike_rate": strike_rate,
                            "dismissed": is_dismissed,
                            "not_out": is_not_out,
                            "dismissal_type": dismissal_kind,
                            "bowler": dismissal_bowler,
                            "fielder": dismissal_fielder,
                            "captain": is_captain,
                            "chasing": is_chasing,
                            "target": target,
                            "result": match_result,
                            "margin": margin,
                            "player_of_match": is_pom,
                            "tournament_stage": tournament_stage
                        })
                        
    return matches_list, innings_list, bbb_list

def write_csv(data, filepath):
    if not data:
        return
    with open(filepath, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=data[0].keys())
        writer.writeheader()
        writer.writerows(data)
    print(f"  Saved {len(data)} records to: {filepath}")

def main():
    print("=" * 60)
    print("STEP 2: PROCESSING MATCHES, INNINGS & BATTING POSITIONS")
    print("=" * 60)
    
    all_matches = []
    all_innings = []
    all_bbb = []
    
    # Priority order: Tests, ODIs, IT20s, IPL, All T20s
    archives = [
        ("tests_male_json.zip", "TEST"),
        ("odis_male_json.zip", "ODI"),
        ("it20s_male_json.zip", "T20I"),
        ("ipl_male_json.zip", "IPL"),
        ("t20s_male_json.zip", "OTHER_T20")
    ]
    
    seen_matches = {}
    seen_innings = {}
    
    for filename, default_fmt in archives:
        zip_path = os.path.join(RAW_DIR, filename)
        m_list, i_list, b_list = process_archive(zip_path, default_fmt)
        
        for m in m_list:
            mid = m["match_id"]
            if mid not in seen_matches:
                seen_matches[mid] = m
                all_matches.append(m)
            else:
                # If previously parsed as OTHER_T20 but now identified specifically, refine
                if seen_matches[mid]["format"] == "OTHER_T20" and m["format"] in ["T20I", "IPL", "CLT20"]:
                    seen_matches[mid] = m
                    
        for inn in i_list:
            inid = inn["innings_id"]
            if inid not in seen_innings:
                seen_innings[inid] = inn
                all_innings.append(inn)
            else:
                if seen_innings[inid]["format"] == "OTHER_T20" and inn["format"] in ["T20I", "IPL", "CLT20"]:
                    seen_innings[inid] = inn
                    
        all_bbb.extend(b_list)
        
    all_matches.sort(key=lambda x: (x["date"], x["match_id"]))
    all_innings.sort(key=lambda x: (x["date"], x["innings_id"]))
    
    print("\n" + "=" * 60)
    print("EXTRACTION SUMMARY:")
    print(f"  Total Dhoni Matches: {len(all_matches)}")
    print(f"  Total Dhoni Innings Batted: {len(all_innings)}")
    print(f"  Total Dhoni Ball-by-Ball Records: {len(all_bbb)}")
    print("=" * 60)
    
    write_csv(all_matches, os.path.join(PROCESSED_DIR, "dhoni_matches.csv"))
    write_csv(all_innings, os.path.join(PROCESSED_DIR, "dhoni_innings.csv"))
    write_csv(all_innings, os.path.join(MASTER_DIR, "ms_dhoni_master_innings.csv"))
    write_csv(all_bbb, os.path.join(PROCESSED_DIR, "dhoni_ball_by_ball.csv"))
    
    print("Processing step completed successfully.")

if __name__ == "__main__":
    main()
