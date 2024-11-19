export interface Player {
  health: number;
  maxHealth: number;
  money: number;
  rank: string;
  level: number;
  progress: number;
  inventory: Record<string, number>;
  currentLocation: string;
  maxInventorySpace: number;
}


export interface Product {
  id: string;
  name: string;
  basePrice: number;
  weight: number;
}

export interface Location {
  id: string;
  name: string;
  policeActivity: number;
  products: Record<string, { price: number; quantity: number }>;
  rumors: Rumor[];
  actions: Action[];
  status: Status;
  priceRange: { min: number; max: number };
  flyTicketPrice: number;
  daysToTravel: number;
}

export interface GameState {
  player: Player;
  locations: Location[];
  currentDate: Date;
  products: Product[];
}

export interface Loan {
  lender: string;
  amount: number;
  interestRate: number;
  dueDate: Date;
}

export interface Rumor {
  productId: string;
  locationId: string;
  effect: string;
}

export interface Action {
  name: string;
  execute: (gameState: GameState) => void;
}

export interface Status {
  location: string;
  health: number;
  day: GameDate;
  rank: string;
  cash: number;
  bank: number;
  debt: number;
}

export interface GameDate {
  day: number;
  month: number;
  year: number;
}

