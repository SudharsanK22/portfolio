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
      // Sophisticated Palette: Midnight Obsidian, Deep Indigo, Subtle Electric Blue
      vec3 colorDeep = vec3(0.02, 0.02, 0.05);  // Near black
      vec3 colorIndigo = vec3(0.05, 0.05, 0.15); // Deep indigo
      
      // Diagonal gradient background
      float gradMix = (vUv.y + vUv.x) * 0.5;
      vec3 bgColor = mix(colorDeep, colorIndigo, gradMix);

      // Create glowing contour lines based on noise distortion
      // We want many fine, overlapping ribbons.
      float lineVal1 = sin(vDistortion * 20.0 - uTime * 1.2);
      float lines1 = smoothstep(0.92, 0.96, lineVal1);
      
      float lineVal2 = sin((vDistortion + vUv.x * 0.1) * 25.0 + uTime * 0.8);
      float lines2 = smoothstep(0.95, 0.98, lineVal2);

      float lineVal3 = sin((vDistortion - vUv.y * 0.1) * 30.0 - uTime * 1.5);
      float lines3 = smoothstep(0.96, 0.99, lineVal3);

      vec3 lineColor = vec3(0.4, 0.6, 1.0); // Electric blue lines
      vec3 highlight = vec3(0.8, 0.9, 1.0); // white-blue core

      vec3 finalColor = bgColor;
      
      // Add fine ribbons
      finalColor += lineColor * lines1 * 0.3;
      finalColor += lineColor * lines2 * 0.3;
      finalColor += lineColor * lines3 * 0.3;
      
      // High-intensity core for lines
      finalColor += highlight * smoothstep(0.98, 1.0, lineVal1) * 0.4;
      
      // Add a broad, soft blue glow where distortion is high to mimic depth
      float broadGlow = smoothstep(0.3, 0.8, vDistortion);
      finalColor += vec3(0.2, 0.4, 0.8) * broadGlow * 0.15;

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
    <div className="w-full h-full bg-[#0B001A]">
      <Canvas camera={{ position: [0, 2, 10], fov: 45 }}>
        <color attach="background" args={['#0B001A']} />
        <ambientLight intensity={0.5} />
        <LuxuryMesh />
      </Canvas>
    </div>
  );
};

export default LuxuryBackground;
