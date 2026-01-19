import { TicketTier, Weapon, RewardType } from './types.ts';

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
  { id: '1', name: 'Sword of Lu', count: 0, max: 4, image: '', icon: 'A glowing ancient Chinese Jian sword, blue jade hilt with gold filigree, silver shining blade, floating vertically' },
  { id: '2', name: 'Flute of Han', count: 0, max: 4, image: '', icon: 'A polished green jade bamboo flute, intricate gold carvings, red silk tassels flowing' },
  { id: '3', name: 'Fan of Zhong', count: 0, max: 4, image: '', icon: 'A mystical giant palm leaf fan, emerald green with glowing golden ribs' },
  { id: '4', name: 'Flower Basket', count: 0, max: 4, image: '', icon: 'A divine golden woven basket with celestial lilies and glowing peonies inside' },
  { id: '5', name: 'Gourd of Iron', count: 0, max: 4, image: '', icon: 'A sacred golden gourd vessel tied with red silk cords, floating with mystical mist' },
  { id: '6', name: 'Lotus of He', count: 0, max: 4, image: '', icon: 'A glowing pink ethereal lotus flower on a crystal stem, sparkling with golden dust' },
  { id: '7', name: 'Castanets of Cao', count: 0, max: 4, image: '', icon: 'Two large polished imperial green jade tablets joined by heavy gold rings' },
  { id: '8', name: 'Crutch of Li', count: 0, max: 4, image: '', icon: 'A mystical iron staff with a dragon-head handle, glowing with amber energy core' }
];

export const REWARD_CHANCES: { type: RewardType; weight: number }[] = [
  { type: 'DIVINE GOLD CREDITS REWARD', weight: 40 },
  { type: 'MYSTIC WEAPON BUNDLE REWARD', weight: 30 },
  { type: 'GRAND IMMORTAL TREASURE PRIZE', weight: 10 },
  { type: 'BETTER LUCK NEXT TIME', weight: 20 }
];