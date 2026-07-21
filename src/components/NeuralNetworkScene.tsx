"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

const CONNECT_DISTANCE = 2.4;

function generateNodePositions(count: number) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
  }
  return positions;
}

function buildConnections(positions: Float32Array, count: number) {
  const segments: [THREE.Vector3, THREE.Vector3][] = [];
  for (let i = 0; i < count; i++) {
    const a = new THREE.Vector3(
      positions[i * 3],
      positions[i * 3 + 1],
      positions[i * 3 + 2]
    );
    for (let j = i + 1; j < count; j++) {
      const b = new THREE.Vector3(
        positions[j * 3],
        positions[j * 3 + 1],
        positions[j * 3 + 2]
      );
      if (a.distanceTo(b) < CONNECT_DISTANCE) {
        segments.push([a, b]);
      }
    }
  }
  return segments;
}

function NodesAndLines({ count }: { count: number }) {
  const positions = useMemo(() => generateNodePositions(count), [count]);
  const lineSegments = useMemo(
    () => buildConnections(positions, count),
    [positions, count]
  );
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (document.hidden || !groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <group ref={groupRef}>
      <Points positions={positions} stride={3}>
        <PointMaterial
          transparent
          color="#00E5FF"
          size={0.06}
          sizeAttenuation
          depthWrite={false}
          opacity={0.9}
        />
      </Points>
      {lineSegments.map(([a, b], i) => (
        <Line
          key={i}
          points={[a, b]}
          color="#00E5FF"
          lineWidth={0.5}
          transparent
          opacity={0.15}
        />
      ))}
    </group>
  );
}

function CameraParallax() {
  const { camera } = useThree();
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 1.2;
      target.current.y = -(e.clientY / window.innerHeight - 0.5) * 0.8;
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useFrame(() => {
    if (document.hidden) return;
    camera.position.x += (target.current.x - camera.position.x) * 0.02;
    camera.position.y += (target.current.y - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function NeuralNetworkScene({
  nodeCount = 60,
}: {
  nodeCount?: number;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
      style={{ position: "absolute", inset: 0 }}
    >
      <ambientLight intensity={0.5} />
      <NodesAndLines count={nodeCount} />
      <CameraParallax />
    </Canvas>
  );
}
