# Ember & Oak — 3D Coffee Shop

Single-page coffee shop built with React + TypeScript, Vite, three.js (@react-three/fiber / drei) and Framer Motion.

- Interactive 3D drink on the hero: drag to orbit, steam particles, floating beans, glass cups with ice for the cold drinks.
- 8 drinks (latte, cappuccino, mocha, espresso, flat white, caramel macchiato, cold brew, matcha latte) with prices, calories and descriptions.
- Menu cards with 3D tilt-on-hover, scroll reveals and animated CSS cups.
- Cart drawer with quantities, live total and a "Buy now" checkout confirmation.

## Run

Requires Node 22+.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

Drink data (name, price, layer colors) lives in `src/data/menu.ts`.
