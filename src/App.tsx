import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGameStore } from './store/gameStore';
import { PlayerInfo } from './components/PlayerInfo';
import { LocationsList } from './components/LocationsList';
import { Marketplace } from './components/Marketplace';
import { Inventory } from './components/Inventory';
import { Earth } from './components/Earth';
import { CityHoverInfo } from '@/types/map';
import { SirenIcon, MapPin, DollarSign, Calendar } from 'lucide-react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { MarketPriceChart } from './components/MarketPriceChart';
import { getCityInfo } from '@/data/cities';

function App() {
  const { initializeGame, updatePrices, player } = useGameStore();
  const [hoverInfo, setHoverInfo] = useState<CityHoverInfo | null>(null);

  useEffect(() => {
    initializeGame();
    const interval = setInterval(updatePrices, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen text-white relative">
      <aside className={`w-250 bg-white shadow-md block`}>
        <PlayerInfo />
        <Inventory />
      </aside>

      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4 relative">
              <div className="grid grid-cols-1 items-center bg-white shadow-md rounded-lg p-4">
                <div className="h-[400px] rounded-lg overflow-hidden relative bg-black">
                  <Canvas shadows>
                    <Earth onCityHover={setHoverInfo} />
                  </Canvas>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <a className="absolute top-0 left-0 m-2 px-4 py-2 bg-gray-700 text-white rounded">
                        <MapPin className="w-5 h-5" />
                      </a>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-[500px] bg-gray-800 p-4 rounded-md">
                      <LocationsList />
                    </HoverCardContent>
                  </HoverCard>
                </div>

                <div className="grid grid-cols-1 items-center bg-white shadow-md rounded-lg p-4 mt-2">
                  <p>
                    <MapPin className="text-gray-400 inline-block mr-2" />
                    <span className="text-gray-400">
                      {hoverInfo
                        ? `${getCityInfo(player.currentLocation)?.name} ➔ ${hoverInfo.cityName}`
                        : `Current location: ${getCityInfo(player.currentLocation)?.name}`}
                    </span>
                  </p>
                  <p>
                    {hoverInfo
                      ? <DollarSign className="text-gray-400 inline-block mr-2" /> : ``}
                    <span className="text-gray-400">
                      {hoverInfo
                        ? `Flight price: $${hoverInfo?.flightPrice}`
                        : ``}
                    </span>
                  </p>
                  <p>
                    {hoverInfo
                      ? <Calendar className="text-gray-400 inline-block mr-2" /> : ``}
                    <span className="text-gray-400">
                      {hoverInfo
                        ? `Flight hours: ${hoverInfo.daysToFlight}`
                        : ``}
                    </span>
                  </p>
                  <p>
                    {Array.from(
                      { length: hoverInfo ? hoverInfo.starRating ?? 0 : getCityInfo(player.currentLocation)?.policeActivity ?? 0 },
                      (_, i) => (
                        <SirenIcon
                          key={i}
                          className="text-gray-400 inline-block color-fade"
                        />
                      )
                    )}
                    {Array.from(
                      { length: hoverInfo ? 5 - hoverInfo.starRating : 5 - (getCityInfo(player.currentLocation)?.policeActivity ?? 0) },
                      (_, i) => (
                        <SirenIcon
                          key={i}
                          className="text-gray-400 inline-block text-white-500"
                        />
                      )
                    )}
                  </p>
                </div>
              </div>
            </div>


            <div className="space-y-4">
              <Marketplace />
            </div>
          </div>
        </div>
      </main>
      <style>{`
        @keyframes colorFade {
          0%, 100% {
            color: red;
          }
          50% {
            color: blue;
          }
        }
        .color-fade {
          animation: colorFade 2s infinite;
        }
      `}</style>
    </div>
  );
}

export default App;