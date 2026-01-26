import { TicketTier, Weapon, RewardType } from "./types.ts";

/**
 * Dates
 * - full: main event
 * - preFull: pre-event sales period
 */
export const EVENT_DATES = {
  start: "12 Feb 2026",
  end: "27 Feb 2026",
  full: "12 Feb 2026 – 27 Feb 2026",
  preStart: "01 Feb 2026",
  preEnd: "11 Feb 2026",
  preFull: "01 Feb 2026 – 11 Feb 2026",
};

/**
 * Regular event rate (used in PreEventSection comparison banner)
 */
export const REGULAR_RATE = {
  amount: 100,
  tickets: 1,
};

/**
 * Ticket tiers
 * - TICKET_TIERS: used for general ticket logic / display
 * - PRE_EVENT_TIERS: used specifically for PreEventSection cards
 */
export const TICKET_TIERS: (TicketTier & { isPreEvent?: boolean })[] = [
  { amount: 100, tickets: 1 },
  { amount: 150, tickets: 2 },
  { amount: 500, tickets: 6, isPreEvent: true },
];

/**
 * Pre-event tiers (you can tune these numbers any time)
 * NOTE: Keep these more attractive than regular rate.
 */
export const PRE_EVENT_TIERS: TicketTier[] = [
  { amount: 100, tickets: 2 },
  { amount: 150, tickets: 3 },
  { amount: 500, tickets: 8 },
];

/**
 * Weapons (8 Immortals)
 */
export const INITIAL_WEAPONS: Weapon[] = [
  {
    id: "1",
    name: "Sword of Lu",
    count: 0,
    max: 1,
    image: "",
    icon: "Ancient Chinese Jian sword with blue jade hilt and golden dragon carvings, shining silver blade, mystical glow",
  },
  {
    id: "2",
    name: "Flute of Han",
    count: 0,
    max: 1,
    image: "",
    icon: "Polished emerald jade bamboo flute with intricate gold filigree and flowing red silk tassels",
  },
  {
    id: "3",
    name: "Fan of Zhong",
    count: 0,
    max: 1,
    image: "",
    icon: "Giant mystical fan made of golden palm leaves and celestial emeralds, radiating ancient energy",
  },
  {
    id: "4",
    name: "Flower Basket",
    count: 0,
    max: 1,
    image: "",
    icon: "Divine basket woven from pure gold thread, filled with glowing celestial peonies and lilies",
  },
  {
    id: "5",
    name: "Gourd of Iron",
    count: 0,
    max: 1,
    image: "",
    icon: "Sacred iron gourd vessel wrapped in red ceremonial cords, emitting mystical amber vapor",
  },
  {
    id: "6",
    name: "Lotus of He",
    count: 0,
    max: 1,
    image: "",
    icon: "Crystalline pink lotus flower with a glowing heart and shimmering gold stem, blooming with light",
  },
  {
    id: "7",
    name: "Castanets of Cao",
    count: 0,
    max: 1,
    image: "",
    icon: "Two high-polished imperial jade tablets connected by gold rings, engraved with ancient symbols",
  },
  {
    id: "8",
    name: "Crutch of Li",
    count: 0,
    max: 1,
    image: "",
    icon: "Powerful iron staff with a golden dragon-head grip, surging with crackling mystical energy",
  },
];

/**
 * MiniGame reward chances
 */
export const REWARD_CHANCES: { type: RewardType; weight: number }[] = [
  { type: "100 Slot Free Spins", weight: 40 },
  { type: "RM10 in Live Casino only", weight: 30 },
  { type: "RM50 Credits", weight: 10 },
  { type: "RM15 Credits", weight: 20 },
];
