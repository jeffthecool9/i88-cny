import { TicketTier, Weapon, RewardType } from "./types";

/* =======================
   EVENT DATES
======================= */
export const EVENT_DATES = {
  preEvent: "10 Feb 2026 – 12 Feb 2026",
  mainEvent: "12 Feb 2026 – 27 Feb 2026",
};

/* =======================
   PRE-EVENT TIERS
======================= */
export const PRE_EVENT_TIERS: TicketTier[] = [
  { amount: 150, tickets: 2 },
  { amount: 500, tickets: 6 },
  { amount: 1500, tickets: 16 },
];

/* =======================
   MAIN EVENT RATE
======================= */
export const REGULAR_RATE: TicketTier = {
  amount: 100,
  tickets: 1,
};

/* =======================
   WEAPONS
======================= */
export const INITIAL_WEAPONS: Weapon[] = [
  { id: "1", name: "Sword of Lu", count: 0, max: 1, image: "", icon: "" },
  { id: "2", name: "Flute of Han", count: 0, max: 1, image: "", icon: "" },
  { id: "3", name: "Fan of Zhong", count: 0, max: 1, image: "", icon: "" },
  { id: "4", name: "Flower Basket", count: 0, max: 1, image: "", icon: "" },
  { id: "5", name: "Gourd of Iron", count: 0, max: 1, image: "", icon: "" },
  { id: "6", name: "Lotus of He", count: 0, max: 1, image: "", icon: "" },
  { id: "7", name: "Castanets of Cao", count: 0, max: 1, image: "", icon: "" },
  { id: "8", name: "Crutch of Li", count: 0, max: 1, image: "", icon: "" },
];

/* =======================
   REWARDS
======================= */
export const REWARD_CHANCES: { type: RewardType; weight: number }[] = [
  { type: "100 Slot Free Spins", weight: 40 },
  { type: "RM10 Live Casino Credit", weight: 30 },
  { type: "RM15 Credit", weight: 20 },
  { type: "RM50 Credit", weight: 10 },
];
