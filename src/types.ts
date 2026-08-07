export type GroupName = 'A' | 'B' | 'C' | 'D';

export type MatchStatus = 'SCHEDULED' | 'LIVE' | 'FINISHED';

export interface Team {
  id: string;
  name: string;
  shortName: string;
  group: GroupName;
  primaryColor: string;
  secondaryColor: string;
  badgeSymbol: string; // Icon name or SVG identifier
  badgeType: 'crown' | 'lock' | 'star' | 'shield' | 'clover' | 'lightning' | 'bottle' | 'lion' | 'fire' | 'eagle';
  description?: string;
  keyPlayers?: string[];
}

export interface Goal {
  id: string;
  player: string;
  teamId: string;
  minute: number;
}

export interface CardEvent {
  id: string;
  player: string;
  teamId: string;
  type: 'yellow' | 'red';
  minute: number;
}

export interface Match {
  id: string;
  stage: 'GROUP' | 'QUARTERS' | 'SEMIS' | 'THIRD_PLACE' | 'FINAL';
  group?: GroupName;
  round?: number; // 1, 2, 3
  homeTeamId: string;
  awayTeamId: string;
  homeScore?: number;
  awayScore?: number;
  status: MatchStatus;
  date: string; // ISO date string or formatted
  timeBRT: string; // e.g. "15:00"
  timeCAT: string; // e.g. "20:30"
  goals?: Goal[];
  cards?: CardEvent[];
  videoUrl?: string;
}

export interface StandingsRow {
  team: Team;
  played: number; // J
  won: number; // V
  drawn: number; // E
  lost: number; // D
  goalsFor: number; // GP
  goalsAgainst: number; // GC
  goalDifference: number; // SG
  points: number; // Pts
  form: ('V' | 'E' | 'D')[];
  rank: number;
}

export interface GroupStandings {
  group: GroupName;
  rows: StandingsRow[];
}

export interface PlayerStat {
  id: string;
  name: string;
  teamId: string;
  goals: number;
  assists?: number;
  yellowCards?: number;
  redCards?: number;
}

export type TimezoneMode = 'BRT' | 'CAT';
