import { Match } from '../types';

export const INITIAL_MATCHES: Match[] = [
  // ================= GRUPO A =================
  // Rodada 1 - 08/08/2026
  {
    id: 'm_a_r1_1',
    stage: 'GROUP',
    group: 'A',
    round: 1,
    homeTeamId: 'bayern',
    awayTeamId: 'bluelock',
    status: 'SCHEDULED',
    date: '2026-08-08',
    timeBRT: '15:00',
    timeCAT: '20:30'
  },
  {
    id: 'm_a_r1_2',
    stage: 'GROUP',
    group: 'A',
    round: 1,
    homeTeamId: 'celeste',
    awayTeamId: 'dominator',
    status: 'SCHEDULED',
    date: '2026-08-08',
    timeBRT: '15:40',
    timeCAT: '21:10'
  },
  // Rodada 2 - 09/08/2026
  {
    id: 'm_a_r2_1',
    stage: 'GROUP',
    group: 'A',
    round: 2,
    homeTeamId: 'bayern',
    awayTeamId: 'celeste',
    status: 'SCHEDULED',
    date: '2026-08-09',
    timeBRT: '15:00',
    timeCAT: '20:30'
  },
  {
    id: 'm_a_r2_2',
    stage: 'GROUP',
    group: 'A',
    round: 2,
    homeTeamId: 'bluelock',
    awayTeamId: 'dominator',
    status: 'SCHEDULED',
    date: '2026-08-09',
    timeBRT: '15:40',
    timeCAT: '21:10'
  },
  // Rodada 3 - 10/08/2026
  {
    id: 'm_a_r3_1',
    stage: 'GROUP',
    group: 'A',
    round: 3,
    homeTeamId: 'dominator',
    awayTeamId: 'bayern',
    status: 'SCHEDULED',
    date: '2026-08-10',
    timeBRT: '15:00',
    timeCAT: '20:30'
  },
  {
    id: 'm_a_r3_2',
    stage: 'GROUP',
    group: 'A',
    round: 3,
    homeTeamId: 'bluelock',
    awayTeamId: 'celeste',
    status: 'SCHEDULED',
    date: '2026-08-10',
    timeBRT: '15:40',
    timeCAT: '21:10'
  },

  // ================= GRUPO B =================
  // Rodada 1 - 08/08/2026
  {
    id: 'm_b_r1_1',
    stage: 'GROUP',
    group: 'B',
    round: 1,
    homeTeamId: 'curacao',
    awayTeamId: 'supergiants',
    status: 'SCHEDULED',
    date: '2026-08-08',
    timeBRT: '16:20',
    timeCAT: '21:50'
  },
  {
    id: 'm_b_r1_2',
    stage: 'GROUP',
    group: 'B',
    round: 1,
    homeTeamId: 'labamba',
    awayTeamId: 'levante',
    status: 'SCHEDULED',
    date: '2026-08-08',
    timeBRT: '17:00',
    timeCAT: '22:30'
  },
  // Rodada 2 - 09/08/2026
  {
    id: 'm_b_r2_1',
    stage: 'GROUP',
    group: 'B',
    round: 2,
    homeTeamId: 'curacao',
    awayTeamId: 'labamba',
    status: 'SCHEDULED',
    date: '2026-08-09',
    timeBRT: '16:20',
    timeCAT: '21:50'
  },
  {
    id: 'm_b_r2_2',
    stage: 'GROUP',
    group: 'B',
    round: 2,
    homeTeamId: 'supergiants',
    awayTeamId: 'levante',
    status: 'SCHEDULED',
    date: '2026-08-09',
    timeBRT: '17:00',
    timeCAT: '22:30'
  },
  // Rodada 3 - 10/08/2026
  {
    id: 'm_b_r3_1',
    stage: 'GROUP',
    group: 'B',
    round: 3,
    homeTeamId: 'levante',
    awayTeamId: 'curacao',
    status: 'SCHEDULED',
    date: '2026-08-10',
    timeBRT: '16:20',
    timeCAT: '21:50'
  },
  {
    id: 'm_b_r3_2',
    stage: 'GROUP',
    group: 'B',
    round: 3,
    homeTeamId: 'supergiants',
    awayTeamId: 'labamba',
    status: 'SCHEDULED',
    date: '2026-08-10',
    timeBRT: '17:00',
    timeCAT: '22:30'
  },

  // ================= GRUPO C =================
  // Rodada 1 - 08/08/2026
  {
    id: 'm_c_r1_1',
    stage: 'GROUP',
    group: 'C',
    round: 1,
    homeTeamId: 'luck',
    awayTeamId: 'yuriman',
    status: 'SCHEDULED',
    date: '2026-08-08',
    timeBRT: '17:40',
    timeCAT: '23:10'
  },
  {
    id: 'm_c_r1_2',
    stage: 'GROUP',
    group: 'C',
    round: 1,
    homeTeamId: 'bayer_munchen',
    awayTeamId: 'zanix',
    status: 'SCHEDULED',
    date: '2026-08-08',
    timeBRT: '18:20',
    timeCAT: '23:50'
  },
  // Rodada 2 - 09/08/2026
  {
    id: 'm_c_r2_1',
    stage: 'GROUP',
    group: 'C',
    round: 2,
    homeTeamId: 'luck',
    awayTeamId: 'bayer_munchen',
    status: 'SCHEDULED',
    date: '2026-08-09',
    timeBRT: '17:40',
    timeCAT: '23:10'
  },
  {
    id: 'm_c_r2_2',
    stage: 'GROUP',
    group: 'C',
    round: 2,
    homeTeamId: 'yuriman',
    awayTeamId: 'zanix',
    status: 'SCHEDULED',
    date: '2026-08-09',
    timeBRT: '18:20',
    timeCAT: '23:50'
  },
  // Rodada 3 - 10/08/2026
  {
    id: 'm_c_r3_1',
    stage: 'GROUP',
    group: 'C',
    round: 3,
    homeTeamId: 'zanix',
    awayTeamId: 'luck',
    status: 'SCHEDULED',
    date: '2026-08-10',
    timeBRT: '17:40',
    timeCAT: '23:10'
  },
  {
    id: 'm_c_r3_2',
    stage: 'GROUP',
    group: 'C',
    round: 3,
    homeTeamId: 'yuriman',
    awayTeamId: 'bayer_munchen',
    status: 'SCHEDULED',
    date: '2026-08-10',
    timeBRT: '18:20',
    timeCAT: '23:50'
  },

  // ================= GRUPO D =================
  // Rodada 1 - 08/08/2026
  {
    id: 'm_d_r1_1',
    stage: 'GROUP',
    group: 'D',
    round: 1,
    homeTeamId: 'realmadrid',
    awayTeamId: 'adra',
    status: 'SCHEDULED',
    date: '2026-08-08',
    timeBRT: '19:00',
    timeCAT: '00:30'
  },
  {
    id: 'm_d_r1_2',
    stage: 'GROUP',
    group: 'D',
    round: 1,
    homeTeamId: 'babymaxx',
    awayTeamId: 'soda',
    status: 'SCHEDULED',
    date: '2026-08-08',
    timeBRT: '19:40',
    timeCAT: '01:10'
  },
  // Rodada 2 - 09/08/2026
  {
    id: 'm_d_r2_1',
    stage: 'GROUP',
    group: 'D',
    round: 2,
    homeTeamId: 'realmadrid',
    awayTeamId: 'babymaxx',
    status: 'SCHEDULED',
    date: '2026-08-09',
    timeBRT: '19:00',
    timeCAT: '00:30'
  },
  {
    id: 'm_d_r2_2',
    stage: 'GROUP',
    group: 'D',
    round: 2,
    homeTeamId: 'adra',
    awayTeamId: 'soda',
    status: 'SCHEDULED',
    date: '2026-08-09',
    timeBRT: '19:40',
    timeCAT: '01:10'
  },
  // Rodada 3 - 10/08/2026
  {
    id: 'm_d_r3_1',
    stage: 'GROUP',
    group: 'D',
    round: 3,
    homeTeamId: 'soda',
    awayTeamId: 'realmadrid',
    status: 'SCHEDULED',
    date: '2026-08-10',
    timeBRT: '19:00',
    timeCAT: '00:30'
  },
  {
    id: 'm_d_r3_2',
    stage: 'GROUP',
    group: 'D',
    round: 3,
    homeTeamId: 'adra',
    awayTeamId: 'babymaxx',
    status: 'SCHEDULED',
    date: '2026-08-10',
    timeBRT: '19:40',
    timeCAT: '01:10'
  },

  // ================= MATA-MATA (QUARTAS DE FINAL) =================
  {
    id: 'm_qf1',
    stage: 'QUARTERS',
    homeTeamId: 'bayern',
    awayTeamId: 'labamba',
    status: 'SCHEDULED',
    date: '2026-08-11',
    timeBRT: '15:00',
    timeCAT: '20:30'
  },
  {
    id: 'm_qf2',
    stage: 'QUARTERS',
    homeTeamId: 'supergiants',
    awayTeamId: 'bluelock',
    status: 'SCHEDULED',
    date: '2026-08-11',
    timeBRT: '16:15',
    timeCAT: '21:45'
  },
  {
    id: 'm_qf3',
    stage: 'QUARTERS',
    homeTeamId: 'yuriman',
    awayTeamId: 'soda',
    status: 'SCHEDULED',
    date: '2026-08-11',
    timeBRT: '17:30',
    timeCAT: '23:00'
  },
  {
    id: 'm_qf4',
    stage: 'QUARTERS',
    homeTeamId: 'realmadrid',
    awayTeamId: 'bayer_munchen',
    status: 'SCHEDULED',
    date: '2026-08-11',
    timeBRT: '18:45',
    timeCAT: '00:15'
  },

  // ================= SEMIFINAIS =================
  {
    id: 'm_sf1',
    stage: 'SEMIS',
    homeTeamId: 'bayern',
    awayTeamId: 'yuriman',
    status: 'SCHEDULED',
    date: '2026-08-12',
    timeBRT: '16:00',
    timeCAT: '21:30'
  },
  {
    id: 'm_sf2',
    stage: 'SEMIS',
    homeTeamId: 'supergiants',
    awayTeamId: 'realmadrid',
    status: 'SCHEDULED',
    date: '2026-08-12',
    timeBRT: '17:30',
    timeCAT: '23:00'
  },

  // ================= 3º LUGAR E GRANDE FINAL =================
  {
    id: 'm_3rd',
    stage: 'THIRD_PLACE',
    homeTeamId: 'yuriman',
    awayTeamId: 'supergiants',
    status: 'SCHEDULED',
    date: '2026-08-13',
    timeBRT: '16:00',
    timeCAT: '21:30'
  },
  {
    id: 'm_final',
    stage: 'FINAL',
    homeTeamId: 'bayern',
    awayTeamId: 'realmadrid',
    status: 'SCHEDULED',
    date: '2026-08-13',
    timeBRT: '18:00',
    timeCAT: '23:30'
  }
];
