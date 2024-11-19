import React from 'react';
import { DollarSign, TrendingDown, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductCardProps {
    name: string;
    id: string;
    price: number;
    change: number;
    apy: number;
    amount: number;
    owned: number;
    onBuy?: () => void;
    onSell?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
    name,
    id,
    price,
    change,
    apy,
    amount,
    owned,
    onBuy,
    onSell,
}) => {
    const isPositive = change >= 0;

    // Function to get product image URL
    const getProductImageUrl = (productName: string) => {
        return `/${productName.toLowerCase().replace(/\s+/g, '-')}.png`;
    };

    return (
        <div className="grid grid-cols-1 items-center bg-white shadow-md rounded-lg p-4  backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        <img
                            src={getProductImageUrl(name)}
                            alt={name}
                            className="w-16 h-16"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://example.com/product-icons/generic.png';
                            }}
                        />
                    </div>
                    <div>
                        <h3 className="text-base font-medium text-gray-200">{name}</h3>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                            <span>Available: {amount}</span>
                            <span>•</span>
                            <span>Owned: {owned}</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-green-400" />
                        <span className="text-base font-medium text-gray-200">
                            {price.toLocaleString()}
                        </span>
                    </div>
                    <span
                        className={cn(
                            'text-xs font-medium flex items-center gap-1',
                            isPositive ? 'text-green-400' : 'text-red-400'
                        )}
                    >
                        {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {Math.abs(change)}%
                    </span>
                </div>
            </div>

            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-400">APY</span>
                    <span className="text-sm font-medium text-green-400">{apy}%</span>
                </div>
                <div className="w-full h-[60px] relative">
                    <svg className="w-full h-full" viewBox="0 0 280 60">
                        <path
                            d="M0 50 C70 50, 140 10, 280 40"
                            fill="none"
                            stroke="rgb(74, 222, 128)"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={onBuy}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-lg py-2 text-sm font-medium transition-colors"
                >
                    Buy
                </button>
                <button
                    onClick={onSell}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white rounded-lg py-2 text-sm font-medium transition-colors"
                >
                    Sell
                </button>
            </div>
        </div>
    );
};
