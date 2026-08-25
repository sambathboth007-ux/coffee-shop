import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, OrbitControls, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { CoffeeCup } from './CoffeeCup'
import type { Drink } from '../data/menu'

function Bean({
  position,
  scale,
  speed,
}: {
  position: [number, number, number]
  scale: number
  speed: number
}) {
  const ref = useRef<THREE.Group>(null)
  useFrame((state) => {
    const t = state.clock.elapsedTime * speed
    if (!ref.current) return
    ref.current.rotation.x = t
    ref.current.rotation.y = t * 0.8
    ref.current.position.y = position[1] + Math.sin(t * 1.4) * 0.35
  })
  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh>
        <sphereGeometry args={[1, 24, 24]} />
        <meshStandardMaterial color="#4a2411" roughness={0.55} />
      </mesh>
      <mesh scale={[1.02, 0.14, 1.02]}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshStandardMaterial color="#251007" roughness={0.9} />
      </mesh>
    </group>
  )
}

function Beans() {
  const beans = useMemo(
    () =>
      Array.from({ length: 12 }, () => ({
        position: [
          (Math.random() - 0.5) * 11,
          (Math.random() - 0.5) * 6,
          -1 - Math.random() * 5,
        ] as [number, number, number],
        scale: 0.12 + Math.random() * 0.16,
        speed: 0.3 + Math.random() * 0.6,
      })),
    [],
  )
  return (
    <>
      {beans.map((b, i) => (
        <Bean key={i} {...b} />
      ))}
    </>
  )
}

export function Scene({
  drink,
  interactive = true,
}: {
  drink: Drink
  interactive?: boolean
}) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.8]}
      camera={{ position: [0, 3.1, 8 ], fov: 38 }}
      gl={{ antialias: true }}
    >
      <color attach="background" args={['#120b08']} />
      <fog attach="fog" args={['#120b08', 9, 20]} />
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[4, 6, 4]}
        intensity={2.1}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-4, 2, -3]} intensity={18} color={drink.accent} />
      <pointLight position={[3, -2, 3]} intensity={8} color="#ff9d4d" />
      <spotLight
        position={[0, 7, 3]}
        angle={0.6}
        penumbra={0.9}
        intensity={45}
        color="#fff1de"
        castShadow
      />
      <hemisphereLight args={['#ffd9a8', '#1a0e07', 0.7]} />
      <Suspense fallback={null}>
        <CoffeeCup drink={drink} />
        <Beans />
        <Sparkles
          count={60}
          scale={[10, 6, 6]}
          size={2.4}
          speed={0.3}
          opacity={0.5}
          color="#f0c48a"
        />
        <ContactShadows
          position={[0, -2.05, 0]}
          opacity={0.55}
          scale={12}
          blur={2.6}
          far={4}
        />
      </Suspense>
      {interactive && (
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 3.4}
          maxPolarAngle={Math.PI / 1.9}
        />
      )}
    </Canvas>
  )
}
