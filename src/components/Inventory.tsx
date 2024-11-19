import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Package } from 'lucide-react';

export const Inventory: React.FC = () => {
  const { player, products } = useGameStore();

  const inventoryWeight = Object.entries(player.inventory).reduce(
    (acc, [id, quantity]) => {
      const product = products.find(p => p.id === id);
      return acc + (product?.weight || 0) * quantity;
    },
    0
  );

  return (
    <div className="text-white p-4 rounded-lg">
      <div className="p-4 rounded-lg">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-400">Inventory</h2>
          <div className="text-gray-400">
            {inventoryWeight.toFixed(1)} / {player.maxInventorySpace} kg
          </div>
        </div>

        <div className="grid gap-3">
          {Object.entries(player.inventory).map(([id, quantity]) => {
            if (quantity === 0) return null;
            const product = products.find(p => p.id === id);
            if (!product) return null;

            return (
              <div
                key={id}
                className="bg-gray-800 p-3 rounded-lg flex items-center justify-between"
              >
                <div className="flex items-center">
                  <Package className="w-5 h-5 text-blue-400 mr-2" />
                  <div>
                    <div className="text-white">{product.name}</div>
                    <div className="text-sm text-gray-400">
                      {quantity} units ({(product.weight * quantity).toFixed(1)} kg)
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};