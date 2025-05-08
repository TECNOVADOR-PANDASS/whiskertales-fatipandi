import { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { KeyboardControls, useKeyboardControls } from '@react-three/drei';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Define controls enum for keyboard mapping
enum Controls {
  forward = 'forward',
  back = 'back',
  left = 'left',
  right = 'right',
  jump = 'jump',
}

// Basic player character
function PlayerCharacter({ animal }: { animal: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [position, setPosition] = useState({ x: 0, y: 0.5, z: 0 });
  
  // Get current keyboard state without causing re-renders
  const [, getKeys] = useKeyboardControls<Controls>();
  
  // Animation frame logic
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    const { forward, back, left, right, jump } = getKeys();
    
    // Handle movement
    const moveSpeed = 5 * delta;
    let moved = false;
    
    if (forward) {
      setPosition(prev => ({ ...prev, z: prev.z - moveSpeed }));
      moved = true;
    }
    if (back) {
      setPosition(prev => ({ ...prev, z: prev.z + moveSpeed }));
      moved = true;
    }
    if (left) {
      setPosition(prev => ({ ...prev, x: prev.x - moveSpeed }));
      moved = true;
    }
    if (right) {
      setPosition(prev => ({ ...prev, x: prev.x + moveSpeed }));
      moved = true;
    }
    
    if (jump && position.y <= 0.5) {
      setPosition(prev => ({ ...prev, y: 2 }));
    }
    
    // Simple gravity
    if (position.y > 0.5) {
      setPosition(prev => ({ ...prev, y: Math.max(0.5, prev.y - 0.1) }));
    }
    
    // Update mesh position
    meshRef.current.position.set(position.x, position.y, position.z);
    
    // Log position for debugging
    if (moved) {
      console.log(`Position: x=${position.x.toFixed(2)}, y=${position.y.toFixed(2)}, z=${position.z.toFixed(2)}`);
    }
  });
  
  // Choose color based on animal
  const getAnimalColor = () => {
    switch(animal.toLowerCase()) {
      case 'rabbit': return '#A89F91'; // Light brown
      case 'fox': return '#D2691E'; // Fox orange
      case 'bear': return '#8B4513'; // Brown
      case 'owl': return '#D2B48C'; // Tan
      case 'lion': return '#DAA520'; // Golden
      case 'elephant': return '#A9A9A9'; // Gray
      case 'turtle': return '#228B22'; // Forest green
      case 'penguin': return '#000000'; // Black
      default: return '#4169E1'; // Royal blue as default
    }
  };
  
  return (
    <mesh ref={meshRef} position={[position.x, position.y, position.z]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={getAnimalColor()} />
    </mesh>
  );
}

// Simple terrain
function Terrain() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#7CFC00" />
    </mesh>
  );
}

// Main game scene
function GameScene({ animal }: { animal: string }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Terrain />
      <PlayerCharacter animal={animal} />
      <OrbitControls />
      <PerspectiveCamera makeDefault position={[0, 5, 10]} />
    </>
  );
}

// Main component with keyboard controls
export default function Game3D({ animal = 'default' }: { animal?: string }) {
  // Define key mappings
  const keyMap = [
    { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
    { name: Controls.back, keys: ['ArrowDown', 'KeyS'] },
    { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
    { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
    { name: Controls.jump, keys: ['Space'] },
  ];
  
  return (
    <div className="w-full h-[400px] bg-black rounded-lg overflow-hidden">
      <KeyboardControls map={keyMap}>
        <Canvas>
          <GameScene animal={animal} />
        </Canvas>
      </KeyboardControls>
    </div>
  );
}