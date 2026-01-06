
export type RewardType = 'Credits' | 'Rewards' | 'Big Rewards' | 'Thank You';

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
  icon: string;
}

export interface GameState {
  tickets: number;
  weapons: Weapon[];
  isGameOpen: boolean;
}
