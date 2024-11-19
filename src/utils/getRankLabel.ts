export interface RankInfo {
    label: string;
    bgColor: string;
    borderColor: string;
    textColor: string;
}

export function getRankInfo(level: number): RankInfo {
    if (level >= 1 && level <= 10) {
        return { label: 'Rookie', bgColor: 'bg-gray-500', borderColor: 'border-gray-500', textColor: 'text-gray-500' };
    } else if (level > 10 && level <= 20) {
        return { label: 'Novice', bgColor: 'bg-blue-500', borderColor: 'border-blue-500', textColor: 'text-blue-500' };
    } else if (level > 20 && level <= 30) {
        return { label: 'Intermediate', bgColor: 'bg-green-500', borderColor: 'border-green-500', textColor: 'text-green-500' };
    } else if (level > 30 && level <= 40) {
        return { label: 'Advanced', bgColor: 'bg-yellow-500', borderColor: 'border-yellow-500', textColor: 'text-yellow-500' };
    } else if (level > 40 && level <= 50) {
        return { label: 'Expert', bgColor: 'bg-orange-500', borderColor: 'border-orange-500', textColor: 'text-orange-500' };
    } else if (level > 50 && level <= 60) {
        return { label: 'Master', bgColor: 'bg-red-500', borderColor: 'border-red-500', textColor: 'text-red-500' };
    } else if (level > 60 && level <= 70) {
        return { label: 'Grandmaster', bgColor: 'bg-purple-500', borderColor: 'border-purple-500', textColor: 'text-purple-500' };
    } else if (level > 70 && level <= 80) {
        return { label: 'Legendary', bgColor: 'bg-yellow-300', borderColor: 'border-yellow-300', textColor: 'text-yellow-300' };
    } else if (level > 80 && level <= 90) {
        return { label: 'Epic', bgColor: 'bg-gray-300', borderColor: 'border-gray-300', textColor: 'text-gray-300' };
    } else if (level > 90 && level <= 100) {
        return { label: 'Mythic', bgColor: 'bg-yellow-700', borderColor: 'border-yellow-700', textColor: 'text-yellow-700' };
    } else if (level > 100 && level <= 110) {
        return { label: 'Immortal', bgColor: 'bg-black', borderColor: 'border-black', textColor: 'text-black' };
    } else if (level > 110 && level <= 120) {
        return { label: 'Transcendent', bgColor: 'bg-white', borderColor: 'border-white', textColor: 'text-white' };
    }
    return { label: 'Unknown', bgColor: 'bg-transparent', borderColor: 'border-transparent', textColor: 'text-transparent' };
} 