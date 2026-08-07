import { GroupName, Match, StandingsRow, Team } from '../types';

export function calculateGroupStandings(
  group: GroupName,
  matches: Match[],
  teamsInGroup: Team[]
): StandingsRow[] {
  // Initialize map for stats
  const statsMap: Record<string, StandingsRow> = {};

  teamsInGroup.forEach((team) => {
    statsMap[team.id] = {
      team,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0,
      form: [],
      rank: 1
    };
  });

  // Filter finished group matches for this group
  const groupMatches = matches.filter(
    (m) => m.stage === 'GROUP' && m.group === group && m.status === 'FINISHED'
  );

  groupMatches.forEach((match) => {
    const home = statsMap[match.homeTeamId];
    const away = statsMap[match.awayTeamId];

    if (!home || !away) return;

    const hs = match.homeScore ?? 0;
    const as = match.awayScore ?? 0;

    home.played += 1;
    away.played += 1;

    home.goalsFor += hs;
    home.goalsAgainst += as;
    away.goalsFor += as;
    away.goalsAgainst += hs;

    if (hs > as) {
      home.won += 1;
      home.points += 3;
      home.form.push('V');

      away.lost += 1;
      away.form.push('D');
    } else if (as > hs) {
      away.won += 1;
      away.points += 3;
      away.form.push('V');

      home.lost += 1;
      home.form.push('D');
    } else {
      home.drawn += 1;
      home.points += 1;
      home.form.push('E');

      away.drawn += 1;
      away.points += 1;
      away.form.push('E');
    }
  });

  // Calculate Goal Difference
  Object.values(statsMap).forEach((row) => {
    row.goalDifference = row.goalsFor - row.goalsAgainst;
    // Keep last 5 form results
    if (row.form.length > 5) {
      row.form = row.form.slice(row.form.length - 5);
    }
  });

  // Convert to array and sort according to tiebreaker rules
  const rows = Object.values(statsMap);

  rows.sort((a, b) => {
    // 1. Pontos
    if (b.points !== a.points) {
      return b.points - a.points;
    }

    // 2. Saldo de Gols (SG)
    if (b.goalDifference !== a.goalDifference) {
      return b.goalDifference - a.goalDifference;
    }

    // 3. Gols Pró (GP)
    if (b.goalsFor !== a.goalsFor) {
      return b.goalsFor - a.goalsFor;
    }

    // 4. Confronto Direto (Head-to-Head between a and b)
    const headToHead = groupMatches.find(
      (m) =>
        (m.homeTeamId === a.team.id && m.awayTeamId === b.team.id) ||
        (m.homeTeamId === b.team.id && m.awayTeamId === a.team.id)
    );

    if (headToHead && headToHead.homeScore !== undefined && headToHead.awayScore !== undefined) {
      if (headToHead.homeTeamId === a.team.id) {
        if (headToHead.homeScore > headToHead.awayScore) return -1; // a wins
        if (headToHead.awayScore > headToHead.homeScore) return 1;  // b wins
      } else {
        if (headToHead.awayScore > headToHead.homeScore) return -1; // a wins (as away)
        if (headToHead.homeScore > headToHead.awayScore) return 1;  // b wins (as home)
      }
    }

    // 5. Vitórias
    if (b.won !== a.won) {
      return b.won - a.won;
    }

    // Fallback alphabetical
    return a.team.name.localeCompare(b.team.name);
  });

  // Assign ranks
  rows.forEach((row, index) => {
    row.rank = index + 1;
  });

  return rows;
}
