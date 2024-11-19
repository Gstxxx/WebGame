import React, { useState } from 'react';
import { latLngToVector3 } from '../utils/latLngToVector3';
import { calculateDaysToFlight } from '../utils/calculateDaysToFlight';
import { Text, Billboard } from '@react-three/drei';
import { CityHoverInfo } from '@/types/map';

interface CityMarkerProps {
    city: {
        id: string;
        name: string;
        lat: number;
        lng: number;
        flightPrice: number;
        policeActivity: string;
    };
    player: {
        currentLocation: string | null;
    };
    handleCityClick: (cityId: string) => void;
    handleCityHover: (info: CityHoverInfo | null) => void;
}



const CityMarker: React.FC<CityMarkerProps & { handleCityHover: (info: CityHoverInfo) => void }> = ({ city, player, handleCityClick, handleCityHover }) => {
    const position = latLngToVector3(city.lat, city.lng, 6.5);
    const isCurrentCity = city.id === player.currentLocation;
    const daysToFlight = calculateDaysToFlight(player.currentLocation, city.id);



    return (
        <group position={position}>
            <mesh
                onClick={() => handleCityClick(city.id)}
                onPointerOver={(e) => {
                    document.body.style.cursor = 'pointer';
                    e.stopPropagation();
                    handleCityHover({
                        currentLocation: player.currentLocation,
                        cityName: city.name,
                        flightPrice: city.flightPrice.toFixed(2),
                        daysToFlight,
                        starRating: Number(city.policeActivity),
                    });
                }}
                onPointerOut={(e) => {
                    document.body.style.cursor = 'default';
                    e.stopPropagation();
                    handleCityHover(null);
                }}
            >
                <sphereGeometry args={[0.05, 16, 16]} />
                <meshStandardMaterial
                    color={isCurrentCity ? '#22c55e' : '#ef4444'}
                    emissive={isCurrentCity ? '#22c55e' : '#ef4444'}
                    emissiveIntensity={0.5}
                />
            </mesh>
            <Billboard>
                <Text
                    position={[0.1, 0.0, 0]}
                    fontSize={0.3}
                    color="yellow"
                    anchorX="left"
                    strokeColor="black"
                    strokeWidth={0.005}
                    textAlign="left"
                >
                    {city.name}
                </Text>
            </Billboard>
        </group>
    );
};

export default CityMarker;