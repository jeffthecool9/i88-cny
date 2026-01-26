export const EVENT_DATES = {
  start: "TBA",
  end: "TBA",
  full: "CNY 2026 • Limited Time",
};

export const TICKET_TIERS = [
  { amount: 50, tickets: 1, isPreEvent: true },
  { amount: 100, tickets: 3, isPreEvent: false },
  { amount: 200, tickets: 8, isPreEvent: false },
];

export const REWARD_CHANCES = [
  { type: "RM 2 Cash" as const, weight: 40 },
  { type: "RM 5 Cash" as const, weight: 30 },
  { type: "RM 8 Cash" as const, weight: 15 },
  { type: "RM 18 Cash" as const, weight: 10 },
  { type: "RM 88 Cash" as const, weight: 5 },
];
