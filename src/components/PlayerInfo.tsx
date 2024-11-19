import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Heart, Wallet, Crown } from 'lucide-react';
import { Badge } from "@/components/ui/badge"
import { rankThresholds } from '@/utils/calculateRank';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getRankInfo } from '@/utils/getRankLabel';

const PlayerHealth: React.FC<{ health: number, maxHealth: number }> = ({ health, maxHealth }) => (
  <div className="grid grid-cols-1 items-center bg-white shadow-md rounded-lg p-4">
    <div className="flex flex-row">
      <Heart className="w-5 h-5 text-red-500 mr-2 mt-1" />
      <h2 className="text-gray-400 text-bold text-xl">Health</h2>
    </div>
    <span className="text-gray-400">{health} / {maxHealth} ({(health / maxHealth) * 100}%)</span>
  </div>
);

const PlayerMoney: React.FC<{ money: number }> = ({ money }) => {
  const formattedMoney = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(money);

  return (
    <div className="grid grid-cols-1 items-center bg-white shadow-md rounded-lg p-4">
      <div className="flex flex-row">
        <Wallet className="w-5 h-5 text-green-500 mr-2 mt-1" />
        <h2 className="text-gray-400 text-bold text-xl">Money</h2>
      </div>
      <span className="text-gray-400">{formattedMoney}</span>
    </div>
  );
};

const PlayerRank: React.FC<{ level: number }> = ({ level }) => {
  const rankLabel = getRankInfo(level);

  return (
    <div className="flex items-center mb-1">
      <Badge variant="outline" className={`${rankLabel.borderColor} ${rankLabel.textColor} text-bold`}>
        <Crown className={`w-5 h-5 ${rankLabel.textColor} mr-2`} />
        <span className={`${rankLabel.textColor}`}>
          {rankLabel.label}
        </span>
      </Badge>
    </div>
  );
};
const PlayerLevelBar: React.FC<{ level: number; progress: number }> = ({ level, progress }) => {
  const currentXP = rankThresholds[level - 1];
  const nextLevelXP = rankThresholds[level];
  const progressPercentage = ((progress - currentXP) / (nextLevelXP - currentXP)) * 100;

  const [progressValue, setProgressValue] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgressValue(progressPercentage), 500);
    return () => clearTimeout(timer);
  }, [progressPercentage]);

  return (
    <div className="grid grid-cols-1 items-center my-2 bg-white shadow-md rounded-lg p-4 px-10">
      <span className="text-bold text-gray-400">Level {level}</span>
      <div className="flex items-center">
        <span className="text-sm text-gray-400 mr-2">{currentXP} XP / {nextLevelXP} XP</span>
        <div className="w-[150px] h-2.5 bg-gray-300 rounded-full relative">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  style={{ width: `${progressValue}%` }}
                  className="h-full bg-blue-500 rounded-full"
                ></div>
              </TooltipTrigger>
              <TooltipContent side="right" align="center" className="bg-black text-white p-1 rounded">
                <p>{progressValue.toFixed(2)}%</p>
                <p>{progress - currentXP} / {nextLevelXP - currentXP}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export const PlayerInfo: React.FC = () => {
  const { player } = useGameStore();

  return (
    <div className="bg-gray-50 text-white p-4 flex justify-between items-center px-2">
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <div className="grid grid-cols-1 items-center bg-white shadow-md rounded-lg p-4">
              <img src="/player.png" alt="Player" className="w-32 h-32 mb-4 rounded-xl mr-4" />
              <PlayerRank level={player.level} />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2">
            <PlayerHealth health={player.health} maxHealth={player.maxHealth} />
            <PlayerMoney money={player.money} />
          </div>
        </div>
        <PlayerLevelBar level={player.level} progress={player.progress} />
      </div>
    </div>
  );
};