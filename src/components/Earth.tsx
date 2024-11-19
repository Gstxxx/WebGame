import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera, useGLTF, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useGameStore } from '../store/gameStore';
import { CITIES } from '../data/cities';
import CityMarker from './CityMarker';
import { CityHoverInfo } from '@/types/map';

type EarthProps = {
  onCityHover: React.Dispatch<React.SetStateAction<CityHoverInfo | null>>;
};

export const Earth: React.FC<EarthProps> = ({ onCityHover }) => {
  const earthRef = useRef<THREE.Group>(null);
  const moonRef = useRef<THREE.Group>(null);
  const sunRef = useRef<THREE.Group>(null);
  const lightRays = useRef<THREE.Group>(null);
  const { travel, player } = useGameStore();
  const { scene } = useGLTF('/earth.glb');
  const { scene: moonScene } = useGLTF('/moon.glb');
  const { scene: sunScene } = useGLTF('/sun.glb');
  let moonAngle = 0;
  let earthOrbitAngle = 0;
  let sunOrbitAngle = 0;
  const latitudeLinesRef = useRef<THREE.Group>(null);

  const starPositions = new Float32Array(300);
  for (let i = 0; i < starPositions.length; i++) {
    starPositions[i] = (Math.random() - 0.5) * 100;
  }

  const handleCityHover = (info: CityHoverInfo | null) => {
    onCityHover(info);
  };

  const directionalLightRef = useRef<THREE.DirectionalLight>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (moonRef.current) {
      moonAngle += 0.005;
      const moonRadius = 100;
      const moonX = moonRadius * Math.cos(moonAngle);
      const moonZ = moonRadius * Math.sin(moonAngle);
      moonRef.current.position.set(moonX, 0, moonZ);
    }

    if (earthRef.current) {
      if (!player.currentLocation) {
        earthOrbitAngle += 0.001;
        const earthOrbitRadius = 200;
        const earthX = earthOrbitRadius * Math.cos(earthOrbitAngle);
        const earthZ = earthOrbitRadius * Math.sin(earthOrbitAngle);
        earthRef.current.position.set(earthX, 0, earthZ);
      }
      earthRef.current.rotation.y += 0.001;
    }

    if (sunRef.current) {
      sunOrbitAngle += 0.001;
      const sunOrbitRadius = 300;
      const sunX = sunOrbitRadius * Math.cos(sunOrbitAngle);
      const sunZ = sunOrbitRadius * Math.sin(sunOrbitAngle);
      sunRef.current.position.set(sunX, 0, sunZ);
      sunRef.current.rotation.y += 0.001;

      if (directionalLightRef.current) {
        directionalLightRef.current.position.set(sunX, 0, sunZ);
      }
    }

    if (sunRef.current && lightRays.current) {
      const sunPosition = new THREE.Vector3();
      sunRef.current.getWorldPosition(sunPosition);

      lightRays.current.children.forEach((ray, index) => {
        ray.position.copy(sunPosition);
        ray.rotation.y += 0.01 * (index + 1);
      });
    }

    if (latitudeLinesRef.current) {
      latitudeLinesRef.current.rotation.y += 0.001;
    }

    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.0005;
    }
  });

  const handleCityClick = (cityId: string) => {
    travel(cityId);
  };

  return (
    <group ref={earthRef}>
      <PerspectiveCamera makeDefault position={[0, 0, 18]} />
      <OrbitControls maxDistance={100} />
      <primitive ref={sunRef} object={sunScene} position={[200, 0, 0]} scale={[10, 10, 10]} />
      <directionalLight
        ref={directionalLightRef}
        intensity={3}
        castShadow
      />
      <primitive ref={moonRef} object={moonScene} scale={[0.02, 0.02, 0.02]} />
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={starPositions.length / 3}
            array={starPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color="white" size={0.5} />
      </points>
      <mesh>
        <primitive object={scene} scale={[30, 30, 30]} />
        <sphereGeometry args={[5.8, 60, 60]} />
        <meshBasicMaterial color="white" transparent opacity={0.1} />

        <mesh ref={cloudsRef}>
          <sphereGeometry args={[6, 60, 60]} />
          <meshBasicMaterial
            map={new THREE.TextureLoader().load('/clouds.png')}
            transparent
            opacity={0.3}
          />
        </mesh>
      </mesh>
      {CITIES.map((city) => (
        <CityMarker
          key={city.id}
          city={{ ...city, policeActivity: city.policeActivity.toString() }}
          player={player}
          handleCityClick={handleCityClick}
          handleCityHover={handleCityHover}
        />
      ))}
      <group ref={lightRays}>
        {[...Array(5)].map((_, i) => (
          <mesh key={i}>
            <cylinderGeometry args={[0.1, 0.1, 50, 32]} />
            <meshBasicMaterial color="yellow" transparent opacity={1} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

useGLTF.preload('/earth.glb');
useGLTF.preload('/moon.glb');
useGLTF.preload('/sun.glb');