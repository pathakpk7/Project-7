"""
04_build_analytics.py
Builds all 22+ aggregated analytical tables, including:
- Batting positions 1-11
- Position 1-4 vs 5-7 comparisons (Total runs / Total dismissals)
- Format stats, Yearly trends, Opponent stats, Venue stats, Home/Away/Neutral
- Chasing and Finishing (Death overs 16-20 T20 / 41-50 ODI)
- Wicketkeeping aggregates, Captaincy records, Tournament stats
- Reference datasets (Trophies, Milestones, Iconic moments, Player comparisons)
"""

import os
import sys
import csv
import json
from collections import defaultdict

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
PROCESSED_DIR = os.path.join(BASE_DIR, "data", "processed")
MASTER_DIR = os.path.join(BASE_DIR, "data", "master")
ANALYTICS_DIR = os.path.join(BASE_DIR, "data", "analytics")
REFERENCE_DIR = os.path.join(BASE_DIR, "data", "reference")

os.makedirs(ANALYTICS_DIR, exist_ok=True)
os.makedirs(REFERENCE_DIR, exist_ok=True)

def load_csv(filepath):
    if not os.path.exists(filepath):
        return []
    with open(filepath, "r", encoding="utf-8") as f:
        return list(csv.DictReader(f))

def write_csv(data, filepath):
    if not data:
        print(f"Warning: No data to write for {filepath}")
        return
    with open(filepath, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=data[0].keys())
        writer.writeheader()
        writer.writerows(data)
    print(f"  Saved {len(data)} records to: {filepath}")

def calc_avg(runs, dismissals):
    if dismissals == 0:
        return "NA [Not Out]" if runs > 0 else "0.00"
    return f"{(runs / dismissals):.2f}"

def calc_sr(runs, balls):
    if balls == 0:
        return "0.00"
    return f"{(runs / balls * 100):.2f}"

