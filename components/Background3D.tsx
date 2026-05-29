"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Text, Float } from "@react-three/drei";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm";

function ParticleSwarm(props: any) {
  const ref = useRef<any>();
  // Generate random positions in a sphere
  const sphere = useMemo(() => {
    const data = new Float32Array(5000 * 3);
    random.inSphere(data, { radius: 1.5 });
    return data;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#06b6d4"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

const PROGRAMMING_TEXTS = [
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
  "console.log('Debugging...');",
  "def predict(model, img):",
  "CREATE TABLE IF NOT EXISTS",
  "git push origin main"
];

function CodeFlow() {
  const groupRef = useRef<any>(null);
  
  // Generate random positions and velocities for the text
  const items = useMemo(() => {
    return Array.from({ length: 40 }).map(() => ({
      text: PROGRAMMING_TEXTS[Math.floor(Math.random() * PROGRAMMING_TEXTS.length)],
      position: [
        (Math.random() - 0.5) * 6, // x spread
        (Math.random() - 0.5) * 8, // y spread
        (Math.random() - 0.5) * 3 - 1.5, // z depth
      ] as [number, number, number],
      scale: Math.random() * 0.08 + 0.04,
      velocity: Math.random() * 0.002 + 0.001, // falling down or floating up speed
      opacity: Math.random() * 0.4 + 0.1,
    }));
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child: any, i: number) => {
        // Move the text upwards continuously
        child.position.y += items[i].velocity;
        
        // Wrap around when it goes too high out of camera view
        if (child.position.y > 4) {
          child.position.y = -4;
          child.position.x = (Math.random() - 0.5) * 6;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {items.map((item, index) => (
        <Text
          key={index}
          position={item.position}
          fontSize={item.scale}
          color="#0ea5e9"
          fillOpacity={item.opacity}
          anchorX="center"
          anchorY="middle"
        >
          {item.text}
        </Text>
      ))}
    </group>
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ParticleSwarm />
        <CodeFlow />
      </Canvas>
    </div>
  );
}
