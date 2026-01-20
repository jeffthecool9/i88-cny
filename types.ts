
export type RewardType = 
  | '100 Slot Free Spins' 
  | 'RM10 in Live Casino only' 
  | 'RM50 Credits' 
  | 'RM15 Credits';

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
