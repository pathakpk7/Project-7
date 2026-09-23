import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const dataDir = path.join(rootDir, 'src', 'data');

const bundlePath = path.join(dataDir, 'dhoni_warehouse_bundle.json');

if (fs.existsSync(bundlePath)) {
  const bundle = JSON.parse(fs.readFileSync(bundlePath, 'utf8'));
  
  const formatStats = JSON.parse(fs.readFileSync(path.join(dataDir, 'format_stats.json'), 'utf8'));
  const wicketkeepingStats = JSON.parse(fs.readFileSync(path.join(dataDir, 'wicketkeeping_stats.json'), 'utf8'));
  const captaincyStats = JSON.parse(fs.readFileSync(path.join(dataDir, 'captaincy_stats.json'), 'utf8'));
  const positionStats = JSON.parse(fs.readFileSync(path.join(dataDir, 'position_stats.json'), 'utf8'));
  const positionFormatStats = JSON.parse(fs.readFileSync(path.join(dataDir, 'position_format_stats.json'), 'utf8'));
  const roleComparison = JSON.parse(fs.readFileSync(path.join(dataDir, 'role_comparison.json'), 'utf8'));
  const yearlyStats = JSON.parse(fs.readFileSync(path.join(dataDir, 'yearly_stats.json'), 'utf8'));
  const homeAwayStats = JSON.parse(fs.readFileSync(path.join(dataDir, 'home_away_stats.json'), 'utf8'));
  const opponentStats = JSON.parse(fs.readFileSync(path.join(dataDir, 'opponent_stats.json'), 'utf8'));
  const tournamentStats = JSON.parse(fs.readFileSync(path.join(dataDir, 'tournament_stats.json'), 'utf8'));
  
  bundle.format_stats = formatStats;
  bundle.wicketkeeping_stats = wicketkeepingStats;
  bundle.captaincy_stats = captaincyStats;
  bundle.position_stats = positionStats;
  bundle.position_format_stats = positionFormatStats;
  bundle.role_comparison = roleComparison;
  bundle.yearly_stats = yearlyStats;
  bundle.home_away_stats = homeAwayStats;
  bundle.opponent_stats = opponentStats;
  bundle.tournament_stats = tournamentStats;
  
  fs.writeFileSync(bundlePath, JSON.stringify(bundle, null, 2));
  console.log('Successfully synchronized dhoni_warehouse_bundle.json');
}
