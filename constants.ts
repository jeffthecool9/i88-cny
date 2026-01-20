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
  { id: '1', name: 'Sword of Lu', count: 0, max: 4, image: '', icon: 'A magnificent ancient Chinese Jian sword, blue jade hilt with gold filigree, silver shining blade' },
  { id: '2', name: 'Flute of Han', count: 0, max: 4, image: '', icon: 'A polished green jade bamboo flute with intricate gold carvings and flowing red silk tassels' },
  { id: '3', name: 'Fan of Zhong', count: 0, max: 4, image: '', icon: 'A giant mystical palm leaf fan, emerald green with golden ribs and a glowing core' },
  { id: '4', name: 'Flower Basket', count: 0, max: 4, image: '', icon: 'A divine woven golden basket overflowing with celestial white lilies and magical peonies' },
  { id: '5', name: 'Gourd of Iron', count: 0, max: 4, image: '', icon: 'A sacred golden gourd vessel tied with red cords, floating with mystical vapor' },
  { id: '6', name: 'Lotus of He', count: 0, max: 4, image: '', icon: 'A glowing ethereal pink lotus flower on a crystal stem, sparkling with divine light' },
  { id: '7', name: 'Castanets of Cao', count: 0, max: 4, image: '', icon: 'Two polished imperial jade tablets joined by gold rings, engraved with ancient symbols' },
  { id: '8', name: 'Crutch of Li', count: 0, max: 4, image: '', icon: 'A mystical iron staff with a curved dragon-head handle, glowing with amber energy' }
];

// Added explicit RewardType to ensure synchronization with MiniGame components and fixed naming inconsistency
export const REWARD_CHANCES: { type: RewardType; weight: number }[] = [
  { type: '100 Slot Free Spins', weight: 40 },
  { type: 'RM10 in Live Casino only' , weight: 30 },
  { type: 'RM50 Credits' , weight: 10 },
  { type: 'RM15 Credits', weight: 20 }
];