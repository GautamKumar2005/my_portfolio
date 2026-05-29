"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { useMemo } from "react";

interface Particle {
  position: [number, number, number];
  velocity: [number, number, number];
  life: number;
}

function ParticleSystem() {
  const pointsRef = useRef<THREE.Points>(null);
  const particlesRef = useRef<Particle[]>([]);
  const { mouse } = useThree();

  useEffect(() => {
    // Initialize particles
    const particles: Particle[] = [];
    for (let i = 0; i < 150; i++) {
      particles.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
        ],
        velocity: [
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1,
        ],
        life: Math.random(),
      });
    }
    particlesRef.current = particles;
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;

    const particles = particlesRef.current;
    const geometry = pointsRef.current.geometry as THREE.BufferGeometry;
    const positions = geometry.attributes.position.array as Float32Array;

    particles.forEach((particle, i) => {
      // Update position
      particle.position[0] += particle.velocity[0];
      particle.position[1] += particle.velocity[1];
      particle.position[2] += particle.velocity[2];

      // Mouse attraction
      const mouseInfluence = 0.5;
      particle.position[0] += mouse.x * mouseInfluence * 0.01;
      particle.position[1] -= mouse.y * mouseInfluence * 0.01;

      // Bounds
      if (Math.abs(particle.position[0]) > 15)
        particle.velocity[0] *= -1;
      if (Math.abs(particle.position[1]) > 15)
        particle.velocity[1] *= -1;
      if (Math.abs(particle.position[2]) > 15)
        particle.velocity[2] *= -1;

      positions[i * 3] = particle.position[0];
      positions[i * 3 + 1] = particle.position[1];
      positions[i * 3 + 2] = particle.position[2];
    });

    geometry.attributes.position.needsUpdate = true;
  });

  // Create position array
  const positionArray = new Float32Array(150 * 3);
  particlesRef.current.forEach((particle, i) => {
    positionArray[i * 3] = particle.position[0];
    positionArray[i * 3 + 1] = particle.position[1];
    positionArray[i * 3 + 2] = particle.position[2];
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={150}
          array={positionArray}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#00d4ff"
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </points>
  );
}

const codeSnippets = [
  "const x = 10;",
  "function run() {",
  "import React from 'react';",
  "int main() {",
  "std::cout << 'Hello';",
  "def train_model():",
  "import torch",
  "SELECT * FROM users",
  "git commit -m 'feat'",
  "npm run dev",
  "<div className='flex'>",
  "for(int i=0; i<n; i++)",
  "model.fit(X, y)",
  "class Model extends Component",
  "print('AI is awesome')",
  "pointer->next = NULL;",
  "await fetch('/api/data')",
  "docker build -t app .",
  "useEffect(() => {}, [])",
  "auto ptr = std::make_unique<T>();",
  "res.status(200).json({ success: true })",
  "console.log('Debugging...');"
];

interface CodeParticle {
  text: string;
  position: [number, number, number];
  velocity: number;
  scale: number;
  opacity: number;
}

function CodeFlow() {
  const groupRef = useRef<THREE.Group>(null);
  
  const particles = useMemo(() => {
    const temp: CodeParticle[] = [];
    for (let i = 0; i < 30; i++) {
      temp.push({
        text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
        position: [
          (Math.random() - 0.5) * 40, // x spread wider
          (Math.random() - 0.5) * 40, // y spread wider
          (Math.random() - 0.5) * 15 - 5, // z depth
        ],
        velocity: Math.random() * 0.02 + 0.01,
        scale: Math.random() * 0.4 + 0.3,
        opacity: Math.random() * 0.3 + 0.05,
      });
    }
    return temp;
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    
    groupRef.current.children.forEach((child: any, i) => {
      const p = particles[i];
      // Move upwards
      child.position.y += p.velocity;
      // Wrap around
      if (child.position.y > 20) {
        child.position.y = -20;
        child.position.x = (Math.random() - 0.5) * 40;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <Text
          key={i}
          position={p.position}
          fontSize={p.scale}
          color="#0ea5e9" // Tailwind sky-500
          fillOpacity={p.opacity}
          anchorX="center"
          anchorY="middle"
        >
          {p.text}
        </Text>
      ))}
    </group>
  );
}

export default function ParticleField() {
  return (
    <Canvas
      className="w-full h-full"
      camera={{ position: [0, 0, 15], fov: 75 }}
      style={{ background: "transparent" }}
    >
      <color attach="background" args={["#0a0e27"]} />
      <ParticleSystem />
      <CodeFlow />
    </Canvas>
  );
}
