export const CITIES = [
    { id: 'ny', name: 'New York', lat: 40.7128, lng: -74.0060, flightPrice: 500, policeActivity: 1 },
    { id: 'la', name: 'Los Angeles', lat: 34.0522, lng: -118.2437, flightPrice: 450, policeActivity: 3 },
    { id: 'miami', name: 'Miami', lat: 25.7617, lng: -80.1918, flightPrice: 300, policeActivity: 1 },
    { id: 'chicago', name: 'Chicago', lat: 41.8781, lng: -87.6298, flightPrice: 250, policeActivity: 3 },
    { id: 'toronto', name: 'Toronto', lat: 43.651070, lng: -79.347015, flightPrice: 400, policeActivity: 1 },
    { id: 'amsterdam', name: 'Amsterdam', lat: 52.3676, lng: 4.9041, flightPrice: 350, policeActivity: 1 },
    { id: 'berlin', name: 'Berlin', lat: 52.5200, lng: 13.4050, flightPrice: 300, policeActivity: 3 },
    { id: 'marseille', name: 'Marseille', lat: 43.2965, lng: 5.3698, flightPrice: 250, policeActivity: 1 },
    { id: 'london', name: 'London', lat: 51.5074, lng: -0.1278, flightPrice: 300, policeActivity: 3 },
    { id: 'paris', name: 'Paris', lat: 48.8566, lng: 2.3522, flightPrice: 350, policeActivity: 1 },
    { id: 'panama', name: 'Panama City', lat: 8.9824, lng: -79.5199, flightPrice: 200, policeActivity: 1 },
    { id: 'mexico', name: 'Mexico City', lat: 19.4326, lng: -99.1332, flightPrice: 250, policeActivity: 3 },
    { id: 'havana', name: 'Havana', lat: 23.1136, lng: -82.3666, flightPrice: 150, policeActivity: 1 },
    { id: 'kingston', name: 'Kingston', lat: 18.0179, lng: -76.8099, flightPrice: 100, policeActivity: 1 },
    { id: 'rio', name: 'Rio de Janeiro', lat: -22.9068, lng: -43.1729, flightPrice: 200, policeActivity: 5 },
    { id: 'salvador', name: 'Salvador', lat: -12.9714, lng: -38.5014, flightPrice: 150, policeActivity: 3 },
    { id: 'manaus', name: 'Manaus', lat: -3.1190, lng: -60.0217, flightPrice: 100, policeActivity: 1 },
    { id: 'recife', name: 'Recife', lat: -8.0476, lng: -34.8770, flightPrice: 150, policeActivity: 3 },
    { id: 'fortaleza', name: 'Fortaleza', lat: -3.7319, lng: -38.5267, flightPrice: 100, policeActivity: 1 },
    { id: 'tokyo', name: 'Tokyo', lat: 35.6895, lng: 139.6917, flightPrice: 300, policeActivity: 1 },
    { id: 'beijing', name: 'Beijing', lat: 39.9042, lng: 116.4074, flightPrice: 250, policeActivity: 3 },
    { id: 'delhi', name: 'Delhi', lat: 28.6139, lng: 77.2090, flightPrice: 200, policeActivity: 1 },
    { id: 'bangkok', name: 'Bangkok', lat: 13.7563, lng: 100.5018, flightPrice: 250, policeActivity: 3 },
    { id: 'cairo', name: 'Cairo', lat: 30.0444, lng: 31.2357, flightPrice: 200, policeActivity: 1 },
    { id: 'lagos', name: 'Lagos', lat: 6.5244, lng: 3.3792, flightPrice: 150, policeActivity: 3 },
    { id: 'johannesburg', name: 'Johannesburg', lat: -26.2041, lng: 28.0473, flightPrice: 100, policeActivity: 1 },
    { id: 'brasilia', name: 'Brasília', lat: -15.8267, lng: -47.9218, flightPrice: 400, policeActivity: 3 },
    { id: 'canberra', name: 'Canberra', lat: -35.2809, lng: 149.1300, flightPrice: 500, policeActivity: 1 },
    { id: 'ottawa', name: 'Ottawa', lat: 45.4215, lng: -75.6972, flightPrice: 450, policeActivity: 1 },
    { id: 'moscow', name: 'Moscow', lat: 55.7558, lng: 37.6173, flightPrice: 550, policeActivity: 3 },
    { id: 'newdelhi', name: 'New Delhi', lat: 28.6139, lng: 77.2090, flightPrice: 300, policeActivity: 3 },
];
export interface CityInfo {
    id: string;
    name: string;
    lat: number;
    lng: number;
    flightPrice: number;
    policeActivity: number;
    starRating: number;
}
export function getCityInfo(cityId: string): CityInfo | null {
    const city = CITIES.find(city => city.id === cityId);
    if (city) {
        return {
            ...city,
            starRating: Number(city.policeActivity)
        };
    }
    return null;
} 