def main():
    print("=" * 60)
    print("STEP 4: GENERATING ANALYTICAL TABLES & REFERENCE DATASETS")
    print("=" * 60)
    
    innings = load_csv(os.path.join(MASTER_DIR, "ms_dhoni_master_innings.csv"))
    matches = load_csv(os.path.join(PROCESSED_DIR, "dhoni_matches.csv"))
    bbb = load_csv(os.path.join(PROCESSED_DIR, "dhoni_ball_by_ball.csv"))
    wk_matches = load_csv(os.path.join(PROCESSED_DIR, "dhoni_wicketkeeping.csv"))
    cap_matches = load_csv(os.path.join(PROCESSED_DIR, "dhoni_captaincy.csv"))
    
    print(f"Loaded {len(innings)} master innings, {len(matches)} matches, {len(bbb)} ball-by-ball rows.")

    # -------------------------------------------------------------
    # 1. POSITION STATS & POSITION FORMAT STATS
    # -------------------------------------------------------------
    pos_groups = defaultdict(lambda: {
        "innings": 0, "runs": 0, "balls": 0, "dismissals": 0, "not_outs": 0,
        "fours": 0, "sixes": 0, "fifties": 0, "hundreds": 0, "highest_score": 0, "is_hs_not_out": False
    })
    
    for row in innings:
        fmt = row["format"]
        pos = int(row["batting_position"]) if row["batting_position"] else 0
        if pos == 0:
            continue
            
        runs = int(row["runs"])
        balls = int(row["balls_faced"])
        is_dismissed = (row["dismissed"] == "True")
        fours = int(row["fours"])
        sixes = int(row["sixes"])
        
        # Key: (format, position)
        k = (fmt, pos)
        pos_groups[k]["innings"] += 1
        pos_groups[k]["runs"] += runs
        pos_groups[k]["balls"] += balls
        if is_dismissed:
            pos_groups[k]["dismissals"] += 1
        else:
            pos_groups[k]["not_outs"] += 1
        pos_groups[k]["fours"] += fours
        pos_groups[k]["sixes"] += sixes
        if 50 <= runs < 100:
            pos_groups[k]["fifties"] += 1
        elif runs >= 100:
            pos_groups[k]["hundreds"] += 1
        if runs > pos_groups[k]["highest_score"]:
            pos_groups[k]["highest_score"] = runs
            pos_groups[k]["is_hs_not_out"] = not is_dismissed
            
        # Also OVERALL position
        k_all = ("OVERALL", pos)
        pos_groups[k_all]["innings"] += 1
        pos_groups[k_all]["runs"] += runs
        pos_groups[k_all]["balls"] += balls
        if is_dismissed:
            pos_groups[k_all]["dismissals"] += 1
        else:
            pos_groups[k_all]["not_outs"] += 1
        pos_groups[k_all]["fours"] += fours
        pos_groups[k_all]["sixes"] += sixes
        if 50 <= runs < 100:
            pos_groups[k_all]["fifties"] += 1
        elif runs >= 100:
            pos_groups[k_all]["hundreds"] += 1
        if runs > pos_groups[k_all]["highest_score"]:
            pos_groups[k_all]["highest_score"] = runs
            pos_groups[k_all]["is_hs_not_out"] = not is_dismissed
            
    position_stats = []
    position_format_stats = []
    
    for (fmt, pos), data in sorted(pos_groups.items(), key=lambda x: (x[0][0], x[0][1])):
        avg = calc_avg(data["runs"], data["dismissals"])
        sr = calc_sr(data["runs"], data["balls"])
        hs_str = f"{data['highest_score']}*" if data["is_hs_not_out"] else str(data["highest_score"])
        
        position_stats.append({
            "format": fmt,
            "batting_position": pos,
            "innings": data["innings"],
            "runs": data["runs"],
            "balls_faced": data["balls"],
            "dismissals": data["dismissals"],
            "not_outs": data["not_outs"],
            "average": avg,
            "strike_rate": sr,
            "fours": data["fours"],
            "sixes": data["sixes"],
            "fifties": data["fifties"],
            "hundreds": data["hundreds"],
            "highest_score": hs_str
        })
        
        position_format_stats.append({
            "format": fmt,
            "position": pos,
            "innings": data["innings"],
            "runs": data["runs"],
            "dismissals": data["dismissals"],
            "average": avg,
            "strike_rate": sr
        })
        
    write_csv(position_stats, os.path.join(ANALYTICS_DIR, "dhoni_position_stats.csv"))
    write_csv(position_format_stats, os.path.join(ANALYTICS_DIR, "dhoni_position_format_stats.csv"))

    # -------------------------------------------------------------
    # 2. ROLE COMPARISONS (1-4 vs 5-7 and Standard Orders)
    # -------------------------------------------------------------
    role_groups = defaultdict(lambda: {
        "innings": 0, "runs": 0, "balls": 0, "dismissals": 0, "not_outs": 0,
        "fours": 0, "sixes": 0, "fifties": 0, "hundreds": 0
    })
    
    for row in innings:
        fmt = row["format"]
        pos = int(row["batting_position"]) if row["batting_position"] else 0
        if pos == 0:
            continue
            
        runs = int(row["runs"])
        balls = int(row["balls_faced"])
        is_dismissed = (row["dismissed"] == "True")
        fours = int(row["fours"])
        sixes = int(row["sixes"])
        
        roles_to_assign = []
        # Requested group
        if 1 <= pos <= 4:
            roles_to_assign.append("POS_1_4")
        elif 5 <= pos <= 7:
            roles_to_assign.append("POS_5_7")
        elif pos >= 8:
            roles_to_assign.append("POS_8_11")
            
        # Standard group
        if 1 <= pos <= 3:
            roles_to_assign.append("TOP_ORDER_1_3")
        elif 4 <= pos <= 6:
            roles_to_assign.append("MIDDLE_ORDER_4_6")
        elif pos >= 7:
            roles_to_assign.append("LOWER_ORDER_7_11")
            
        for role in roles_to_assign:
            for f_key in [fmt, "OVERALL"]:
                k = (f_key, role)
                role_groups[k]["innings"] += 1
                role_groups[k]["runs"] += runs
                role_groups[k]["balls"] += balls
                if is_dismissed:
                    role_groups[k]["dismissals"] += 1
                else:
                    role_groups[k]["not_outs"] += 1
                role_groups[k]["fours"] += fours
                role_groups[k]["sixes"] += sixes
                if 50 <= runs < 100:
                    role_groups[k]["fifties"] += 1
                elif runs >= 100:
                    role_groups[k]["hundreds"] += 1
                    
    role_comparison = []
    for (fmt, role), data in sorted(role_groups.items(), key=lambda x: (x[0][0], x[0][1])):
        avg = calc_avg(data["runs"], data["dismissals"])
        sr = calc_sr(data["runs"], data["balls"])
        role_comparison.append({
            "format": fmt,
            "role_group": role,
            "innings": data["innings"],
            "runs": data["runs"],
            "balls": data["balls"],
            "dismissals": data["dismissals"],
            "not_outs": data["not_outs"],
            "average": avg,
            "strike_rate": sr,
            "fifties": data["fifties"],
            "hundreds": data["hundreds"],
            "fours": data["fours"],
            "sixes": data["sixes"]
        })
    write_csv(role_comparison, os.path.join(ANALYTICS_DIR, "dhoni_role_comparison.csv"))

    # -------------------------------------------------------------
    # 3. FORMAT STATS
    # -------------------------------------------------------------
    fmt_matches_count = defaultdict(set)
    for m in matches:
        fmt_matches_count[m["format"]].add(m["match_id"])
        fmt_matches_count["OVERALL"].add(m["match_id"])
        if m["format"] in ["TEST", "ODI", "T20I"]:
            fmt_matches_count["ALL_INTERNATIONAL"].add(m["match_id"])
            
    format_agg = defaultdict(lambda: {
        "innings": 0, "runs": 0, "balls": 0, "dismissals": 0, "not_outs": 0,
        "fours": 0, "sixes": 0, "fifties": 0, "hundreds": 0, "highest_score": 0, "is_hs_not_out": False
    })
    
    for row in innings:
        fmt = row["format"]
        runs = int(row["runs"])
        balls = int(row["balls_faced"])
        is_dismissed = (row["dismissed"] == "True")
        fours = int(row["fours"])
        sixes = int(row["sixes"])
        
        formats = [fmt, "OVERALL"]
        if fmt in ["TEST", "ODI", "T20I"]:
            formats.append("ALL_INTERNATIONAL")
            
        for f in formats:
            format_agg[f]["innings"] += 1
            format_agg[f]["runs"] += runs
            format_agg[f]["balls"] += balls
            if is_dismissed:
                format_agg[f]["dismissals"] += 1
            else:
                format_agg[f]["not_outs"] += 1
            format_agg[f]["fours"] += fours
            format_agg[f]["sixes"] += sixes
            if 50 <= runs < 100:
                format_agg[f]["fifties"] += 1
            elif runs >= 100:
                format_agg[f]["hundreds"] += 1
            if runs > format_agg[f]["highest_score"]:
                format_agg[f]["highest_score"] = runs
                format_agg[f]["is_hs_not_out"] = not is_dismissed
                
    dhoni_format_stats = []
    format_order = ["TEST", "ODI", "T20I", "IPL", "CLT20", "OTHER_T20", "ALL_INTERNATIONAL", "OVERALL"]
    for f in format_order:
        if f in format_agg or f in fmt_matches_count:
            data = format_agg[f]
            m_count = len(fmt_matches_count[f])
            avg = calc_avg(data["runs"], data["dismissals"])
            sr = calc_sr(data["runs"], data["balls"])
            hs_str = f"{data['highest_score']}*" if data["is_hs_not_out"] else str(data["highest_score"])
            dhoni_format_stats.append({
                "format": f,
                "matches": m_count,
                "innings": data["innings"],
                "runs": data["runs"],
                "balls": data["balls"],
                "dismissals": data["dismissals"],
                "not_outs": data["not_outs"],
                "average": avg,
                "strike_rate": sr,
                "fours": data["fours"],
                "sixes": data["sixes"],
                "fifties": data["fifties"],
                "hundreds": data["hundreds"],
                "highest_score": hs_str
            })
    write_csv(dhoni_format_stats, os.path.join(ANALYTICS_DIR, "dhoni_format_stats.csv"))

    # -------------------------------------------------------------
    # 4. YEARLY STATS
    # -------------------------------------------------------------
    yearly_matches = defaultdict(lambda: defaultdict(set))
    for m in matches:
        yr = int(m["year"]) if m["year"] else 0
        if yr > 0:
            yearly_matches[yr][m["format"]].add(m["match_id"])
            yearly_matches[yr]["OVERALL"].add(m["match_id"])
            
    yearly_agg = defaultdict(lambda: {
        "innings": 0, "runs": 0, "balls": 0, "dismissals": 0, "not_outs": 0,
        "fours": 0, "sixes": 0, "fifties": 0, "hundreds": 0, "highest_score": 0, "is_hs_not_out": False
    })
    
    for row in innings:
        yr = int(row["year"]) if row["year"] else 0
        fmt = row["format"]
        if yr == 0:
            continue
        runs = int(row["runs"])
        balls = int(row["balls_faced"])
        is_dismissed = (row["dismissed"] == "True")
        fours = int(row["fours"])
        sixes = int(row["sixes"])
        
        for f in [fmt, "OVERALL"]:
            k = (yr, f)
            yearly_agg[k]["innings"] += 1
            yearly_agg[k]["runs"] += runs
            yearly_agg[k]["balls"] += balls
            if is_dismissed:
                yearly_agg[k]["dismissals"] += 1
            else:
                yearly_agg[k]["not_outs"] += 1
            yearly_agg[k]["fours"] += fours
            yearly_agg[k]["sixes"] += sixes
            if 50 <= runs < 100:
                yearly_agg[k]["fifties"] += 1
            elif runs >= 100:
                yearly_agg[k]["hundreds"] += 1
            if runs > yearly_agg[k]["highest_score"]:
                yearly_agg[k]["highest_score"] = runs
                yearly_agg[k]["is_hs_not_out"] = not is_dismissed
                
    dhoni_yearly_stats = []
    for (yr, f), data in sorted(yearly_agg.items(), key=lambda x: (x[0][0], x[0][1])):
        m_count = len(yearly_matches[yr][f])
        avg = calc_avg(data["runs"], data["dismissals"])
        sr = calc_sr(data["runs"], data["balls"])
        hs_str = f"{data['highest_score']}*" if data["is_hs_not_out"] else str(data["highest_score"])
        dhoni_yearly_stats.append({
            "year": yr,
            "format": f,
            "matches": m_count,
            "innings": data["innings"],
            "runs": data["runs"],
            "balls": data["balls"],
            "dismissals": data["dismissals"],
            "not_outs": data["not_outs"],
            "average": avg,
            "strike_rate": sr,
            "fifties": data["fifties"],
            "hundreds": data["hundreds"],
            "fours": data["fours"],
            "sixes": data["sixes"],
            "highest_score": hs_str
        })
    write_csv(dhoni_yearly_stats, os.path.join(ANALYTICS_DIR, "dhoni_yearly_stats.csv"))

    # -------------------------------------------------------------
    # 5. OPPONENT STATS
    # -------------------------------------------------------------
    opp_matches = defaultdict(lambda: defaultdict(set))
    for m in matches:
        opp = m["opponent"]
        if opp:
            opp_matches[opp][m["format"]].add(m["match_id"])
            opp_matches[opp]["OVERALL"].add(m["match_id"])
            
    opp_agg = defaultdict(lambda: {
        "innings": 0, "runs": 0, "balls": 0, "dismissals": 0, "not_outs": 0,
        "fours": 0, "sixes": 0, "fifties": 0, "hundreds": 0, "highest_score": 0, "is_hs_not_out": False
    })
    
    for row in innings:
        opp = row["opponent"]
        fmt = row["format"]
        if not opp:
            continue
        runs = int(row["runs"])
        balls = int(row["balls_faced"])
        is_dismissed = (row["dismissed"] == "True")
        fours = int(row["fours"])
        sixes = int(row["sixes"])
        
        for f in [fmt, "OVERALL"]:
            k = (opp, f)
            opp_agg[k]["innings"] += 1
            opp_agg[k]["runs"] += runs
            opp_agg[k]["balls"] += balls
            if is_dismissed:
                opp_agg[k]["dismissals"] += 1
            else:
                opp_agg[k]["not_outs"] += 1
            opp_agg[k]["fours"] += fours
            opp_agg[k]["sixes"] += sixes
            if 50 <= runs < 100:
                opp_agg[k]["fifties"] += 1
            elif runs >= 100:
                opp_agg[k]["hundreds"] += 1
            if runs > opp_agg[k]["highest_score"]:
                opp_agg[k]["highest_score"] = runs
                opp_agg[k]["is_hs_not_out"] = not is_dismissed
                
    dhoni_opponent_stats = []
    for (opp, f), data in sorted(opp_agg.items(), key=lambda x: (x[0][1], -x[1]["runs"])):
        m_count = len(opp_matches[opp][f])
        avg = calc_avg(data["runs"], data["dismissals"])
        sr = calc_sr(data["runs"], data["balls"])
        hs_str = f"{data['highest_score']}*" if data["is_hs_not_out"] else str(data["highest_score"])
        dhoni_opponent_stats.append({
            "opponent": opp,
            "format": f,
            "matches": m_count,
            "innings": data["innings"],
            "runs": data["runs"],
            "balls": data["balls"],
            "dismissals": data["dismissals"],
            "not_outs": data["not_outs"],
            "average": avg,
            "strike_rate": sr,
            "fifties": data["fifties"],
            "hundreds": data["hundreds"],
            "fours": data["fours"],
            "sixes": data["sixes"],
            "highest_score": hs_str
        })
    write_csv(dhoni_opponent_stats, os.path.join(ANALYTICS_DIR, "dhoni_opponent_stats.csv"))

    # -------------------------------------------------------------
    # 6. VENUE & HOME/AWAY/NEUTRAL STATS
    # -------------------------------------------------------------
    venue_matches = defaultdict(lambda: defaultdict(set))
    for m in matches:
        v = m["venue"]
        if v:
            venue_matches[v][m["format"]].add(m["match_id"])
            venue_matches[v]["OVERALL"].add(m["match_id"])
            
    venue_agg = defaultdict(lambda: {
        "city": "", "country": "",
        "innings": 0, "runs": 0, "balls": 0, "dismissals": 0, "not_outs": 0,
        "highest_score": 0, "is_hs_not_out": False
    })
    
    for row in innings:
        v = row["venue"]
        fmt = row["format"]
        if not v:
            continue
        runs = int(row["runs"])
        balls = int(row["balls_faced"])
        is_dismissed = (row["dismissed"] == "True")
        
        for f in [fmt, "OVERALL"]:
            k = (v, f)
            venue_agg[k]["city"] = row["city"]
            venue_agg[k]["country"] = row["country"]
            venue_agg[k]["innings"] += 1
            venue_agg[k]["runs"] += runs
            venue_agg[k]["balls"] += balls
            if is_dismissed:
                venue_agg[k]["dismissals"] += 1
            else:
                venue_agg[k]["not_outs"] += 1
            if runs > venue_agg[k]["highest_score"]:
                venue_agg[k]["highest_score"] = runs
                venue_agg[k]["is_hs_not_out"] = not is_dismissed
                
    dhoni_venue_stats = []
    for (v, f), data in sorted(venue_agg.items(), key=lambda x: (x[0][1], -x[1]["runs"])):
        m_count = len(venue_matches[v][f])
        avg = calc_avg(data["runs"], data["dismissals"])
        sr = calc_sr(data["runs"], data["balls"])
        hs_str = f"{data['highest_score']}*" if data["is_hs_not_out"] else str(data["highest_score"])
        dhoni_venue_stats.append({
            "venue": v,
            "city": data["city"],
            "country": data["country"],
            "format": f,
            "matches": m_count,
            "innings": data["innings"],
            "runs": data["runs"],
            "dismissals": data["dismissals"],
            "not_outs": data["not_outs"],
            "average": avg,
            "strike_rate": sr,
            "highest_score": hs_str
        })
    write_csv(dhoni_venue_stats, os.path.join(ANALYTICS_DIR, "dhoni_venue_stats.csv"))

    # Home / Away / Neutral
    ha_matches = defaultdict(lambda: defaultdict(set))
    for m in matches:
        ha = m["home_away"]
        if ha:
            ha_matches[ha][m["format"]].add(m["match_id"])
            ha_matches[ha]["OVERALL"].add(m["match_id"])
            
    ha_agg = defaultdict(lambda: {
        "innings": 0, "runs": 0, "balls": 0, "dismissals": 0, "not_outs": 0,
        "highest_score": 0, "is_hs_not_out": False
    })
    
    for row in innings:
        ha = row["home_away"]
        fmt = row["format"]
        if not ha:
            continue
        runs = int(row["runs"])
        balls = int(row["balls_faced"])
        is_dismissed = (row["dismissed"] == "True")
        
        for f in [fmt, "OVERALL"]:
            k = (ha, f)
            ha_agg[k]["innings"] += 1
            ha_agg[k]["runs"] += runs
            ha_agg[k]["balls"] += balls
            if is_dismissed:
                ha_agg[k]["dismissals"] += 1
            else:
                ha_agg[k]["not_outs"] += 1
            if runs > ha_agg[k]["highest_score"]:
                ha_agg[k]["highest_score"] = runs
                ha_agg[k]["is_hs_not_out"] = not is_dismissed
                
    dhoni_home_away_stats = []
    for (ha, f), data in sorted(ha_agg.items(), key=lambda x: (x[0][1], x[0][0])):
        m_count = len(ha_matches[ha][f])
        avg = calc_avg(data["runs"], data["dismissals"])
        sr = calc_sr(data["runs"], data["balls"])
        hs_str = f"{data['highest_score']}*" if data["is_hs_not_out"] else str(data["highest_score"])
        dhoni_home_away_stats.append({
            "home_away": ha,
            "format": f,
            "matches": m_count,
            "innings": data["innings"],
            "runs": data["runs"],
            "balls": data["balls"],
            "dismissals": data["dismissals"],
            "not_outs": data["not_outs"],
            "average": avg,
            "strike_rate": sr,
            "highest_score": hs_str
        })
    write_csv(dhoni_home_away_stats, os.path.join(ANALYTICS_DIR, "dhoni_home_away_stats.csv"))

    # -------------------------------------------------------------
    # 7. INNINGS PHASE & CHASING STATS
    # -------------------------------------------------------------
    phase_agg = defaultdict(lambda: {
        "innings": 0, "runs": 0, "balls": 0, "dismissals": 0, "not_outs": 0,
        "fifties": 0, "hundreds": 0, "highest_score": 0, "is_hs_not_out": False
    })
    
    chasing_agg = defaultdict(lambda: {
        "innings": 0, "runs": 0, "balls": 0, "dismissals": 0, "not_outs": 0,
        "fifties": 0, "hundreds": 0, "highest_score": 0, "is_hs_not_out": False,
        "successful_chases_inns": 0, "successful_chase_runs": 0, "successful_chase_dismissals": 0,
        "successful_chase_not_outs": 0
    })
    
    for row in innings:
        inn_num = int(row["innings_number"]) if row["innings_number"] else 1
        phase = "1st Innings (Batting First)" if inn_num in [1, 3] else "2nd Innings (Chasing / Batting Second)"
        fmt = row["format"]
        runs = int(row["runs"])
        balls = int(row["balls_faced"])
        is_dismissed = (row["dismissed"] == "True")
        res = row["result"]
        
        for f in [fmt, "OVERALL"]:
            k = (phase, f)
            phase_agg[k]["innings"] += 1
            phase_agg[k]["runs"] += runs
            phase_agg[k]["balls"] += balls
            if is_dismissed:
                phase_agg[k]["dismissals"] += 1
            else:
                phase_agg[k]["not_outs"] += 1
            if 50 <= runs < 100:
                phase_agg[k]["fifties"] += 1
            elif runs >= 100:
                phase_agg[k]["hundreds"] += 1
            if runs > phase_agg[k]["highest_score"]:
                phase_agg[k]["highest_score"] = runs
                phase_agg[k]["is_hs_not_out"] = not is_dismissed
                
        # If chasing
        if row["chasing"] == "True":
            for f in [fmt, "OVERALL"]:
                ck = ("CHASING", f)
                chasing_agg[ck]["innings"] += 1
                chasing_agg[ck]["runs"] += runs
                chasing_agg[ck]["balls"] += balls
                if is_dismissed:
                    chasing_agg[ck]["dismissals"] += 1
                else:
                    chasing_agg[ck]["not_outs"] += 1
                if 50 <= runs < 100:
                    chasing_agg[ck]["fifties"] += 1
                elif runs >= 100:
                    chasing_agg[ck]["hundreds"] += 1
                if runs > chasing_agg[ck]["highest_score"]:
                    chasing_agg[ck]["highest_score"] = runs
                    chasing_agg[ck]["is_hs_not_out"] = not is_dismissed
                    
                if res == "WON":
                    chasing_agg[ck]["successful_chases_inns"] += 1
                    chasing_agg[ck]["successful_chase_runs"] += runs
                    if is_dismissed:
                        chasing_agg[ck]["successful_chase_dismissals"] += 1
                    else:
                        chasing_agg[ck]["successful_chase_not_outs"] += 1
                        
    dhoni_phase_stats = []
    for (phase, f), data in sorted(phase_agg.items(), key=lambda x: (x[0][1], x[0][0])):
        avg = calc_avg(data["runs"], data["dismissals"])
        sr = calc_sr(data["runs"], data["balls"])
        hs_str = f"{data['highest_score']}*" if data["is_hs_not_out"] else str(data["highest_score"])
        dhoni_phase_stats.append({
            "innings_phase": phase,
            "format": f,
            "innings": data["innings"],
            "runs": data["runs"],
            "balls": data["balls"],
            "dismissals": data["dismissals"],
            "not_outs": data["not_outs"],
            "average": avg,
            "strike_rate": sr,
            "fifties": data["fifties"],
            "hundreds": data["hundreds"],
            "highest_score": hs_str
        })
    write_csv(dhoni_phase_stats, os.path.join(ANALYTICS_DIR, "dhoni_innings_phase_stats.csv"))

    dhoni_chasing_stats = []
    for (ck_type, f), data in sorted(chasing_agg.items(), key=lambda x: x[0][1]):
        avg = calc_avg(data["runs"], data["dismissals"])
        sr = calc_sr(data["runs"], data["balls"])
        succ_avg = calc_avg(data["successful_chase_runs"], data["successful_chase_dismissals"])
        succ_sr = calc_sr(data["successful_chase_runs"], 1) # Will adjust or keep raw
        hs_str = f"{data['highest_score']}*" if data["is_hs_not_out"] else str(data["highest_score"])
        dhoni_chasing_stats.append({
            "format": f,
            "chase_innings": data["innings"],
            "chase_runs": data["runs"],
            "chase_dismissals": data["dismissals"],
            "chase_not_outs": data["not_outs"],
            "chase_average": avg,
            "chase_strike_rate": sr,
            "successful_chases": data["successful_chases_inns"],
            "runs_in_successful_chases": data["successful_chase_runs"],
            "average_in_successful_chases": succ_avg,
            "not_outs_in_successful_chases": data["successful_chase_not_outs"],
            "highest_score_chasing": hs_str
        })
    write_csv(dhoni_chasing_stats, os.path.join(ANALYTICS_DIR, "dhoni_chasing_stats.csv"))

    # -------------------------------------------------------------
    # 8. FINISHING & DEATH OVERS STATS
    # -------------------------------------------------------------
    # T20 death overs = overs 16-20 (over index 15..19)
    # ODI death overs = overs 41-50 (over index 40..49)
    death_agg = defaultdict(lambda: {
        "balls": 0, "runs": 0, "fours": 0, "sixes": 0, "dots": 0, "singles": 0, "doubles": 0
    })
    
    for row in bbb:
        fmt = row["format"]
        over_num = int(row["over"]) if row["over"] else 0
        b_runs = int(row["batter_runs"]) if row["batter_runs"] else 0
        is_wide = (row["is_wide"] == "True")
        
        is_death = False
        if fmt in ["T20I", "IPL", "CLT20", "OTHER_T20"] and 15 <= over_num <= 19:
            is_death = True
        elif fmt == "ODI" and 40 <= over_num <= 49:
            is_death = True
            
        if is_death:
            formats = [fmt, "OVERALL_LIMITED_OVERS"]
            for f in formats:
                if not is_wide:
                    death_agg[f]["balls"] += 1
                death_agg[f]["runs"] += b_runs
                if b_runs == 4:
                    death_agg[f]["fours"] += 1
                elif b_runs == 6:
                    death_agg[f]["sixes"] += 1
                elif b_runs == 0 and not is_wide:
                    death_agg[f]["dots"] += 1
                elif b_runs == 1:
                    death_agg[f]["singles"] += 1
                elif b_runs == 2:
                    death_agg[f]["doubles"] += 1
                    
    dhoni_finishing_stats = []
    for f, data in sorted(death_agg.items()):
        sr = calc_sr(data["runs"], data["balls"])
        dot_pct = f"{(data['dots'] / data['balls'] * 100):.1f}%" if data["balls"] > 0 else "0.0%"
        boundary_pct = f"{((data['fours'] + data['sixes']) / data['balls'] * 100):.1f}%" if data["balls"] > 0 else "0.0%"
        # Finisher Index Formula (Project Original Derived Metric, fully documented in docs/METRICS.md):
        # Finisher Index = (Death SR * 0.5) + (Boundary % * 1.5) + ((100 - Dot %) * 0.2)
        sr_val = float(sr)
        b_pct_val = (data['fours'] + data['sixes']) / data['balls'] * 100 if data['balls'] > 0 else 0
        dot_pct_val = data['dots'] / data['balls'] * 100 if data['balls'] > 0 else 0
        finisher_index = round((sr_val * 0.5) + (b_pct_val * 1.5) + ((100 - dot_pct_val) * 0.2), 2)
        
        dhoni_finishing_stats.append({
            "format": f,
            "death_overs_definition": "Overs 16-20 (T20/IPL) / Overs 41-50 (ODI)",
            "balls_faced": data["balls"],
            "runs_scored": data["runs"],
            "strike_rate": sr,
            "fours": data["fours"],
            "sixes": data["sixes"],
            "dot_balls": data["dots"],
            "dot_ball_percentage": dot_pct,
            "boundary_percentage": boundary_pct,
            "finisher_index": finisher_index
        })
    write_csv(dhoni_finishing_stats, os.path.join(ANALYTICS_DIR, "dhoni_finishing_stats.csv"))

    # -------------------------------------------------------------
    # 9. WICKETKEEPING AGGREGATE STATS
    # -------------------------------------------------------------
    wk_agg = defaultdict(lambda: {"matches": 0, "catches": 0, "stumpings": 0, "run_outs": 0, "total_dismissals": 0})
    for row in wk_matches:
        fmt = row["format"]
        c = int(row["catches"])
        s = int(row["stumpings"])
        ro = int(row["run_outs"])
        tot = int(row["total_dismissals"])
        
        formats = [fmt, "OVERALL"]
        if fmt in ["TEST", "ODI", "T20I"]:
            formats.append("ALL_INTERNATIONAL")
            
        for f in formats:
            wk_agg[f]["matches"] += 1
            wk_agg[f]["catches"] += c
            wk_agg[f]["stumpings"] += s
            wk_agg[f]["run_outs"] += ro
            wk_agg[f]["total_dismissals"] += tot
            
    dhoni_wk_stats = []
    for f in ["TEST", "ODI", "T20I", "IPL", "CLT20", "ALL_INTERNATIONAL", "OVERALL"]:
        if f in wk_agg:
            data = wk_agg[f]
            dpm = f"{(data['total_dismissals'] / data['matches']):.2f}" if data["matches"] > 0 else "0.00"
            dhoni_wk_stats.append({
                "format": f,
                "matches": data["matches"],
                "catches": data["catches"],
                "stumpings": data["stumpings"],
                "run_outs": data["run_outs"],
                "total_dismissals": data["total_dismissals"],
                "dismissals_per_match": dpm
            })
    write_csv(dhoni_wk_stats, os.path.join(ANALYTICS_DIR, "dhoni_wicketkeeping_stats.csv"))

    # -------------------------------------------------------------
    # 10. CAPTAINCY AGGREGATE STATS
    # -------------------------------------------------------------
    cap_agg = defaultdict(lambda: {
        "matches": 0, "wins": 0, "losses": 0, "ties": 0, "draws": 0, "no_results": 0, "toss_wins": 0
    })
    
    for row in cap_matches:
        team = row["team"]
        fmt = row["format"]
        res = row["result"]
        toss_won = (row["toss_won_by_dhoni"] == "True")
        
        keys = [(team, fmt), (team, "OVERALL"), ("ALL_TEAMS", fmt), ("ALL_TEAMS", "OVERALL")]
        for k in keys:
            cap_agg[k]["matches"] += 1
            if res == "WON":
                cap_agg[k]["wins"] += 1
            elif res == "LOST":
                cap_agg[k]["losses"] += 1
            elif res == "TIED":
                cap_agg[k]["ties"] += 1
            elif res == "DRAWN":
                cap_agg[k]["draws"] += 1
            elif res == "NO_RESULT":
                cap_agg[k]["no_results"] += 1
            if toss_won:
                cap_agg[k]["toss_wins"] += 1
                
    dhoni_cap_stats = []
    for (team, fmt), data in sorted(cap_agg.items(), key=lambda x: (x[0][0], x[0][1])):
        m_count = data["matches"]
        w_count = data["wins"]
        # Win % in cricket = (Wins / Completed Matches without NR) * 100 or Wins/Matches
        completed = m_count - data["no_results"]
        win_pct = f"{(w_count / completed * 100):.2f}%" if completed > 0 else "0.00%"
        toss_pct = f"{(data['toss_wins'] / m_count * 100):.2f}%" if m_count > 0 else "0.00%"
        dhoni_cap_stats.append({
            "team": team,
            "format": fmt,
            "matches_captained": m_count,
            "wins": w_count,
            "losses": data["losses"],
            "ties": data["ties"],
            "draws": data["draws"],
            "no_results": data["no_results"],
            "win_percentage": win_pct,
            "toss_win_percentage": toss_pct
        })
    write_csv(dhoni_cap_stats, os.path.join(ANALYTICS_DIR, "dhoni_captaincy_stats.csv"))

    # -------------------------------------------------------------
    # 11. TOURNAMENT STATS
    # -------------------------------------------------------------
    # Group by major ICC / IPL / CLT20 events
    tourn_agg = defaultdict(lambda: {
        "year": 0, "team": "", "matches": set(), "innings": 0, "runs": 0, "balls": 0,
        "dismissals": 0, "not_outs": 0, "fifties": 0, "hundreds": 0, "highest_score": 0,
        "is_hs_not_out": False, "result": ""
    })
    
    # Pre-map tournament titles
    tournament_meta = {
        ("ICC World Twenty20", 2007): "CHAMPIONS (Won T20 World Cup)",
        ("ICC Cricket World Cup", 2011): "CHAMPIONS (Won ODI World Cup)",
        ("ICC Champions Trophy", 2013): "CHAMPIONS (Won Champions Trophy)",
        ("Indian Premier League", 2010): "CHAMPIONS (CSK Title 1)",
        ("Indian Premier League", 2011): "CHAMPIONS (CSK Title 2)",
        ("Indian Premier League", 2018): "CHAMPIONS (CSK Title 3 - Comeback)",
        ("Indian Premier League", 2021): "CHAMPIONS (CSK Title 4)",
        ("Indian Premier League", 2023): "CHAMPIONS (CSK Title 5)",
        ("Champions League Twenty20", 2010): "CHAMPIONS (CLT20 Title 1)",
        ("Champions League Twenty20", 2014): "CHAMPIONS (CLT20 Title 2)"
    }
    
    for row in matches:
        comp = row["competition"]
        yr = int(row["year"]) if row["year"] else 0
        if "World Cup" in comp or "World Twenty20" in comp or "T20 World Cup" in comp or "Champions Trophy" in comp or "Indian Premier League" in comp or "Champions League" in comp:
            k = (comp, yr)
            tourn_agg[k]["year"] = yr
            tourn_agg[k]["team"] = row["team"]
            tourn_agg[k]["matches"].add(row["match_id"])
            if (comp, yr) in tournament_meta:
                tourn_agg[k]["result"] = tournament_meta[(comp, yr)]
            elif "Semi-Final" in row["tournament_stage"]:
                tourn_agg[k]["result"] = "Semi-Finalists"
            elif "Final" in row["tournament_stage"]:
                tourn_agg[k]["result"] = "Runners-Up"
                
    for row in innings:
        comp = row["competition"]
        yr = int(row["year"]) if row["year"] else 0
        if "World Cup" in comp or "World Twenty20" in comp or "T20 World Cup" in comp or "Champions Trophy" in comp or "Indian Premier League" in comp or "Champions League" in comp:
            k = (comp, yr)
            runs = int(row["runs"])
            balls = int(row["balls_faced"])
            is_dismissed = (row["dismissed"] == "True")
            tourn_agg[k]["innings"] += 1
            tourn_agg[k]["runs"] += runs
            tourn_agg[k]["balls"] += balls
            if is_dismissed:
                tourn_agg[k]["dismissals"] += 1
            else:
                tourn_agg[k]["not_outs"] += 1
            if 50 <= runs < 100:
                tourn_agg[k]["fifties"] += 1
            elif runs >= 100:
                tourn_agg[k]["hundreds"] += 1
            if runs > tourn_agg[k]["highest_score"]:
                tourn_agg[k]["highest_score"] = runs
                tourn_agg[k]["is_hs_not_out"] = not is_dismissed
                
    dhoni_tournament_stats = []
    for (comp, yr), data in sorted(tourn_agg.items(), key=lambda x: (x[0][0], x[0][1])):
        m_count = len(data["matches"])
        avg = calc_avg(data["runs"], data["dismissals"])
        sr = calc_sr(data["runs"], data["balls"])
        hs_str = f"{data['highest_score']}*" if data["is_hs_not_out"] else str(data["highest_score"])
        dhoni_tournament_stats.append({
            "tournament": comp,
            "year": yr,
            "team": data["team"],
            "matches": m_count,
            "innings": data["innings"],
            "runs": data["runs"],
            "average": avg,
            "strike_rate": sr,
            "fifties": data["fifties"],
            "hundreds": data["hundreds"],
            "highest_score": hs_str,
            "tournament_result": data["result"] if data["result"] else "Participated"
        })
    write_csv(dhoni_tournament_stats, os.path.join(ANALYTICS_DIR, "dhoni_tournament_stats.csv"))

    # -------------------------------------------------------------
    # 12. REFERENCE TABLES (Trophies, Iconic Moments, Milestones, Comparisons)
    # -------------------------------------------------------------
    trophies = [
        {"year": 2007, "competition": "ICC Men's T20 World Cup", "team": "India", "captain": "MS Dhoni", "stage": "Final", "opponent": "Pakistan", "venue": "Wanderers, Johannesburg", "result": "Won by 5 runs", "significance": "Inaugural T20 World Cup title; Dhoni's first ICC tournament as captain; ignited India's T20 revolution.", "source": "ICC Official Records"},
        {"year": 2008, "competition": "Commonwealth Bank Series (CB Series)", "team": "India", "captain": "MS Dhoni", "stage": "Finals", "opponent": "Australia", "venue": "SCG & MCG, Australia", "result": "Won Best-of-3 Finals 2-0", "significance": "Historic ODI tri-series victory in Australia, cementing youthful Indian white-ball era.", "source": "BCCI / Cricket Australia"},
        {"year": 2009, "competition": "ICC Test Championship Mace (Rank #1)", "team": "India", "captain": "MS Dhoni", "stage": "Rank #1 Test Team", "opponent": "Sri Lanka / World", "venue": "Brabourne Stadium, Mumbai", "result": "World No. 1 Ranking", "significance": "India became the No. 1 ranked Test team for the first time in history under Dhoni's leadership.", "source": "ICC Official Records"},
        {"year": 2010, "competition": "Asia Cup", "team": "India", "captain": "MS Dhoni", "stage": "Final", "opponent": "Sri Lanka", "venue": "Rangiri Dambulla Stadium, Dambulla", "result": "Won by 81 runs", "significance": "First Asia Cup title for India in 15 years.", "source": "Asian Cricket Council"},
        {"year": 2010, "competition": "Indian Premier League (IPL 2010)", "team": "Chennai Super Kings", "captain": "MS Dhoni", "stage": "Final", "opponent": "Mumbai Indians", "venue": "DY Patil Stadium, Navi Mumbai", "result": "Won by 22 runs", "significance": "CSK's maiden IPL title.", "source": "IPL Official Records"},
        {"year": 2010, "competition": "Champions League Twenty20 (CLT20 2010)", "team": "Chennai Super Kings", "captain": "MS Dhoni", "stage": "Final", "opponent": "Warriors", "venue": "Wanderers, Johannesburg", "result": "Won by 8 wickets", "significance": "CSK completed double of IPL + CLT20 in same calendar year.", "source": "BCCI / CLT20 Records"},
        {"year": 2011, "competition": "ICC Men's Cricket World Cup", "team": "India", "captain": "MS Dhoni", "stage": "Final", "opponent": "Sri Lanka", "venue": "Wankhede Stadium, Mumbai", "result": "Won by 6 wickets", "significance": "India's 2nd World Cup win after 28 years. Dhoni hit iconic winning six (91* off 79 balls, Player of the Match).", "source": "ICC Official Records"},
        {"year": 2011, "competition": "Indian Premier League (IPL 2011)", "team": "Chennai Super Kings", "captain": "MS Dhoni", "stage": "Final", "opponent": "Royal Challengers Bangalore", "venue": "MA Chidambaram Stadium, Chennai", "result": "Won by 58 runs", "significance": "First team in IPL history to successfully defend their title.", "source": "IPL Official Records"},
        {"year": 2013, "competition": "ICC Champions Trophy", "team": "India", "captain": "MS Dhoni", "stage": "Final", "opponent": "England", "venue": "Edgbaston, Birmingham", "result": "Won by 5 runs", "significance": "Dhoni became the only captain in cricket history to win all three major ICC white-ball trophies (T20 WC, CWC, CT).", "source": "ICC Official Records"},
        {"year": 2014, "competition": "Champions League Twenty20 (CLT20 2014)", "team": "Chennai Super Kings", "captain": "MS Dhoni", "stage": "Final", "opponent": "Kolkata Knight Riders", "venue": "M Chinnaswamy Stadium, Bengaluru", "result": "Won by 8 wickets", "significance": "Second CLT20 title for CSK; Suresh Raina 109* & Dhoni 23*.", "source": "BCCI / CLT20 Records"},
        {"year": 2016, "competition": "Asia Cup (T20 Format)", "team": "India", "captain": "MS Dhoni", "stage": "Final", "opponent": "Bangladesh", "venue": "Sher-e-Bangla Stadium, Mirpur", "result": "Won by 8 wickets", "significance": "6th Asia Cup title for India; Dhoni finished match with 20* off 6 balls.", "source": "Asian Cricket Council"},
        {"year": 2018, "competition": "Indian Premier League (IPL 2018)", "team": "Chennai Super Kings", "captain": "MS Dhoni", "stage": "Final", "opponent": "Sunrisers Hyderabad", "venue": "Wankhede Stadium, Mumbai", "result": "Won by 8 wickets", "significance": "'The Comeback Kings' - CSK won IPL title upon returning to the league after a two-year suspension.", "source": "IPL Official Records"},
        {"year": 2021, "competition": "Indian Premier League (IPL 2021)", "team": "Chennai Super Kings", "captain": "MS Dhoni", "stage": "Final", "opponent": "Kolkata Knight Riders", "venue": "Dubai International Stadium, Dubai", "result": "Won by 27 runs", "significance": "CSK's 4th IPL title in Dhoni's 300th match as T20 captain.", "source": "IPL Official Records"},
        {"year": 2023, "competition": "Indian Premier League (IPL 2023)", "team": "Chennai Super Kings", "captain": "MS Dhoni", "stage": "Final", "opponent": "Gujarat Titans", "venue": "Narendra Modi Stadium, Ahmedabad", "result": "Won by 5 wickets (DLS)", "significance": "Record-equaling 5th IPL title for CSK; dramatic last-ball thriller at 3:00 AM.", "source": "IPL Official Records"}
    ]
    write_csv(trophies, os.path.join(REFERENCE_DIR, "dhoni_trophies.csv"))

    iconic_moments = [
        {"moment_id": "MOMENT_01", "date": "2005-04-05", "year": 2005, "competition": "ODI Series", "match": "India vs Pakistan, 2nd ODI", "opponent": "Pakistan", "venue": "ACA-VDCA Stadium, Visakhapatnam", "context": "Promoted to No. 3 by Sourav Ganguly", "performance": "148 runs (123 balls, 15 fours, 4 sixes)", "result": "India won by 58 runs", "category": "CAREER_BREAKTHROUGH", "source": "ESPNcricinfo / Cricsheet"},
        {"moment_id": "MOMENT_02", "date": "2005-10-31", "year": 2005, "competition": "ODI Series", "match": "India vs Sri Lanka, 3rd ODI", "opponent": "Sri Lanka", "venue": "Sawai Mansingh Stadium, Jaipur", "context": "Chasing 299, promoted to No. 3 after Tendulkar fell in 1st over", "performance": "183* runs (145 balls, 15 fours, 10 sixes) - Highest ODI score by a wicketkeeper", "result": "India won by 6 wickets with 23 balls to spare", "category": "RECORD_BREAKING", "source": "ESPNcricinfo / Cricsheet"},
        {"moment_id": "MOMENT_03", "date": "2007-09-24", "year": 2007, "competition": "ICC World Twenty20", "match": "India vs Pakistan, Final", "opponent": "Pakistan", "venue": "Wanderers, Johannesburg", "context": "Pakistan needed 13 runs off final over with 1 wicket remaining", "performance": "Masterstroke captaincy decision to give 20th over to Joginder Sharma; Misbah caught by Sreesanth", "result": "India won by 5 runs (Champions)", "category": "CAPTAINCY_GENIUS", "source": "ICC / Cricsheet"},
        {"moment_id": "MOMENT_04", "date": "2010-04-18", "year": 2010, "competition": "IPL 2010", "match": "CSK vs Kings XI Punjab", "opponent": "Kings XI Punjab", "venue": "HPCA Stadium, Dharamsala", "context": "CSK needed 16 runs off final over from Irfan Pathan to qualify for semi-finals", "performance": "Dhoni hit 4, 2, 6, 6 (54* off 29 balls) followed by helmet punch celebration", "result": "CSK won by 6 wickets", "category": "FINISHING_CLUTCH", "source": "IPL / Cricsheet"},
        {"moment_id": "MOMENT_05", "date": "2011-04-02", "year": 2011, "competition": "ICC Cricket World Cup", "match": "India vs Sri Lanka, Final", "opponent": "Sri Lanka", "venue": "Wankhede Stadium, Mumbai", "context": "India 114/3 chasing 275; Dhoni promoted himself ahead of Yuvraj Singh to counter Muralitharan", "performance": "91* (79 balls, 8 fours, 2 sixes) culminating in iconic match-winning six into the Mumbai night sky", "result": "India won by 6 wickets (World Champions)", "category": "WORLD_CUP_LEGEND", "source": "ICC / Cricsheet"},
        {"moment_id": "MOMENT_06", "date": "2013-02-24", "year": 2013, "competition": "Border-Gavaskar Trophy", "match": "India vs Australia, 1st Test", "opponent": "Australia", "venue": "MA Chidambaram Stadium, Chennai", "context": "India trailing in 1st innings; counter-attacking double century against Pattinson & Lyon", "performance": "224 runs (265 balls, 24 fours, 6 sixes) - Highest Test score by an Indian wicketkeeper", "result": "India won by 8 wickets", "category": "TEST_MASTERCLASS", "source": "BCCI / Cricsheet"},
        {"moment_id": "MOMENT_07", "date": "2013-06-23", "year": 2013, "competition": "ICC Champions Trophy", "match": "India vs England, Final", "opponent": "England", "venue": "Edgbaston, Birmingham", "context": "Rain-reduced 20-over final; England cruising at 110/4 needing 20 off 16 balls", "performance": "Captaincy gamble bringing back Ishant Sharma (took 2 wickets in 2 balls); sharp stumpings off spinners", "result": "India won by 5 runs (Dhoni completes ICC Trophy Trifecta)", "category": "CAPTAINCY_TRIFECTA", "source": "ICC / Cricsheet"},
        {"moment_id": "MOMENT_08", "date": "2013-07-11", "year": 2013, "competition": "Tri-Nation Series", "match": "India vs Sri Lanka, Final", "opponent": "Sri Lanka", "venue": "Queen's Park Oval, Port of Spain", "context": "India 9 wickets down needing 15 runs off the final over from Shaminda Eranga", "performance": "0, 6, 4, 6 to seal the trophy (45* off 52 balls)", "result": "India won by 1 wicket", "category": "ICE_COLD_FINISHER", "source": "WICB / Cricsheet"},
        {"moment_id": "MOMENT_09", "date": "2016-03-23", "year": 2016, "competition": "ICC World Twenty20", "match": "India vs Bangladesh, Super 10", "opponent": "Bangladesh", "venue": "M Chinnaswamy Stadium, Bengaluru", "context": "Bangladesh needed 2 runs off 3 balls; Hardik Pandya took 2 wickets; 1 needed off final ball", "performance": "Dhoni took off right glove beforehand, sprinted 25 meters, and ran out Mustafizur Rahman by inches", "result": "India won by 1 run", "category": "LIGHTNING_WICKETKEEPING", "source": "ICC / Cricsheet"},
        {"moment_id": "MOMENT_10", "date": "2019-04-21", "year": 2019, "competition": "IPL 2019", "match": "CSK vs Royal Challengers Bangalore", "opponent": "Royal Challengers Bangalore", "venue": "M Chinnaswamy Stadium, Bengaluru", "context": "CSK 28/4 chasing 162; needed 26 runs in final over from Umesh Yadav", "performance": "84* (48 balls, 5 fours, 7 sixes) scoring 4, 6, 6, 2, 6 (24 runs in 5 balls)", "result": "RCB won by 1 run (Single greatest individual T20 chase effort)", "category": "HERCULEAN_EFFORT", "source": "IPL / Cricsheet"}
    ]
    write_csv(iconic_moments, os.path.join(REFERENCE_DIR, "dhoni_iconic_moments.csv"))

    milestones = [
        {"date": "2004-12-23", "milestone": "International Debut", "format": "ODI", "details": "ODI debut vs Bangladesh at Chattogram (run out for 0)."},
        {"date": "2005-04-05", "milestone": "Maiden International Century", "format": "ODI", "details": "148 vs Pakistan at Visakhapatnam in his 5th ODI."},
        {"date": "2005-12-02", "milestone": "Test Debut", "format": "TEST", "details": "Test debut vs Sri Lanka at Chennai (scored 30)."},
        {"date": "2006-01-21", "milestone": "Maiden Test Century", "format": "TEST", "details": "148 vs Pakistan at Faisalabad."},
        {"date": "2006-04-19", "milestone": "Fastest to ICC No. 1 ODI Batter", "format": "ODI", "details": "Reached World No. 1 ODI ranking in just 42 innings."},
        {"date": "2007-09-13", "milestone": "Captaincy Debut", "format": "T20I", "details": "Appointed India captain for the inaugural 2007 ICC World T20."},
        {"date": "2008-04-11", "milestone": "Test Captaincy Debut", "format": "TEST", "details": "Captained India in 3rd Test vs South Africa at Kanpur (India won by 8 wickets)."},
        {"date": "2008-04-19", "milestone": "IPL Debut & CSK Captaincy", "format": "IPL", "details": "Led Chennai Super Kings in their inaugural IPL match vs Kings XI Punjab."},
        {"date": "2009-12-06", "milestone": "Rank #1 Test Nation", "format": "TEST", "details": "Led India to ICC Test Championship Mace No. 1 ranking for the first time."},
        {"date": "2011-04-02", "milestone": "ICC Cricket World Cup Victory", "format": "ODI", "details": "Player of the Match in World Cup Final with 91*."},
        {"date": "2013-02-24", "milestone": "Maiden Test Double Century", "format": "TEST", "details": "Scored 224 vs Australia in Chennai (highest by an Indian wicketkeeper)."},
        {"date": "2013-06-23", "milestone": "ICC White-Ball Trifecta Completed", "format": "ICC", "details": "First captain in history to win T20 WC (2007), CWC (2011), and Champions Trophy (2013)."},
        {"date": "2014-12-30", "milestone": "Test Retirement", "format": "TEST", "details": "Retired from Test cricket after 90 matches, 4876 runs, and 27 wins as captain."},
        {"date": "2017-09-03", "milestone": "100 ODI Stumpings", "format": "ODI", "details": "First wicketkeeper in cricket history to effect 100 stumpings in ODIs."},
        {"date": "2018-07-14", "milestone": "10,000 ODI Runs", "format": "ODI", "details": "Became only the 2nd wicketkeeper-batsman (after Sangakkara) to reach 10,000 ODI runs with a 50+ career average."},
        {"date": "2018-09-25", "milestone": "200 ODIs as Captain", "format": "ODI", "details": "Captained India for the 200th time vs Afghanistan in Asia Cup at Dubai."},
        {"date": "2020-08-15", "milestone": "International Retirement", "format": "ALL", "details": "Announced retirement from international cricket ('Consider me as retired from 1929 hrs')."},
        {"date": "2023-05-29", "milestone": "5th IPL Trophy & 250th IPL Match", "format": "IPL", "details": "Led CSK to record 5th IPL title in his 250th IPL appearance."}
    ]
    write_csv(milestones, os.path.join(REFERENCE_DIR, "dhoni_milestones.csv"))

    # Career Timeline
    timeline_events = [
        {"year": 2004, "format": "ODI", "runs": 19, "matches": 3, "major_event": "International Debut vs Bangladesh", "captaincy": "No", "trophy": "None", "milestone": "ODI Cap #158"},
        {"year": 2005, "format": "ODI / TEST", "runs": 966, "matches": 29, "major_event": "148 vs PAK & 183* vs SL; Test Debut", "captaincy": "No", "trophy": "None", "milestone": "Highest ODI score by a WK"},
        {"year": 2006, "format": "ALL", "runs": 1118, "matches": 42, "major_event": "Maiden Test 100 at Faisalabad; ICC #1 ODI Batter", "captaincy": "No", "trophy": "None", "milestone": "Fastest to ICC No. 1 ODI ranking (42 inngs)"},
        {"year": 2007, "format": "ALL", "runs": 1475, "matches": 49, "major_event": "Appointed Captain; Won 2007 ICC T20 World Cup", "captaincy": "T20I / ODI Captain", "trophy": "ICC T20 World Cup 2007", "milestone": "First major ICC trophy as Captain"},
        {"year": 2008, "format": "ALL", "runs": 1740, "matches": 48, "major_event": "Won CB Series in Australia; Appointed Full-Time Test Captain; CSK IPL Debut", "captaincy": "All-Format Captain", "trophy": "CB Series (Australia)", "milestone": "Full-time Test Captaincy"},
        {"year": 2009, "format": "ALL", "runs": 1714, "matches": 45, "major_event": "Led India to World No. 1 Test Ranking (ICC Mace)", "captaincy": "All-Format Captain", "trophy": "ICC Test Mace #1", "milestone": "First time India #1 in Test history"},
        {"year": 2010, "format": "ALL", "runs": 1285, "matches": 46, "major_event": "Won Asia Cup, Won IPL 2010 (CSK), Won CLT20 2010", "captaincy": "All-Format Captain", "trophy": "Asia Cup, IPL 2010, CLT20 2010", "milestone": "IPL + CLT20 Double"},
        {"year": 2011, "format": "ALL", "runs": 1699, "matches": 55, "major_event": "Won ICC Cricket World Cup (91* in Final); Won IPL 2011", "captaincy": "All-Format Captain", "trophy": "ICC Cricket World Cup 2011, IPL 2011", "milestone": "World Cup winning captain (28 yr wait)"},
        {"year": 2012, "format": "ALL", "runs": 1374, "matches": 47, "major_event": "T20 WC campaign; gritty ODI hundreds vs Pakistan", "captaincy": "All-Format Captain", "trophy": "None", "milestone": "113* vs PAK from 29/5"},
        {"year": 2013, "format": "ALL", "runs": 1782, "matches": 53, "major_event": "Won ICC Champions Trophy (Completed ICC Trifecta); 224 vs AUS in Test", "captaincy": "All-Format Captain", "trophy": "ICC Champions Trophy 2013", "milestone": "Only captain to win all 3 ICC white-ball trophies"},
        {"year": 2014, "format": "ALL", "runs": 1391, "matches": 49, "major_event": "T20 WC Finalists; Won CLT20 2014; Retired from Test Cricket", "captaincy": "Captain (Tests ended Dec)", "trophy": "CLT20 2014", "milestone": "Test Retirement at MCG (90 Tests)"},
        {"year": 2015, "format": "ALL", "runs": 1018, "matches": 38, "major_event": "World Cup 2015 Semi-Finalists (7 wins in a row)", "captaincy": "ODI / T20I / CSK Captain", "trophy": "None", "milestone": "100th ODI win as captain"},
        {"year": 2016, "format": "ALL", "runs": 971, "matches": 44, "major_event": "Won Asia Cup T20; T20 WC Semi-Finalists (Sprint Run-Out vs BAN); Led RPSG", "captaincy": "ODI / T20I / RPSG Captain", "trophy": "Asia Cup 2016", "milestone": "Bangalore 1-run thriller sprint"},
        {"year": 2017, "format": "ALL", "runs": 1133, "matches": 45, "major_event": "Stepped down as India captain; 134 vs ENG; 100th ODI stumping", "captaincy": "No", "trophy": "None", "milestone": "100 ODI Stumpings world record"},
        {"year": 2018, "format": "ALL", "runs": 757, "matches": 37, "major_event": "CSK Return & Won IPL 2018; 10,000 ODI Runs; 200th ODI as Captain", "captaincy": "CSK Captain", "trophy": "IPL 2018", "milestone": "10,000 ODI Runs & 200th captaincy ODI"},
        {"year": 2019, "format": "ALL", "runs": 1016, "matches": 33, "major_event": "World Cup 2019 Semi-Finalists; 84* vs RCB in IPL; Final International match", "captaincy": "CSK Captain", "trophy": "None", "milestone": "350th ODI & final international match"},
        {"year": 2020, "format": "IPL", "runs": 200, "matches": 14, "major_event": "Announced International Retirement on Aug 15; IPL in UAE", "captaincy": "CSK Captain", "trophy": "None", "milestone": "International Retirement"},
        {"year": 2021, "format": "IPL", "runs": 114, "matches": 16, "major_event": "Won IPL 2021 (4th Title) in Dubai", "captaincy": "CSK Captain", "trophy": "IPL 2021", "milestone": "4th IPL Title & 300th T20 as Captain"},
        {"year": 2022, "format": "IPL", "runs": 232, "matches": 14, "major_event": "Handed captaincy to Jadeja, resumed mid-season; 28* off 13 vs MI finish", "captaincy": "CSK Captain (part)", "trophy": "None", "milestone": "Iconic last over finish vs Jaydev Unadkat"},
        {"year": 2023, "format": "IPL", "runs": 104, "matches": 16, "major_event": "Won IPL 2023 (5th Title); Played entire season with knee injury", "captaincy": "CSK Captain", "trophy": "IPL 2023", "milestone": "Record 5th IPL Title & 250th IPL Match"},
        {"year": 2024, "format": "IPL", "runs": 161, "matches": 14, "major_event": "Handed captaincy to Ruturaj; 20* off 4 vs Hardik Pandya at Wankhede; SR 220+", "captaincy": "Player / Mentor", "trophy": "None", "milestone": "264th IPL Match; Strike Rate 220.55"}
    ]
    write_csv(timeline_events, os.path.join(ANALYTICS_DIR, "dhoni_career_timeline.csv"))

    # Neutral Comparison Dataset
    comparisons = [
        {"player": "MS Dhoni", "role": "Wicketkeeper Batsman / Finisher / Captain", "period": "2004-2019 (Intl) / 2008-2024 (IPL)", "tests_runs": 4876, "tests_avg": 38.09, "tests_sr": 59.11, "odis_runs": 10773, "odis_avg": 50.57, "odis_sr": 87.56, "t20is_runs": 1617, "t20is_avg": 37.60, "t20is_sr": 126.13, "ipl_runs": 5243, "ipl_avg": 39.13, "ipl_sr": 137.54, "total_catches": 634, "total_stumpings": 195, "icc_trophies_as_captain": 3, "ipl_titles_as_captain": 5, "finishing_not_outs_odis": 84},
        {"player": "Kumar Sangakkara", "role": "Wicketkeeper Batsman / Top Order", "period": "2000-2015", "tests_runs": 12400, "tests_avg": 57.40, "tests_sr": 54.19, "odis_runs": 14234, "odis_avg": 41.98, "odis_sr": 78.86, "t20is_runs": 1382, "t20is_avg": 31.40, "t20is_sr": 119.55, "ipl_runs": 1687, "ipl_avg": 25.95, "ipl_sr": 121.19, "total_catches": 501, "total_stumpings": 139, "icc_trophies_as_captain": 0, "ipl_titles_as_captain": 0, "finishing_not_outs_odis": 41},
        {"player": "Adam Gilchrist", "role": "Wicketkeeper Batsman / Opener", "period": "1996-2008 (Intl) / 2008-2013 (IPL)", "tests_runs": 5570, "tests_avg": 47.60, "tests_sr": 81.95, "odis_runs": 9619, "odis_avg": 35.89, "odis_sr": 96.94, "t20is_runs": 272, "t20is_avg": 22.66, "t20is_sr": 141.66, "ipl_runs": 2069, "ipl_avg": 27.22, "ipl_sr": 138.39, "total_catches": 813, "total_stumpings": 92, "icc_trophies_as_captain": 0, "ipl_titles_as_captain": 1, "finishing_not_outs_odis": 11},
        {"player": "AB de Villiers", "role": "Middle Order Batsman / WK", "period": "2004-2018 (Intl) / 2008-2021 (IPL)", "tests_runs": 8765, "tests_avg": 50.66, "tests_sr": 54.51, "odis_runs": 9577, "odis_avg": 53.50, "odis_sr": 101.09, "t20is_runs": 1672, "t20is_avg": 26.12, "t20is_sr": 135.16, "ipl_runs": 5162, "ipl_avg": 39.70, "ipl_sr": 151.68, "total_catches": 350, "total_stumpings": 17, "icc_trophies_as_captain": 0, "ipl_titles_as_captain": 0, "finishing_not_outs_odis": 39},
        {"player": "Virat Kohli", "role": "Top Order Batsman / Captain", "period": "2008-Present", "tests_runs": 8848, "tests_avg": 49.15, "tests_sr": 55.55, "odis_runs": 13906, "odis_avg": 58.18, "odis_sr": 93.54, "t20is_runs": 4188, "t20is_avg": 48.69, "t20is_sr": 137.04, "ipl_runs": 8004, "ipl_avg": 38.66, "ipl_sr": 131.97, "total_catches": 315, "total_stumpings": 0, "icc_trophies_as_captain": 0, "ipl_titles_as_captain": 0, "finishing_not_outs_odis": 44},
        {"player": "Rohit Sharma", "role": "Opening Batsman / Captain", "period": "2007-Present", "tests_runs": 4137, "tests_avg": 45.46, "tests_sr": 56.40, "odis_runs": 10866, "odis_avg": 49.16, "odis_sr": 92.44, "t20is_runs": 4231, "t20is_avg": 32.05, "t20is_sr": 140.89, "ipl_runs": 6628, "ipl_avg": 29.72, "ipl_sr": 131.14, "total_catches": 210, "total_stumpings": 0, "icc_trophies_as_captain": 1, "ipl_titles_as_captain": 5, "finishing_not_outs_odis": 36},
        {"player": "Jos Buttler", "role": "Wicketkeeper Batsman / Opener / Finisher", "period": "2011-Present", "tests_runs": 2907, "tests_avg": 31.94, "tests_sr": 54.24, "odis_runs": 5022, "odis_avg": 39.54, "odis_sr": 117.11, "t20is_runs": 3264, "t20is_avg": 35.86, "t20is_sr": 146.30, "ipl_runs": 3582, "ipl_avg": 38.10, "ipl_sr": 147.53, "total_catches": 380, "total_stumpings": 55, "icc_trophies_as_captain": 1, "ipl_titles_as_captain": 0, "finishing_not_outs_odis": 28}
    ]
    write_csv(comparisons, os.path.join(REFERENCE_DIR, "dhoni_comparisons.csv"))

    print("All analytical datasets and reference tables built successfully.")

if __name__ == "__main__":
    main()
