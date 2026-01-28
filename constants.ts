
import { TicketTier, Weapon, RewardType } from './types.ts';

export const BRAND_STORY = {
  name: 'i88',
  established: '2017',
  yearsOfTrust: '9 Years of Excellence',
  regions: 'Malaysia & Singapore',
  tagline: 'The Gold Standard of Digital Entertainment since 2017'
};

export const EVENT_DATES = {
  preStart: '10 Feb 2026',
  preEnd: '12 Feb 2026',
  start: '12 Feb 2026',
  end: '27 Feb 2026',
  full: '12 Feb 2026 – 27 Feb 2026',
  preFull: '10 Feb 2026 – 12 Feb 2026'
};

export const REGULAR_RATE = { amount: 100, tickets: 1 };

export const PRE_EVENT_TIERS: (TicketTier & { isPreEvent?: boolean })[] = [
  { amount: 150, tickets: 2, bonus: true },
  { amount: 500, tickets: 6, bonus: true },
  { amount: 1500, tickets: 16, bonus: true }
];

export const TICKET_TIERS: (TicketTier & { isPreEvent?: boolean })[] = [
  ...PRE_EVENT_TIERS,
  { ...REGULAR_RATE, isPreEvent: false }
];

export const INITIAL_WEAPONS: Weapon[] = [
  { id: '1', name: 'Imperial Jian of Lu Dongbin', count: 0, max: 1, image: '', icon: 'Ancient Chinese Jian sword' },
  { id: '2', name: 'Celestial Flute of Han Xiangzi', count: 0, max: 1, image: '', icon: 'Emerald jade bamboo flute' },
  { id: '3', name: 'Ethereal Fan of Zhongli Quan', count: 0, max: 1, image: '', icon: 'Golden palm leaf fan' },
  { id: '4', name: 'Golden Basket of Lan Caihe', count: 0, max: 1, image: '', icon: 'Divine woven basket' },
  { id: '5', name: 'Sacred Gourd of Li Tieguai', count: 0, max: 1, image: '', icon: 'Sacred iron gourd vessel' },
  { id: '6', name: 'Crystalline Lotus of He Xiangu', count: 0, max: 1, image: '', icon: 'Crystalline pink lotus' },
  { id: '7', name: 'Jade Castanets of Cao Guojiu', count: 0, max: 1, image: '', icon: 'Imperial jade tablets' },
  { id: '8', name: 'Dragon Staff of Zhang Guolao', count: 0, max: 1, image: '', icon: 'Powerful iron dragon staff' }
];

export const REWARD_CHANCES: { type: RewardType; weight: number }[] = [
  { type: '100 Slot Free Spins', weight: 40 },
  { type: 'RM10 in Live Casino only' , weight: 30 },
  { type: 'RM50 Credits' , weight: 10 },
  { type: 'RM15 Credits', weight: 20 }
];
