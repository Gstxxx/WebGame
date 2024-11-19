import { create } from 'zustand';
import { GameState, Player, Location, Product } from '../types/game';

const INITIAL_PRODUCTS: Product[] = [
  { id: 'weed', name: 'Weed', basePrice: 100, weight: 1 },
  { id: 'cocaine', name: 'Cocaine', basePrice: 1000, weight: 0.5 },
  { id: 'heroin', name: 'Heroin', basePrice: 2000, weight: 0.3 },
  { id: 'ecstasy', name: 'Ecstasy', basePrice: 1500, weight: 0.4 },
  { id: 'acid', name: 'Acid', basePrice: 800, weight: 0.2 },
];

const INITIAL_LOCATIONS: Location[] = [
  // North America
  { id: 'ny', name: 'New York', policeActivity: 0.5, products: {} },
  { id: 'la', name: 'Los Angeles', policeActivity: 0.4, products: {} },
  { id: 'miami', name: 'Miami', policeActivity: 0.3, products: {} },

  // Europe
  { id: 'amsterdam', name: 'Amsterdam', policeActivity: 0.2, products: {} },
  { id: 'berlin', name: 'Berlin', policeActivity: 0.3, products: {} },
  { id: 'marseille', name: 'Marseille', policeActivity: 0.4, products: {} },

  // Central America
  { id: 'panama', name: 'Panama City', policeActivity: 0.3, products: {} },
  { id: 'mexico', name: 'Mexico City', policeActivity: 0.6, products: {} },
  { id: 'havana', name: 'Havana', policeActivity: 0.2, products: {} },
  { id: 'kingston', name: 'Kingston', policeActivity: 0.3, products: {} },

  // Brazil
  { id: 'rio', name: 'Rio de Janeiro', policeActivity: 0.4, products: {} },
  { id: 'salvador', name: 'Salvador', policeActivity: 0.3, products: {} },
  { id: 'manaus', name: 'Manaus', policeActivity: 0.2, products: {} },
  { id: 'recife', name: 'Recife', policeActivity: 0.3, products: {} },
  { id: 'fortaleza', name: 'Fortaleza', policeActivity: 0.3, products: {} },
];

const INITIAL_PLAYER: Player = {
  health: 100,
  maxHealth: 100,
  money: 2000,
  level: 10,
  progress: 26550,
  rank: 'Rookie',
  inventory: {},
  currentLocation: 'Miami',
  maxInventorySpace: 100,
};


interface GameStore extends GameState {
  initializeGame: () => void;
  updatePrices: () => void;
  buyProduct: (productId: string, quantity: number) => void;
  sellProduct: (productId: string, quantity: number) => void;
  travel: (locationId: string) => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  player: INITIAL_PLAYER,
  locations: INITIAL_LOCATIONS,
  currentDate: new Date(),
  products: INITIAL_PRODUCTS,

  initializeGame: () => {
    const locations = INITIAL_LOCATIONS.map(location => ({
      ...location,
      products: Object.fromEntries(
        INITIAL_PRODUCTS.map(product => [
          product.id,
          {
            price: product.basePrice * (0.8 + Math.random() * 0.4),
            quantity: Math.floor(Math.random() * 100),
          },
        ]),
      ),
    }));

    set({ locations });
  },

  updatePrices: () => {
    const { locations } = get();
    const updatedLocations = locations.map(location => ({
      ...location,
      products: Object.fromEntries(
        Object.entries(location.products).map(([id, data]) => [
          id,
          {
            price: data.price * (0.9 + Math.random() * 0.2),
            quantity: Math.max(0, data.quantity + Math.floor(Math.random() * 20) - 10),
          },
        ]),
      ),
    }));

    set({ locations: updatedLocations });
  },

  buyProduct: (productId: string, quantity: number) => {
    const { player, locations } = get();
    const location = locations.find(l => l.id === player.currentLocation);
    if (!location) return;

    const product = location.products[productId];
    if (!product || product.quantity < quantity) return;

    const totalCost = product.price * quantity;
    if (player.money < totalCost) return;

    const productWeight = INITIAL_PRODUCTS.find(p => p.id === productId)?.weight || 0;
    const currentInventoryWeight = Object.entries(player.inventory).reduce(
      (acc, [id, qty]) => acc + (INITIAL_PRODUCTS.find(p => p.id === id)?.weight || 0) * qty,
      0
    );

    if (currentInventoryWeight + productWeight * quantity > player.maxInventorySpace) return;

    set(state => ({
      player: {
        ...state.player,
        money: state.player.money - totalCost,
        inventory: {
          ...state.player.inventory,
          [productId]: (state.player.inventory[productId] || 0) + quantity,
        },
      },
      locations: state.locations.map(l =>
        l.id === player.currentLocation
          ? {
            ...l,
            products: {
              ...l.products,
              [productId]: {
                ...l.products[productId],
                quantity: l.products[productId].quantity - quantity,
              },
            },
          }
          : l
      ),
    }));
  },

  sellProduct: (productId: string, quantity: number) => {
    const { player, locations } = get();
    const location = locations.find(l => l.id === player.currentLocation);
    if (!location) return;

    const inventoryQuantity = player.inventory[productId] || 0;
    if (inventoryQuantity < quantity) return;

    const product = location.products[productId];
    const totalEarnings = product.price * quantity;

    set(state => ({
      player: {
        ...state.player,
        money: state.player.money + totalEarnings,
        inventory: {
          ...state.player.inventory,
          [productId]: state.player.inventory[productId] - quantity,
        },
      },
    }));
  },

  travel: (locationId: string) => {
    set(state => ({
      player: {
        ...state.player,
        currentLocation: locationId,
      },
    }));
  },
}));