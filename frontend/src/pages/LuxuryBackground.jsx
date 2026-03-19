import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const LuxuryMesh = () => {
  const meshRef = useRef();

  // Custom vertex shader for undulating movement
  const vertexShader = `
    varying vec2 vUv;
    varying float vDistortion;
    uniform float uTime;

    // Simple noise function
    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }
    
    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      float a = hash(i);
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));
      return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
    }

    void main() {
      vUv = uv;
      
      // Calculate smooth noise-based distortion
      float distortion = noise(uv * 3.0 + uTime * 0.2) * 0.5;
      distortion += noise(uv * 5.0 - uTime * 0.1) * 0.2;
      vDistortion = distortion;

      vec3 pos = position;
      pos.z += distortion * 1.5; // Undulate depth

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  // Custom fragment shader for premium colors
  const fragmentShader = `
    varying vec2 vUv;
    varying float vDistortion;
    uniform float uTime;

    void main() {
      // Luxury palette: Deep midnight, Violet, Soft Navy
      vec3 color1 = vec3(0.007, 0.007, 0.015); // Midnight Base
      vec3 color2 = vec3(0.05, 0.02, 0.1);     // Deep Violet
      vec3 color3 = vec3(0.02, 0.04, 0.08);    // Soft Navy
      vec3 goldAccent = vec3(0.1, 0.08, 0.05); // Subtle Champagne Gold

      // Blend based on UV and distortion
      vec3 finalColor = color1;
      finalColor = mix(finalColor, color2, vUv.x * (0.5 + 0.5 * sin(uTime * 0.1)));
      finalColor = mix(finalColor, color3, vUv.y * (0.5 + 0.5 * cos(uTime * 0.15)));
      
      // Add highlights on peaks
      float highlight = smoothstep(0.3, 0.8, vDistortion);
      finalColor = mix(finalColor, color2 * 1.5, highlight * 0.5);
      
      // Add a touch of gold to the edges
      float edge = smoothstep(0.0, 1.0, vUv.x) * smoothstep(1.0, 0.0, vUv.x);
      finalColor += goldAccent * (1.0 - edge) * 0.1;

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `;

  const uniforms = useMemo(() => ({
    uTime: { value: 0 }
  }), []);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    meshRef.current.material.uniforms.uTime.value = elapsed;
    
    // Subtle rotation
    meshRef.current.rotation.z = Math.sin(elapsed * 0.05) * 0.1;
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry args={[20, 20, 128, 128]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        wireframe={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

const LuxuryBackground = () => {
  return (
    <div className="w-full h-full bg-[#020205]">
      <Canvas camera={{ position: [0, 2, 10], fov: 45 }}>
        <color attach="background" args={['#020205']} />
        <ambientLight intensity={0.5} />
        <LuxuryMesh />
      </Canvas>
    </div>
  );
};

export default LuxuryBackground;
