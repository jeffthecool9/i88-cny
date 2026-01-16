
import { TicketTier, Weapon } from './types.ts';

export const EVENT_DATES = {
  start: '12 Feb 2026',
  end: '27 Feb 2026',
  full: '12 Feb 2026 – 27 Feb 2026'
};

export const TICKET_TIERS: (TicketTier & { isPreEvent?: boolean })[] = [
  { amount: 100, tickets: 1 },
  { amount: 150, tickets: 2 },
  { amount: 500, tickets: 6, isPreEvent: true }
];

export const INITIAL_WEAPONS: Weapon[] = [
  { id: '1', name: 'Sword of Lu', count: 0, max: 4, image: 'weapon_1.png' },
  { id: '2', name: 'Flute of Han', count: 0, max: 4, image: 'weapon_2.png' },
  { id: '3', name: 'Fan of Zhong', count: 0, max: 4, image: 'weapon_3.png' },
  { id: '4', name: 'Flower Basket', count: 0, max: 4, image: 'weapon_4.png' },
  { id: '5', name: 'Gourd of Iron', count: 0, max: 4, image: 'weapon_5.png' },
  { id: '6', name: 'Lotus of He', count: 0, max: 4, image: 'weapon_6.png' },
  { id: '7', name: 'Castanets of Cao', count: 0, max: 4, image: 'weapon_7.png' },
  { id: '8', name: 'Crutch of Li', count: 0, max: 4, image: 'weapon_8.png' }
];

export const REWARD_CHANCES = [
  { type: 'DIVINE GOLD CREDITS REWARD' as const, weight: 40 },
  { type: 'MYSTIC WEAPON BUNDLE REWARD' as const, weight: 30 },
  { type: 'GRAND IMMORTAL TREASURE PRIZE' as const, weight: 10 },
  { type: 'BETTER LUCK NEXT TIME' as const, weight: 20 }
];
