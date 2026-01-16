
export type RewardType = 
  | 'DIVINE GOLD CREDITS REWARD' 
  | 'MYSTIC WEAPON BUNDLE REWARD' 
  | 'GRAND IMMORTAL TREASURE PRIZE' 
  | 'BETTER LUCK NEXT TIME';

export interface TicketTier {
  amount: number;
  tickets: number;
  bonus?: boolean;
}

export interface Weapon {
  id: string;
  name: string;
  count: number;
  max: number;
  image: string;
  icon?: string; // Optional fallback
}

export interface GameState {
  tickets: number;
  weapons: Weapon[];
  isGameOpen: boolean;
}
