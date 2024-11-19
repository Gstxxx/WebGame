import { CITIES } from '../data/cities';

export function calculateDaysToFlight(currentCityId: string | null, targetCityId: string): number {
    if (!currentCityId) return 0;

    const currentCity = CITIES.find(city => city.id === currentCityId);
    const targetCity = CITIES.find(city => city.id === targetCityId);

    if (!currentCity || !targetCity) return 0;

    const R = 6371;
    const dLat = (targetCity.lat - currentCity.lat) * (Math.PI / 180);
    const dLng = (targetCity.lng - currentCity.lng) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(currentCity.lat * (Math.PI / 180)) * Math.cos(targetCity.lat * (Math.PI / 180)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return Math.ceil(distance / 1000);
} 