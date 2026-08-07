import { Match, PlayerStat } from '../types';
import { INITIAL_MATCHES } from '../data/initialMatches';
import { TEAMS } from '../data/teams';

const STORAGE_KEY = 'copa_dls_matches_v2_clean';

export function loadMatchesFromStorage(): Match[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Failed to load matches from localStorage:', err);
  }
  return INITIAL_MATCHES;
}

export function saveMatchesToStorage(matches: Match[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(matches));
  } catch (err) {
    console.error('Failed to save matches to localStorage:', err);
  }
}

export function resetMatchesStorage(): Match[] {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error(err);
  }
  return INITIAL_MATCHES;
}

export function computePlayerStats(matches: Match[]): PlayerStat[] {
  const statsMap: Record<string, PlayerStat> = {};

  matches.forEach((match) => {
    if (match.status !== 'FINISHED' && match.status !== 'LIVE') return;

    // Process goals
    if (match.goals) {
      match.goals.forEach((goal) => {
        const key = `${goal.player}_${goal.teamId}`;
        if (!statsMap[key]) {
          statsMap[key] = {
            id: key,
            name: goal.player,
            teamId: goal.teamId,
            goals: 0,
            yellowCards: 0,
            redCards: 0
          };
        }
        statsMap[key].goals += 1;
      });
    }

    // Process cards
    if (match.cards) {
      match.cards.forEach((card) => {
        const key = `${card.player}_${card.teamId}`;
        if (!statsMap[key]) {
          statsMap[key] = {
            id: key,
            name: card.player,
            teamId: card.teamId,
            goals: 0,
            yellowCards: 0,
            redCards: 0
          };
        }
        if (card.type === 'yellow') {
          statsMap[key].yellowCards = (statsMap[key].yellowCards || 0) + 1;
        } else if (card.type === 'red') {
          statsMap[key].redCards = (statsMap[key].redCards || 0) + 1;
        }
      });
    }
  });

  return Object.values(statsMap).sort((a, b) => b.goals - a.goals);
}

export function getTournamentSummary(matches: Match[]) {
  const finished = matches.filter((m) => m.status === 'FINISHED');
  let totalGoals = 0;
  finished.forEach((m) => {
    totalGoals += (m.homeScore ?? 0) + (m.awayScore ?? 0);
  });

  const totalMatches = matches.length;
  const matchesPlayed = finished.length;
  const avgGoals = matchesPlayed > 0 ? (totalGoals / matchesPlayed).toFixed(2) : '0.00';

  return {
    totalMatches,
    matchesPlayed,
    totalGoals,
    avgGoals,
    teamsCount: TEAMS.length
  };
}
