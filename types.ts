
// Fixed: Updated RewardType to include high-end brand archetypes from constants.ts to resolve type mismatches
export type RewardType = 
  | 'RM38,888!' 
  | '1 Full Set Weapon' 
  | 'RM15 Credits' 
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
