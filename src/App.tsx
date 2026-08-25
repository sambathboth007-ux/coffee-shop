import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { MENU, type Drink } from './data/menu'
import { Scene } from './components/Scene'
import { CupIcon } from './components/CupIcon'
import './App.css'

type CartLine = { drink: Drink; qty: number }

const money = (n: number) => `$${n.toFixed(2)}`

function MenuCard({
  drink,
  active,
  onSelect,
  onAdd,
  index,
}: {
  drink: Drink
  active: boolean
  onSelect: () => void
  onAdd: () => void
  index: number
}) {
  const rx = useSpring(useMotionValue(0), { stiffness: 180, damping: 16 })
  const ry = useSpring(useMotionValue(0), { stiffness: 180, damping: 16 })

  return (
    <motion.article
      className={`card ${active ? 'card--active' : ''}`}
      style={{ rotateX: rx, rotateY: ry, ['--accent' as string]: drink.accent }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: (index % 4) * 0.07, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 16)
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * 16)
      }}
      onMouseLeave={() => {
        rx.set(0)
        ry.set(0)
      }}
      onClick={onSelect}
    >
      <div className="card__glow" />
      {drink.badge && <span className="card__badge">{drink.badge}</span>}
      <CupIcon drink={drink} />
      <h3>{drink.name}</h3>
      <p className="card__tagline">{drink.tagline}</p>
      <p className="card__desc">{drink.description}</p>
      <div className="card__foot">
        <div>
          <span className="card__price">{money(drink.price)}</span>
          <span className="card__kcal">{drink.kcal} kcal</span>
        </div>
        <motion.button
          className="btn btn--add"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={(e) => {
            e.stopPropagation()
            onAdd()
          }}
        >
          Add +
        </motion.button>
      </div>
    </motion.article>
  )
}

