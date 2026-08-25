import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import type { Drink } from '../data/menu'

function Steam({ color = '#ffffff' }: { color?: string }) {
  const group = useRef<THREE.Group>(null)
  const puffs = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        offset: i / 10,
        x: (Math.random() - 0.5) * 0.5,
        z: (Math.random() - 0.5) * 0.5,
        scale: 0.1 + Math.random() * 0.14,
        speed: 0.24 + Math.random() * 0.18,
        sway: 0.2 + Math.random() * 0.35,
      })),
    [],
  )

  useFrame((state) => {
    const t = state.clock.elapsedTime
    group.current?.children.forEach((child, i) => {
      const p = puffs[i]
      const life = (p.offset + t * p.speed) % 1
      child.position.y = 2 + life * 1.9
      child.position.x = p.x + Math.sin(t * 0.9 + i) * p.sway * life
      child.position.z = p.z + Math.cos(t * 0.7 + i) * p.sway * life
      const s = p.scale * (0.4 + life * 1.8)
      child.scale.setScalar(s)
      const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial
      mat.opacity = Math.sin(life * Math.PI) * 0.055
    })
  })

  return (
    <group ref={group}>
      {puffs.map((_, i) => (
        <mesh key={i}>
          <sphereGeometry args={[1, 12, 12]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  )
}

function IceCubes({ count = 5 }: { count?: number }) {
  const cubes = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        pos: [
          (Math.random() - 0.5) * 0.85,
          0.25 + Math.random() * 0.7,
          (Math.random() - 0.5) * 0.85,
        ] as [number, number, number],
        rot: [Math.random() * 3, Math.random() * 3, Math.random() * 3] as [
          number,
          number,
          number,
        ],
        s: 0.2 + Math.random() * 0.12,
      })),
    [count],
  )
  const group = useRef<THREE.Group>(null)
  useFrame((state) => {
    const t = state.clock.elapsedTime
    group.current?.children.forEach((c, i) => {
      c.rotation.y = cubes[i].rot[1] + t * 0.25
      c.position.y = cubes[i].pos[1] + Math.sin(t * 0.9 + i) * 0.03
    })
  })
  return (
    <group ref={group}>
      {cubes.map((c, i) => (
        <mesh key={i} position={c.pos} rotation={c.rot} scale={c.s}>
          <boxGeometry args={[1, 1, 1]} />
          <meshPhysicalMaterial
            color="#dff3ff"
            roughness={0.05}
            transmission={0.92}
            thickness={0.6}
            ior={1.31}
            transparent
            opacity={0.75}
          />
        </mesh>
      ))}
    </group>
  )
}

function Liquid({ drink }: { drink: Drink }) {
  const total = drink.layers.reduce((s, l) => s + l.height, 0)
  const fill = 1.55
  let y = 0.12
  return (
    <group>
      {drink.layers.map((layer, i) => {
        const h = (layer.height / total) * fill
        const cy = y + h / 2
        y += h
        return (
          <mesh key={i} position={[0, cy, 0]}>
            <cylinderGeometry args={[0.92, 0.86, h, 48, 1, true]} />
            <meshStandardMaterial
              color={layer.color}
              roughness={0.35}
              metalness={0.05}
              side={THREE.DoubleSide}
            />
          </mesh>
        )
      })}
      {/* liquid surface */}
      <mesh position={[0, y + 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.92, 48]} />
        <meshStandardMaterial
          color={drink.layers[drink.layers.length - 1].color}
          roughness={0.18}
          metalness={0.15}
        />
      </mesh>
      {drink.foam && (
        <group position={[0, y + 0.02, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.34, 0.9, 48]} />
            <meshStandardMaterial
              color="#fff6e8"
              roughness={0.9}
              transparent
              opacity={0.55}
            />
          </mesh>
          <mesh
            position={[0, 0.03, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[1, 1, 0.45]}
          >
            <torusGeometry args={[0.3, 0.07, 16, 40]} />
            <meshStandardMaterial color="#fffaf1" roughness={0.95} />
          </mesh>
        </group>
      )}
    </group>
  )
}

export function CoffeeCup({
  drink,
  spin = 0.35,
  showSaucer = true,
}: {
  drink: Drink
  spin?: number
  showSaucer?: boolean
}) {
  const cup = useRef<THREE.Group>(null)
  useFrame((_, delta) => {
    if (cup.current) cup.current.rotation.y += delta * spin
  })

  const glass = !!drink.iced

  return (
    <Float speed={1.6} rotationIntensity={0.18} floatIntensity={0.5}>
      <group position={[0, -1.15, 0]}>
        {showSaucer && (
          <group position={[0, -0.06, 0]}>
            <mesh castShadow receiveShadow>
              <cylinderGeometry args={[1.72, 1.5, 0.09, 64]} />
              <meshStandardMaterial
                color={drink.cupColor}
                roughness={0.28}
                metalness={0.06}
              />
            </mesh>
            <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <torusGeometry args={[1.05, 0.035, 12, 64]} />
              <meshStandardMaterial color={drink.accent} roughness={0.4} />
            </mesh>
          </group>
        )}

        <group ref={cup}>
          {/* body */}
          <mesh castShadow position={[0, 0.95, 0]}>
            <cylinderGeometry args={[1, 0.92, 1.9, 64, 1, true]} />
            {glass ? (
              <meshPhysicalMaterial
                color="#eaf6fb"
                roughness={0.04}
                transmission={0.95}
                thickness={0.5}
                ior={1.45}
                transparent
                side={THREE.DoubleSide}
              />
            ) : (
              <meshStandardMaterial
                color={drink.cupColor}
                roughness={0.25}
                metalness={0.08}
                side={THREE.DoubleSide}
              />
            )}
          </mesh>
          {/* base */}
          <mesh position={[0, 0.06, 0]}>
            <cylinderGeometry args={[0.92, 0.92, 0.12, 64]} />
            <meshStandardMaterial
              color={glass ? '#dceaf2' : drink.cupColor}
              roughness={0.3}
            />
          </mesh>
          {/* rim */}
          <mesh position={[0, 1.88, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1, 0.05, 16, 64]} />
            <meshStandardMaterial
              color={glass ? '#e6f3fa' : drink.accent}
              roughness={0.25}
              metalness={0.2}
            />
          </mesh>
          {/* handle */}
          {!glass && (
            <mesh position={[1.02, 1.05, 0]} rotation={[0, 0, -0.25]}>
              <torusGeometry args={[0.44, 0.075, 16, 48, Math.PI * 1.35]} />
              <meshStandardMaterial
                color={drink.cupColor}
                roughness={0.28}
                metalness={0.08}
              />
            </mesh>
          )}
          <Liquid drink={drink} />
          {drink.iced && <IceCubes />}
        </group>

        {!drink.iced && <Steam />}
      </group>
    </Float>
  )
}
