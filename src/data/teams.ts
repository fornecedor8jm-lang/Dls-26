import { Team } from '../types';

export const TEAMS: Team[] = [
  // GRUPO A
  {
    id: 'bayern',
    name: 'FC Bayern',
    shortName: 'BAY',
    group: 'A',
    primaryColor: '#DC052D',
    secondaryColor: '#0066B2',
    badgeSymbol: 'Shield',
    badgeType: 'shield',
    description: 'Tradicional gigante de Munique na busca pelo domínio total na Copa DLS.',
    keyPlayers: ['Lewandowski', 'Müller', 'Sané', 'Neuer']
  },
  {
    id: 'bluelock',
    name: 'Blue Lock',
    shortName: 'BLK',
    group: 'A',
    primaryColor: '#0055FF',
    secondaryColor: '#00E5FF',
    badgeSymbol: 'Lock',
    badgeType: 'lock',
    description: 'Projeto focado na criação do atacante mais egoísta e implacável do torneio.',
    keyPlayers: ['Isagi Yoichi', 'Rin Itoshi', 'Nagi Seishiro', 'Bachira Meguru']
  },
  {
    id: 'celeste',
    name: 'FC Celeste',
    shortName: 'CEL',
    group: 'A',
    primaryColor: '#38BDF8',
    secondaryColor: '#FFFFFF',
    badgeSymbol: 'Star',
    badgeType: 'star',
    description: 'Força celeste com futebol bonito e passes rápidos no gramado virtual.',
    keyPlayers: ['Gabriel Celeste', 'Cavani', 'Arrascaeta', 'Muslera']
  },
  {
    id: 'dominator',
    name: 'Dominator',
    shortName: 'DOM',
    group: 'A',
    primaryColor: '#A855F7',
    secondaryColor: '#F59E0B',
    badgeSymbol: 'Crown',
    badgeType: 'crown',
    description: 'Equipe tática e incansável pronta para dominar a fase de grupos.',
    keyPlayers: ['Dominik', 'Kaiser', 'Vargas', 'Ochoa']
  },

  // GRUPO B
  {
    id: 'curacao',
    name: 'Curaçao',
    shortName: 'CUR',
    group: 'B',
    primaryColor: '#1E40AF',
    secondaryColor: '#FACC15',
    badgeSymbol: 'Eagle',
    badgeType: 'eagle',
    description: 'Seleção caribenha de alta velocidade e jogadas aéreas mortais.',
    keyPlayers: ['Bacuna', 'Kastaneer', 'Gorré', 'Room']
  },
  {
    id: 'supergiants',
    name: 'Super Giants',
    shortName: 'SGI',
    group: 'B',
    primaryColor: '#10B981',
    secondaryColor: '#064E3B',
    badgeSymbol: 'Shield',
    badgeType: 'shield',
    description: 'Gigantes da defesa com poder ofensivo avassalador.',
    keyPlayers: ['Titan', 'Goliath', 'Goretzka', 'Courtois']
  },
  {
    id: 'labamba',
    name: 'FC Labamba',
    shortName: 'LAB',
    group: 'B',
    primaryColor: '#F97316',
    secondaryColor: '#BE185D',
    badgeSymbol: 'Fire',
    badgeType: 'fire',
    description: 'Futebol quente com muita dancinha e gols espetaculares.',
    keyPlayers: ['Ritchie Bamba', 'Samba Jr', 'Ronaldinho', 'Richarlison']
  },
  {
    id: 'levante',
    name: 'FC Levante',
    shortName: 'LEV',
    group: 'B',
    primaryColor: '#881337',
    secondaryColor: '#1E3A8A',
    badgeSymbol: 'Shield',
    badgeType: 'shield',
    description: 'Resiliência espanhola e contra-ataques cirúrgicos.',
    keyPlayers: ['Morales', 'Campaña', 'Roger Martí', 'Aitor']
  },

  // GRUPO C
  {
    id: 'luck',
    name: 'Luck',
    shortName: 'LUK',
    group: 'C',
    primaryColor: '#16A34A',
    secondaryColor: '#F43F5E',
    badgeSymbol: 'Clover',
    badgeType: 'clover',
    description: 'A sorte está ao lado de quem joga com raça e precisão.',
    keyPlayers: ['Lucky Luke', 'Felix', 'Sanches', 'Fortuna']
  },
  {
    id: 'yuriman',
    name: 'Yuri Man',
    shortName: 'YUR',
    group: 'C',
    primaryColor: '#C084FC',
    secondaryColor: '#4C1D95',
    badgeSymbol: 'Crown',
    badgeType: 'crown',
    description: 'Time ousado com meias habilidosos e chutes de longa distância.',
    keyPlayers: ['Yuri Alberto', 'Yuri Boyka', 'Modric', 'Dybala']
  },
  {
    id: 'bayer_munchen',
    name: 'Bayer de Munchen',
    shortName: 'BMU',
    group: 'C',
    primaryColor: '#EF4444',
    secondaryColor: '#1E293B',
    badgeSymbol: 'Shield',
    badgeType: 'shield',
    description: 'Super-potência tática com futebol moderno e pressão alta.',
    keyPlayers: ['Musiala', 'Kimmich', 'Coman', 'Upamecano']
  },
  {
    id: 'zanix',
    name: 'Zanix',
    shortName: 'ZNX',
    group: 'C',
    primaryColor: '#0EA5E9',
    secondaryColor: '#0F172A',
    badgeSymbol: 'Lightning',
    badgeType: 'lightning',
    description: 'Velocidade da luz nas pontas e transições fulminantes.',
    keyPlayers: ['Zane', 'Xavier', 'Mbappé', 'Walker']
  },

  // GRUPO D
  {
    id: 'realmadrid',
    name: 'Real Madrid CF',
    shortName: 'RMA',
    group: 'D',
    primaryColor: '#F59E0B',
    secondaryColor: '#FFFFFF',
    badgeSymbol: 'Crown',
    badgeType: 'crown',
    description: 'Reis das viradas e maiores campeões do futebol mundial.',
    keyPlayers: ['Vinicius Jr', 'Bellingham', 'Rodrygo', 'Valverde']
  },
  {
    id: 'adra',
    name: 'Adra FC',
    shortName: 'ADR',
    group: 'D',
    primaryColor: '#0284C7',
    secondaryColor: '#F59E0B',
    badgeSymbol: 'Shield',
    badgeType: 'shield',
    description: 'Equipe misteriosa com conjunto forte e defesa impenetrável.',
    keyPlayers: ['Adria', 'Ramos', 'Casemiro', 'Oblak']
  },
  {
    id: 'babymaxx',
    name: 'Baby Maxx',
    shortName: 'BMX',
    group: 'D',
    primaryColor: '#EC4899',
    secondaryColor: '#8B5CF6',
    badgeSymbol: 'Star',
    badgeType: 'star',
    description: 'Jovens prodígios do DLS prontos para surpreender os veteranos.',
    keyPlayers: ['Maxx', 'Endrick', 'Yamal', 'Gavi']
  },
  {
    id: 'soda',
    name: 'Soda FC',
    shortName: 'SOD',
    group: 'D',
    primaryColor: '#DC2626',
    secondaryColor: '#F8FAFC',
    badgeSymbol: 'Bottle',
    badgeType: 'bottle',
    description: 'Refrescante e efervescente, especialista em golaços de fora da área.',
    keyPlayers: ['Soda King', 'Foden', 'De Bruyne', 'Ederson']
  }
];

export const getTeamById = (id: string): Team => {
  const found = TEAMS.find((t) => t.id === id);
  if (found) return found;
  return {
    id: id,
    name: id,
    shortName: id.slice(0, 3).toUpperCase(),
    group: 'A',
    primaryColor: '#64748B',
    secondaryColor: '#0F172A',
    badgeSymbol: 'Shield',
    badgeType: 'shield'
  };
};