export default function App() {
  const [selected, setSelected] = useState<Drink>(MENU[0])
  const [cart, setCart] = useState<CartLine[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [ordered, setOrdered] = useState(false)

  const count = cart.reduce((s, l) => s + l.qty, 0)
  const total = useMemo(
    () => cart.reduce((s, l) => s + l.qty * l.drink.price, 0),
    [cart],
  )

  const add = (drink: Drink) => {
    setCart((c) => {
      const hit = c.find((l) => l.drink.id === drink.id)
      return hit
        ? c.map((l) => (l.drink.id === drink.id ? { ...l, qty: l.qty + 1 } : l))
        : [...c, { drink, qty: 1 }]
    })
    setCartOpen(true)
  }

  const setQty = (id: string, delta: number) =>
    setCart((c) =>
      c
        .map((l) => (l.drink.id === id ? { ...l, qty: l.qty + delta } : l))
        .filter((l) => l.qty > 0),
    )

  return (
    <div className="app" style={{ ['--accent' as string]: selected.accent }}>
      <div className="grain" />

      <header className="nav">
        <motion.div
          className="brand"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="brand__mark">☕</span>
          <span>
            EMBER<b>&amp;</b>OAK
          </span>
        </motion.div>
        <nav className="nav__links">
          <a href="#menu">Menu</a>
          <a href="#craft">Craft</a>
          <a href="#visit">Visit</a>
        </nav>
        <motion.button
          className="btn btn--cart"
          onClick={() => setCartOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Cart
          <AnimatePresence>
            {count > 0 && (
              <motion.span
                key={count}
                className="pill"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                {count}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </header>

      <section className="hero">
        <div className="hero__canvas">
          <Scene drink={selected} />
        </div>
        <div className="hero__copy">
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            Roasted daily · Est. 2014
          </motion.p>
          <h1>
            {'Coffee'.split('').map((ch, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 60, rotateX: -80 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                {ch}
              </motion.span>
            ))}
            <br />
            <motion.em
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.7 }}
            >
              in three dimensions
            </motion.em>
          </h1>
          <motion.p
            className="hero__lead"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
          >
            Spin the cup. Pick your pour. We pull every shot to order — small
            batch beans, ceramic warmed, foam poured by hand.
          </motion.p>

          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              className="hero__drink"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.35 }}
            >
              <div>
                <h2>{selected.name}</h2>
                <p>{selected.tagline}</p>
              </div>
              <span className="hero__price">{money(selected.price)}</span>
            </motion.div>
          </AnimatePresence>

          <div className="hero__actions">
            <motion.button
              className="btn btn--primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => add(selected)}
            >
              Buy {selected.name} · {money(selected.price)}
            </motion.button>
            <a className="btn btn--ghost" href="#menu">
              See full menu
            </a>
          </div>

          <div className="hero__swatches">
            {MENU.map((d) => (
              <button
                key={d.id}
                className={`swatch ${d.id === selected.id ? 'swatch--on' : ''}`}
                style={{ background: d.accent }}
                onClick={() => setSelected(d)}
                aria-label={d.name}
                title={d.name}
              />
            ))}
          </div>
        </div>
        <div className="scroll-hint">scroll</div>
      </section>

      <section className="menu" id="menu">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          The Menu
        </motion.h2>
        <p className="section-sub">
          Tap a drink to load it into the 3D bar above. Add what you love.
        </p>
        <div className="grid">
          {MENU.map((d, i) => (
            <MenuCard
              key={d.id}
              drink={d}
              index={i}
              active={d.id === selected.id}
              onSelect={() => {
                setSelected(d)
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              onAdd={() => add(d)}
            />
          ))}
        </div>
      </section>

      <section className="craft" id="craft">
        {[
          { n: '01', t: 'Sourced', d: 'Single-estate lots from Huila, Yirgacheffe and Antigua.' },
          { n: '02', t: 'Roasted', d: 'Small 12kg drum batches, profiled weekly by our head roaster.' },
          { n: '03', t: 'Poured', d: 'Volumetric shots, 62°C milk, latte art on every cup.' },
        ].map((s, i) => (
          <motion.div
            key={s.n}
            className="craft__step"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
          >
            <span>{s.n}</span>
            <h3>{s.t}</h3>
            <p>{s.d}</p>
          </motion.div>
        ))}
      </section>

      <footer className="footer" id="visit">
        <div>
          <h3>Ember &amp; Oak</h3>
          <p>18 Kiln Lane · Open 7am – 6pm daily</p>
        </div>
        <p className="footer__note">Brewed with three.js, React &amp; too much caffeine.</p>
      </footer>

      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              className="scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartOpen(false)}
            />
            <motion.aside
              className="cart"
              initial={{ x: '110%' }}
              animate={{ x: 0 }}
              exit={{ x: '110%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            >
              <div className="cart__head">
                <h2>Your order</h2>
                <button className="icon-btn" onClick={() => setCartOpen(false)}>
                  ✕
                </button>
              </div>

              {cart.length === 0 ? (
                <p className="cart__empty">Nothing brewing yet.</p>
              ) : (
                <ul className="cart__list">
                  <AnimatePresence initial={false}>
                    {cart.map((l) => (
                      <motion.li
                        key={l.drink.id}
                        layout
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                      >
                        <span
                          className="dot"
                          style={{ background: l.drink.accent }}
                        />
                        <div className="cart__info">
                          <strong>{l.drink.name}</strong>
                          <small>{money(l.drink.price)} each</small>
                        </div>
                        <div className="qty">
                          <button onClick={() => setQty(l.drink.id, -1)}>−</button>
                          <span>{l.qty}</span>
                          <button onClick={() => setQty(l.drink.id, 1)}>+</button>
                        </div>
                        <span className="cart__line">
                          {money(l.qty * l.drink.price)}
                        </span>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}

              <div className="cart__foot">
                <div className="cart__total">
                  <span>Total</span>
                  <motion.strong key={total} initial={{ scale: 1.15 }} animate={{ scale: 1 }}>
                    {money(total)}
                  </motion.strong>
                </div>
                <motion.button
                  className="btn btn--primary btn--block"
                  disabled={cart.length === 0}
                  whileHover={cart.length ? { scale: 1.03 } : undefined}
                  whileTap={cart.length ? { scale: 0.97 } : undefined}
                  onClick={() => {
                    setOrdered(true)
                    setCartOpen(false)
                    setTimeout(() => {
                      setOrdered(false)
                      setCart([])
                    }, 2600)
                  }}
                >
                  Buy now
                </motion.button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {ordered && (
          <motion.div
            className="toast"
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
          >
            <span className="toast__mark">✓</span>
            <div>
              <strong>Order placed</strong>
              <small>{money(total)} · we'll call your name in ~4 min</small>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
