import React from 'react';
import { useGameStore } from '../store/gameStore';
import { ProductCard } from './ProductCard';

export const Marketplace: React.FC = () => {
  const { locations, player, products, buyProduct, sellProduct } = useGameStore();
  const currentLocation = locations.find(l => l.id === player.currentLocation);

  if (!currentLocation) return null;

  return (
    <div className="grid grid-cols-1 items-center bg-white shadow-md rounded-lg p-4  backdrop-blur-sm">
      <h2 className="text-xl font-bold text-black mb-4">Marketplace</h2>
      <div className="grid grid-cols-2 gap-2">
        {products.map((product) => {
          const locationProduct = currentLocation.products[product.id] || { price: 0, quantity: 0 };

          return (
            <ProductCard
              key={product.id}
              name={product.name}
              id={product.id}
              price={locationProduct.price}
              amount={locationProduct.quantity}
              owned={player.inventory[product.id] || 0}
              change={0}
              apy={0}
              onBuy={() => buyProduct(product.id, 1)}
              onSell={() => sellProduct(product.id, 1)}
            />
          );
        })}
      </div>
    </div>
  );
};