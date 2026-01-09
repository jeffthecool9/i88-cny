
import { TicketTier, Weapon } from './types.ts';

export const EVENT_DATES = {
  start: '12 Feb 2026',
  end: '27 Feb 2026',
  full: '12 Feb 2026 – 27 Feb 2026'
};

export const TICKET_TIERS: TicketTier[] = [
  { amount: 100, tickets: 1 },
  { amount: 150, tickets: 2 },
  { amount: 500, tickets: 6 },
  { amount: 1500, tickets: 16 }
];

export const INITIAL_WEAPONS: Weapon[] = [
  { id: '1', name: 'Sword of Lu', count: 0, max: 4, icon: '⚔️' },
  { id: '2', name: 'Flute of Han', count: 0, max: 4, icon: '🎷' },
  { id: '3', name: 'Fan of Zhong', count: 0, max: 4, icon: '🪭' },
  { id: '4', name: 'Flower Basket', count: 0, max: 4, icon: '🧺' },
  { id: '5', name: 'Gourd of Iron', count: 0, max: 4, icon: '🍶' },
  { id: '6', name: 'Lotus of He', count: 0, max: 4, icon: '🪷' },
  { id: '7', name: 'Castanets of Cao', count: 0, max: 4, icon: '🎼' },
  { id: '8', name: 'Crutch of Li', count: 0, max: 4, icon: '🪄' }
];

export const REWARD_CHANCES = [
  { type: 'Credits' as const, weight: 40 },
  { type: 'Rewards' as const, weight: 30 },
  { type: 'Big Rewards' as const, weight: 10 },
  { type: 'Thank You' as const, weight: 20 }
];
