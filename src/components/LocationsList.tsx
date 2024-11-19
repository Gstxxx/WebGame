import React from 'react';
import { useGameStore } from '../store/gameStore';
import { MapPin } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export const LocationsList: React.FC = () => {
  const { locations, player, travel } = useGameStore();

  return (
    <div className="bg-gray-900 p-4 rounded-lg">
      <h2 className="text-xl font-bold text-white mb-4">Locations</h2>
      <div className="grid grid-cols-1 gap-3">

        <ScrollArea className="h-[500px] px-4">
          {locations.map((location) => (
            <button
              key={location.id}
              onClick={() => travel(location.id)}
              className={`
              flex items-center justify-between p-3 rounded-lg w-full my-2
              ${location.id === player.currentLocation
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }
            `}
            >
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{location.name}</span>
              </div>
              <div className="text-sm">
                Police: {Math.round(location.policeActivity * 100)}%

              </div>
            </button>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
};