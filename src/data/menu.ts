export type Layer = { color: string; height: number }

export type Drink = {
  id: string
  name: string
  tagline: string
  description: string
  price: number
  kcal: number
  badge?: string
  cupColor: string
  accent: string
  layers: Layer[]
  foam: boolean
  iced?: boolean
}

export const MENU: Drink[] = [
  {
    id: 'latte',
    name: 'Latte',
    tagline: 'Silky steamed milk, gentle espresso',
    description:
      'A double shot pulled slow, folded into micro-foamed milk for a velvet finish and a heart poured on top.',
    price: 4.5,
    kcal: 190,
    badge: 'Signature',
    cupColor: '#f4efe7',
    accent: '#d8a26a',
    foam: true,
    layers: [
      { color: '#6b3a1c', height: 0.28 },
      { color: '#c99a68', height: 0.42 },
      { color: '#efdcc3', height: 0.3 },
    ],
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    tagline: 'Equal thirds, endless comfort',
    description:
      'Espresso, steamed milk and a crown of dense foam dusted with cocoa. The classic Italian morning.',
    price: 4.2,
    kcal: 150,
    cupColor: '#fdfaf5',
    accent: '#b9793f',
    foam: true,
    layers: [
      { color: '#5a2f16', height: 0.34 },
      { color: '#b98553', height: 0.3 },
      { color: '#f6ead6', height: 0.36 },
    ],
  },
  {
    id: 'mocha',
    name: 'Mocha',
    tagline: 'Chocolate meets crema',
    description:
      'Dark Belgian chocolate melted into espresso, topped with whipped cream and a cocoa drift.',
    price: 5.1,
    kcal: 290,
    badge: 'Bestseller',
    cupColor: '#efe3d6',
    accent: '#8a4b2a',
    foam: true,
    layers: [
      { color: '#2f160b', height: 0.4 },
      { color: '#7a3f22', height: 0.3 },
      { color: '#e9d3bb', height: 0.3 },
    ],
  },
  {
    id: 'espresso',
    name: 'Espresso',
    tagline: 'Pure, loud, 25 seconds',
    description:
      'A single origin ristretto shot with a hazelnut crema. Small cup, big opinion.',
    price: 3.0,
    kcal: 5,
    cupColor: '#e8e2da',
    accent: '#6f3d20',
    foam: false,
    layers: [
      { color: '#221007', height: 0.72 },
      { color: '#a56435', height: 0.28 },
    ],
  },
  {
    id: 'flat-white',
    name: 'Flat White',
    tagline: 'Antipodean and unbothered',
    description:
      'Ristretto base with steamed whole milk poured thin — no foam hat, just glossy texture.',
    price: 4.4,
    kcal: 170,
    cupColor: '#f7f2ea',
    accent: '#c58e57',
    foam: false,
    layers: [
      { color: '#5c3218', height: 0.35 },
      { color: '#cfa273', height: 0.65 },
    ],
  },
  {
    id: 'caramel-macchiato',
    name: 'Caramel Macchiato',
    tagline: 'Vanilla, milk, marked with espresso',
    description:
      'Vanilla syrup under steamed milk, marked with espresso and laced with a slow caramel drizzle.',
    price: 5.4,
    kcal: 250,
    badge: 'Sweet',
    cupColor: '#fbf5ec',
    accent: '#e0a244',
    foam: true,
    layers: [
      { color: '#f0dfc4', height: 0.3 },
      { color: '#a86a34', height: 0.32 },
      { color: '#e8c48d', height: 0.38 },
    ],
  },
  {
    id: 'cold-brew',
    name: 'Cold Brew',
    tagline: 'Steeped 18 hours, zero rush',
    description:
      'Coarse ground beans steeped cold overnight. Low acid, chocolatey, served over clear ice.',
    price: 4.8,
    kcal: 15,
    cupColor: '#cfe6ef',
    accent: '#4b8fa8',
    foam: false,
    iced: true,
    layers: [
      { color: '#2b1409', height: 0.68 },
      { color: '#5d3319', height: 0.32 },
    ],
  },
  {
    id: 'matcha-latte',
    name: 'Matcha Latte',
    tagline: 'Ceremonial grade, whisked fresh',
    description:
      'Stone-ground Uji matcha whisked to a froth and poured over cold milk. Grassy, sweet, electric green.',
    price: 5.2,
    kcal: 180,
    badge: 'New',
    cupColor: '#f2f7ee',
    accent: '#6aa84f',
    foam: true,
    iced: true,
    layers: [
      { color: '#e9e2d2', height: 0.34 },
      { color: '#8fbf6a', height: 0.3 },
      { color: '#5f9c3f', height: 0.36 },
    ],
  },
]
