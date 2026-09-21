-- ============================================================
-- CAPTAIN COOL: DECODED
-- PostgreSQL / Supabase Relational Database Schema (DDL)
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PLAYERS TABLE
CREATE TABLE IF NOT EXISTS players (
    player_id VARCHAR(50) PRIMARY KEY, -- e.g. 'MS_DHONI'
    full_name VARCHAR(100) NOT NULL,
    known_as VARCHAR(50) NOT NULL,
    cricsheet_id VARCHAR(50) UNIQUE,
    cricinfo_id VARCHAR(50),
    bcci_id VARCHAR(50),
    jersey_number INT DEFAULT 7,
    batting_hand VARCHAR(20) DEFAULT 'Right-hand bat',
    bowling_style VARCHAR(50) DEFAULT 'Right-arm medium',
    role VARCHAR(50) DEFAULT 'Wicketkeeper Batsman',
    birth_date DATE,
    birth_place VARCHAR(100),
    international_debut DATE,
    international_retirement DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. TEAMS TABLE
CREATE TABLE IF NOT EXISTS teams (
    team_id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    short_name VARCHAR(20) NOT NULL,
    type VARCHAR(30) NOT NULL -- 'INTERNATIONAL', 'IPL_FRANCHISE', 'DOMESTIC'
);

-- 3. VENUES TABLE
CREATE TABLE IF NOT EXISTS venues (
    venue_id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    city VARCHAR(100),
    country VARCHAR(100) NOT NULL,
    capacity INT
);

-- 4. MATCHES TABLE
CREATE TABLE IF NOT EXISTS matches (
    match_id VARCHAR(50) PRIMARY KEY,
    date DATE NOT NULL,
    year INT NOT NULL,
    month INT NOT NULL,
    format VARCHAR(20) NOT NULL, -- 'TEST', 'ODI', 'T20I', 'IPL', 'CLT20'
    competition VARCHAR(100) NOT NULL,
    season VARCHAR(20) NOT NULL,
    team_id VARCHAR(50) REFERENCES teams(team_id),
    opponent_id VARCHAR(50) REFERENCES teams(team_id),
    venue_id VARCHAR(100) REFERENCES venues(venue_id),
    home_away VARCHAR(20) NOT NULL, -- 'HOME', 'AWAY', 'NEUTRAL'
    toss_winner VARCHAR(100),
    toss_decision VARCHAR(20),
    winner VARCHAR(100),
    result VARCHAR(20) NOT NULL, -- 'WON', 'LOST', 'TIED', 'DRAWN', 'NO_RESULT'
    margin VARCHAR(50),
    captain BOOLEAN DEFAULT FALSE,
    player_of_match BOOLEAN DEFAULT FALSE,
    tournament_stage VARCHAR(50)
);

-- 5. INNINGS TABLE (Batting Performances)
CREATE TABLE IF NOT EXISTS innings (
    innings_id VARCHAR(60) PRIMARY KEY, -- e.g. '{match_id}_{innings_number}'
    match_id VARCHAR(50) REFERENCES matches(match_id) ON DELETE CASCADE,
    player_id VARCHAR(50) REFERENCES players(player_id),
    date DATE NOT NULL,
    year INT NOT NULL,
    format VARCHAR(20) NOT NULL,
    innings_number INT NOT NULL,
    batting_position INT, -- Derived 1-11
    runs INT NOT NULL DEFAULT 0,
    balls_faced INT NOT NULL DEFAULT 0,
    fours INT NOT NULL DEFAULT 0,
    sixes INT NOT NULL DEFAULT 0,
    dots INT NOT NULL DEFAULT 0,
    strike_rate NUMERIC(6, 2) NOT NULL DEFAULT 0.00,
    dismissed BOOLEAN NOT NULL DEFAULT TRUE,
    not_out BOOLEAN NOT NULL DEFAULT FALSE,
    dismissal_type VARCHAR(50) NOT NULL, -- 'caught', 'bowled', 'lbw', 'not out', etc.
    bowler VARCHAR(100),
    fielder VARCHAR(100),
    captain BOOLEAN DEFAULT FALSE,
    chasing BOOLEAN DEFAULT FALSE,
    target INT,
    result VARCHAR(20) NOT NULL
);

-- 6. WICKETKEEPING PERFORMANCES
CREATE TABLE IF NOT EXISTS wicketkeeping_performances (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    match_id VARCHAR(50) REFERENCES matches(match_id) ON DELETE CASCADE,
    player_id VARCHAR(50) REFERENCES players(player_id),
    date DATE NOT NULL,
    format VARCHAR(20) NOT NULL,
    catches INT NOT NULL DEFAULT 0,
    stumpings INT NOT NULL DEFAULT 0,
    run_outs INT NOT NULL DEFAULT 0,
    total_dismissals INT NOT NULL DEFAULT 0
);

-- 7. CAPTAINCY PERFORMANCES
CREATE TABLE IF NOT EXISTS captaincy_performances (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    match_id VARCHAR(50) REFERENCES matches(match_id) ON DELETE CASCADE,
    player_id VARCHAR(50) REFERENCES players(player_id),
    date DATE NOT NULL,
    team VARCHAR(100) NOT NULL,
    format VARCHAR(20) NOT NULL,
    toss_won BOOLEAN NOT NULL,
    result VARCHAR(20) NOT NULL,
    margin VARCHAR(50)
);

-- 8. TROPHIES TABLE
CREATE TABLE IF NOT EXISTS trophies (
    trophy_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    year INT NOT NULL,
    competition VARCHAR(150) NOT NULL,
    team VARCHAR(100) NOT NULL,
    captain VARCHAR(100) NOT NULL,
    stage VARCHAR(50) NOT NULL,
    opponent VARCHAR(100) NOT NULL,
    venue VARCHAR(150) NOT NULL,
    result VARCHAR(100) NOT NULL,
    significance TEXT NOT NULL,
    source VARCHAR(100) NOT NULL
);

-- 9. ICONIC MOMENTS TABLE
CREATE TABLE IF NOT EXISTS iconic_moments (
    moment_id VARCHAR(50) PRIMARY KEY,
    date DATE NOT NULL,
    year INT NOT NULL,
    competition VARCHAR(100) NOT NULL,
    match VARCHAR(150) NOT NULL,
    opponent VARCHAR(100) NOT NULL,
    venue VARCHAR(150) NOT NULL,
    context TEXT NOT NULL,
    performance TEXT NOT NULL,
    result VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    source VARCHAR(100) NOT NULL
);

-- 10. MILESTONES TABLE
CREATE TABLE IF NOT EXISTS milestones (
    milestone_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE NOT NULL,
    milestone VARCHAR(150) NOT NULL,
    format VARCHAR(20) NOT NULL,
    details TEXT NOT NULL
);

-- INDEXES FOR MAXIMUM QUERY PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_innings_format ON innings(format);
CREATE INDEX IF NOT EXISTS idx_innings_position ON innings(batting_position);
CREATE INDEX IF NOT EXISTS idx_innings_year ON innings(year);
CREATE INDEX IF NOT EXISTS idx_innings_chasing ON innings(chasing);
CREATE INDEX IF NOT EXISTS idx_matches_date ON matches(date);
CREATE INDEX IF NOT EXISTS idx_matches_team ON matches(team_id);
CREATE INDEX IF NOT EXISTS idx_matches_format ON matches(format);
