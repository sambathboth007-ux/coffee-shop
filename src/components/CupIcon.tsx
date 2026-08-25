import type { Drink } from '../data/menu'

/** Lightweight CSS/SVG cup used inside menu cards (keeps one WebGL context on the page). */
export function CupIcon({ drink }: { drink: Drink }) {
  const top = drink.layers[drink.layers.length - 1].color
  const mid = drink.layers[Math.floor(drink.layers.length / 2)].color
  const bottom = drink.layers[0].color
  return (
    <div className="cup-icon" aria-hidden>
      <div className="cup-icon__steam">
        <span />
        <span />
        <span />
      </div>
      <div className="cup-icon__body" style={{ background: drink.cupColor }}>
        <div
          className="cup-icon__liquid"
          style={{
            background: `linear-gradient(180deg, ${top} 0%, ${mid} 55%, ${bottom} 100%)`,
          }}
        />
        <div className="cup-icon__gloss" />
      </div>
      <div
        className="cup-icon__handle"
        style={{ borderColor: drink.cupColor }}
      />
      <div
        className="cup-icon__saucer"
        style={{ background: drink.cupColor, boxShadow: `0 0 34px ${drink.accent}55` }}
      />
    </div>
  )
}
