import { Pairing, DrinkSummary, DrinkDetail, MocktailPairingInfo } from '../types';

export const API = 'https://www.thecocktaildb.com/api/json/v1/1';

// The pairing table from the reference code
export const PAIRINGS: Pairing[] = [
  {
    genre: 'Rock',
    emoji: '🎸',
    color: '#E4572E',
    vibe: 'Loud riffs need a caffeine kick.',
    keywords: ['coffee', 'tea', 'chai', 'frapp', 'melya'],
  },
  {
    genre: 'Pop',
    emoji: '🎤',
    color: '#F25F9C',
    vibe: 'Sweet, bright and instantly catchy.',
    keywords: ['strawberry', 'afterglow', 'alice'],
  },
  {
    genre: 'Jazz',
    emoji: '🎷',
    color: '#8B5E3C',
    vibe: 'Smooth and rich, like a slow solo.',
    keywords: ['chocolate', 'cocoa', 'egg cream'],
  },
  {
    genre: 'R&B',
    emoji: '🎹',
    color: '#7B4BC4',
    vibe: 'Silky, layered and easy to love.',
    keywords: ['smoothie', 'sweet bananas'],
  },
  {
    genre: 'Electronic',
    emoji: '🎧',
    color: '#00A6A6',
    vibe: 'Big energy, made for a crowd.',
    keywords: ['punch', 'pysch', 'moonmint'],
  },
  {
    genre: 'Hip-Hop',
    emoji: '🧢',
    color: '#F2A007',
    vibe: 'Sharp, zesty and full of attitude.',
    keywords: ['ade', 'coke', 'apple karate'],
  },
  {
    genre: 'World',
    emoji: '🌏',
    color: '#2E8B57',
    vibe: 'Flavours from far-flung places.',
    keywords: ['lassi', 'lemouroudji', 'ipamena', 'bora bora'],
  },
  {
    genre: 'Acoustic',
    emoji: '🪕',
    color: '#4A90D9',
    vibe: 'Laid-back, beachy and unplugged.',
    keywords: ['shake', 'cooler', 'flip-flop', 'tang'],
  },
  {
    genre: 'Surprise me',
    emoji: '🎲',
    color: '#444444',
    vibe: 'No rules. Let the menu decide.',
    keywords: [],
  },
];

// Mapping each existing concert to a musical genre in the pairing table
export const CONCERT_TO_GENRE_MAP: Record<string, string> = {
  coldplay: 'Rock',
  'jj-lin': 'R&B',
  'olivia-rodrigo': 'Pop',
  yoasobi: 'Electronic',
  'hans-zimmer': 'Jazz',
  'a-mei': 'World',
  'jack-johnson': 'Acoustic',
  'rich-brian': 'Hip-Hop',
};

// Fallback Drink Details for reliable offline/instant rendering
export const FALLBACK_DRINK_DETAILS: Record<string, DrinkDetail> = {
  // Rock -> Thai Iced Coffee
  '12784': {
    idDrink: '12784',
    strDrink: 'Thai Iced Coffee',
    strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/rqpypv1441245650.jpg',
    strGlass: 'Highball glass',
    strInstructions:
      'Brew very strong coffee. Fill tall glass with crushed ice. Pour coffee, stir in sweetened condensed milk and ground cardamom. Top with evaporated milk.',
    strIngredient1: 'Dark roast coffee',
    strMeasure1: '6 tbsp',
    strIngredient2: 'Sweetened condensed milk',
    strMeasure2: '2 tbsp',
    strIngredient3: 'Crushed cardamom',
    strMeasure3: '1/2 tsp',
    strIngredient4: 'Crushed ice',
    strMeasure4: '1 cup',
  },
  // Pop -> Strawberry Lemonade
  '13036': {
    idDrink: '13036',
    strDrink: 'Strawberry Lemonade',
    strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/spvvxp1468924425.jpg',
    strGlass: 'Collins Glass',
    strInstructions:
      'Muddle fresh strawberries with sugar syrup. Squeeze fresh lemon juice over ice. Top with sparkling soda water and garnish with a strawberry slice and mint.',
    strIngredient1: 'Fresh strawberries',
    strMeasure1: '1/2 cup',
    strIngredient2: 'Fresh lemon juice',
    strMeasure2: '1 oz',
    strIngredient3: 'Simple syrup',
    strMeasure3: '1 oz',
    strIngredient4: 'Club soda',
    strMeasure4: 'To top',
  },
  // Pop alternate -> Afterglow
  '12560': {
    idDrink: '12560',
    strDrink: 'Afterglow',
    strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/vuqyvr1487603970.jpg',
    strGlass: 'Highball Glass',
    strInstructions:
      'Mix 1 part grenadine, 4 parts orange juice, and 4 parts pineapple juice into a highball glass over ice cubes. Serve with a straw.',
    strIngredient1: 'Grenadine',
    strMeasure1: '1 part',
    strIngredient2: 'Orange juice',
    strMeasure2: '4 parts',
    strIngredient3: 'Pineapple juice',
    strMeasure3: '4 parts',
  },
  // Jazz -> Castillian Hot Chocolate
  '12730': {
    idDrink: '12730',
    strDrink: 'Castillian Hot Chocolate',
    strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/3nbu4a1487603196.jpg',
    strGlass: 'Coffee mug',
    strInstructions:
      'Gently melt finely chopped artisanal bittersweet chocolate with whole milk and roasted demerara over low heat until rich, silky and thick. Stir with a smoked cinnamon stick.',
    strIngredient1: 'Bittersweet dark chocolate',
    strMeasure1: '1/2 cup',
    strIngredient2: 'Whole milk',
    strMeasure2: '1 cup',
    strIngredient3: 'Demerara sugar',
    strMeasure3: '1 tbsp',
    strIngredient4: 'Cinnamon stick',
    strMeasure4: '1',
  },
  // R&B -> Sweet Bananas
  '12724': {
    idDrink: '12724',
    strDrink: 'Sweet Bananas',
    strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/sxpcj71487603345.jpg',
    strGlass: 'Collins Glass',
    strInstructions:
      'Place peeled ripe banana, honey, chilled milk, and crushed ice into a high-speed blender. Blend until silky smooth and dust with fresh cinnamon.',
    strIngredient1: 'Ripe banana',
    strMeasure1: '1 whole',
    strIngredient2: 'Organic honey',
    strMeasure2: '2 tbsp',
    strIngredient3: 'Chilled milk',
    strMeasure3: '1 cup',
    strIngredient4: 'Ground cinnamon',
    strMeasure4: 'Pinch',
  },
  // Electronic -> Pysch Vitamin Light
  '15092': {
    idDrink: '15092',
    strDrink: 'Pysch Vitamin Light',
    strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/xsqsxw1441553580.jpg',
    strGlass: 'Highball Glass',
    strInstructions:
      'Combine passion fruit nectar, butterfly pea blossom cordial, and chilled tonic water over crystal cube ice. Garnish with lime wheel and edible neon flowers.',
    strIngredient1: 'Passion fruit juice',
    strMeasure1: '3 oz',
    strIngredient2: 'Butterfly pea flower tea',
    strMeasure2: '2 oz',
    strIngredient3: 'Tonic water',
    strMeasure3: 'To top',
    strIngredient4: 'Lime wheel',
    strMeasure4: '1 slice',
  },
  // Hip-Hop -> Apple Karate
  '12564': {
    idDrink: '12564',
    strDrink: 'Apple Karate',
    strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/syusvw1468876634.jpg',
    strGlass: 'Highball Glass',
    strInstructions:
      'Pour crisp apple juice and fresh lemonade into a shaker with cracked ice. Shake with attitude for 10 seconds. Strain over ice and top with a dash of ginger ade.',
    strIngredient1: 'Crisp apple juice',
    strMeasure1: '4 oz',
    strIngredient2: 'Lemonade',
    strMeasure2: '3 oz',
    strIngredient3: 'Ginger ale',
    strMeasure3: '1 oz',
  },
  // World -> Bora Bora
  '12572': {
    idDrink: '12572',
    strDrink: 'Bora Bora',
    strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/xwuqvw1473201811.jpg',
    strGlass: 'Highball Glass',
    strInstructions:
      'Pour pineapple juice, passion fruit juice, fresh lemon juice, and grenadine into a shaker filled with ice. Shake vigorously and strain into highball glass.',
    strIngredient1: 'Pineapple juice',
    strMeasure1: '10 cl',
    strIngredient2: 'Passion fruit juice',
    strMeasure2: '6 cl',
    strIngredient3: 'Fresh lemon juice',
    strMeasure3: '1 cl',
    strIngredient4: 'Grenadine',
    strMeasure4: '2 cl',
  },
  // Acoustic -> Fruit Cooler
  '12670': {
    idDrink: '12670',
    strDrink: 'Fruit Cooler',
    strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/i3tfn31484430499.jpg',
    strGlass: 'Highball Glass',
    strInstructions:
      'Toss fresh citrus fruits into a tall glass with crushed ice. Pour chilled apple juice, orange juice, and sparkling ginger ale. Stir gently and relax.',
    strIngredient1: 'Apple juice',
    strMeasure1: '3 oz',
    strIngredient2: 'Orange juice',
    strMeasure2: '3 oz',
    strIngredient3: 'Sparkling ginger ale',
    strMeasure3: '2 oz',
    strIngredient4: 'Fresh mint',
    strMeasure4: '3 sprigs',
  },
};

// Turn strIngredient1–15 and strMeasure1–15 into a clean list
export function getIngredients(d: DrinkDetail): string[] {
  return Array.from({ length: 15 }, (_, i) => {
    const ingredient = d[`strIngredient${i + 1}`] as string | null;
    const measure = d[`strMeasure${i + 1}`] as string | null;
    return ingredient ? `${measure ? measure.trim() + ' ' : ''}${ingredient.trim()}` : '';
  }).filter(Boolean);
}

// Cache: the mocktail list is fetched once, then reused on every tap
let listCache: DrinkSummary[] | null = null;
const detailCache: Record<string, DrinkDetail> = { ...FALLBACK_DRINK_DETAILS };

export async function getAllDrinks(): Promise<DrinkSummary[]> {
  if (listCache && listCache.length > 0) return listCache;
  try {
    const res = await fetch(`${API}/filter.php?a=Non_Alcoholic`);
    if (!res.ok) throw new Error("Couldn't reach the drinks menu.");
    const data = await res.json();
    listCache = Array.isArray(data.drinks) ? data.drinks : [];
    return listCache ?? [];
  } catch (err) {
    console.warn('Network error reaching TheCocktailDB:', err);
    // Return fallback list of verified non-alcoholic drinks
    const fallbacks = Object.values(FALLBACK_DRINK_DETAILS).map((d) => ({
      idDrink: d.idDrink,
      strDrink: d.strDrink,
      strDrinkThumb: d.strDrinkThumb,
    }));
    return fallbacks;
  }
}

export async function getDrinkDetail(idDrink: string): Promise<DrinkDetail> {
  if (detailCache[idDrink]) {
    return detailCache[idDrink];
  }
  try {
    const res = await fetch(`${API}/lookup.php?i=${idDrink}`);
    if (!res.ok) throw new Error("Couldn't load the recipe.");
    const data = await res.json();
    const detail = data.drinks?.[0];
    if (detail) {
      detailCache[idDrink] = detail;
      return detail;
    }
  } catch (err) {
    console.warn(`Error loading recipe for drink ${idDrink}:`, err);
  }
  // Fallback to default if available, or synthesize
  return (
    FALLBACK_DRINK_DETAILS[idDrink] || {
      idDrink,
      strDrink: 'Artisanal Zero-Proof Mocktail',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/vuqyvr1487603970.jpg',
      strGlass: 'Highball Glass',
      strInstructions: 'Serve chilled over fresh ice with aromatic botanical garnish.',
      strIngredient1: 'Botanical zero-proof spirit',
      strMeasure1: '2 oz',
      strIngredient2: 'Artisanal tonic water',
      strMeasure2: '4 oz',
    }
  );
}

/**
 * Match drinks by keyword or genre table
 */
export async function pairDrinkByGenre(
  p: Pairing,
  avoidId?: string
): Promise<{ drink: DrinkDetail; pairing: Pairing; ingredients: string[] }> {
  const all = await getAllDrinks();

  // Match drinks by keyword (or take everything for "Surprise me")
  let matches = p.keywords.length
    ? all.filter((d) => p.keywords.some((k) => d.strDrink.toLowerCase().includes(k)))
    : all;

  // "Shake another" shouldn't serve the same drink twice in a row
  if (avoidId && matches.length > 1) {
    matches = matches.filter((d) => d.idDrink !== avoidId);
  }
  if (!matches.length) {
    // If no keyword match in the online API, fallback to our curated list or all
    matches = all;
  }

  const pick = matches[Math.floor(Math.random() * matches.length)];
  const detail = await getDrinkDetail(pick.idDrink);
  const ingredients = getIngredients(detail);

  return {
    drink: detail,
    pairing: p,
    ingredients,
  };
}

export function getPairingByGenreName(genreName: string): Pairing {
  const found = PAIRINGS.find((p) => p.genre.toLowerCase() === genreName.toLowerCase());
  return found || PAIRINGS[PAIRINGS.length - 1]; // "Surprise me" fallback
}

export function getPairingForConcert(concertId: string): Pairing {
  const genre = CONCERT_TO_GENRE_MAP[concertId] || 'Surprise me';
  return getPairingByGenreName(genre);
}

// Initial Static/Pre-matched drinks for all concerts
export const DEFAULT_CONCERT_MOCKTAIL_INFO: Record<string, MocktailPairingInfo> = {
  coldplay: {
    idDrink: '12784',
    strDrink: 'Thai Iced Coffee',
    strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/rqpypv1441245650.jpg',
    genre: 'Rock',
    emoji: '🎸',
    color: '#E4572E',
    vibe: 'Loud riffs need a caffeine kick.',
    barName: 'ATLAS Bar SG (Parkview Square)',
    price: 26,
    glass: 'Highball glass',
    instructions:
      'Brew very strong coffee. Fill tall glass with crushed ice. Pour coffee, stir in sweetened condensed milk and ground cardamom.',
    ingredients: ['Dark roast coffee (6 tbsp)', 'Condensed milk (2 tbsp)', 'Crushed cardamom (1/2 tsp)', 'Crushed ice (1 cup)'],
  },
  'jj-lin': {
    idDrink: '12724',
    strDrink: 'Sweet Bananas',
    strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/sxpcj71487603345.jpg',
    genre: 'R&B',
    emoji: '🎹',
    color: '#7B4BC4',
    vibe: 'Silky, layered and easy to love.',
    barName: 'Smoke & Mirrors Rooftop Bar',
    price: 24,
    glass: 'Collins Glass',
    instructions:
      'Place peeled ripe banana, honey, chilled milk, and crushed ice into a high-speed blender. Blend until silky smooth and dust with cinnamon.',
    ingredients: ['Ripe banana (1 whole)', 'Organic honey (2 tbsp)', 'Chilled milk (1 cup)', 'Ground cinnamon (Pinch)'],
  },
  'olivia-rodrigo': {
    idDrink: '13036',
    strDrink: 'Strawberry Lemonade',
    strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/spvvxp1468924425.jpg',
    genre: 'Pop',
    emoji: '🎤',
    color: '#F25F9C',
    vibe: 'Sweet, bright and instantly catchy.',
    barName: 'Jigger & Pony (Amara Singapore)',
    price: 22,
    glass: 'Collins Glass',
    instructions:
      'Muddle fresh strawberries with simple syrup. Squeeze fresh lemon juice over ice. Top with sparkling club soda.',
    ingredients: ['Fresh strawberries (1/2 cup)', 'Fresh lemon juice (1 oz)', 'Simple syrup (1 oz)', 'Club soda (To top)'],
  },
  yoasobi: {
    idDrink: '15092',
    strDrink: 'Pysch Vitamin Light',
    strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/xsqsxw1441553580.jpg',
    genre: 'Electronic',
    emoji: '🎧',
    color: '#00A6A6',
    vibe: 'Big energy, made for a crowd.',
    barName: 'Smoke & Mirrors Rooftop Bar',
    price: 25,
    glass: 'Highball Glass',
    instructions:
      'Combine passion fruit nectar, butterfly pea flower cordial, and chilled tonic water over crystal cube ice. Garnish with lime wheel.',
    ingredients: ['Passion fruit juice (3 oz)', 'Butterfly pea flower tea (2 oz)', 'Tonic water (To top)', 'Lime wheel (1 slice)'],
  },
  'hans-zimmer': {
    idDrink: '12730',
    strDrink: 'Castillian Hot Chocolate',
    strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/3nbu4a1487603196.jpg',
    genre: 'Jazz',
    emoji: '🎷',
    color: '#8B5E3C',
    vibe: 'Smooth and rich, like a slow solo.',
    barName: 'Manhattan Bar (Conrad Orchard)',
    price: 28,
    glass: 'Coffee mug',
    instructions:
      'Melt bittersweet chocolate with whole milk and roasted demerara over low heat until rich and silky. Stir with a smoked cinnamon stick.',
    ingredients: ['Bittersweet dark chocolate (1/2 cup)', 'Whole milk (1 cup)', 'Demerara sugar (1 tbsp)', 'Cinnamon stick (1)'],
  },
  'a-mei': {
    idDrink: '12572',
    strDrink: 'Bora Bora',
    strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/xwuqvw1473201811.jpg',
    genre: 'World',
    emoji: '🌏',
    color: '#2E8B57',
    vibe: 'Flavours from far-flung places.',
    barName: 'ATLAS Bar SG (Parkview Square)',
    price: 26,
    glass: 'Highball Glass',
    instructions:
      'Pour pineapple juice, passion fruit juice, lemon juice, and grenadine into a shaker with ice. Shake vigorously and strain into tall glass.',
    ingredients: ['Pineapple juice (10 cl)', 'Passion fruit juice (6 cl)', 'Fresh lemon juice (1 cl)', 'Grenadine (2 cl)'],
  },
  'jack-johnson': {
    idDrink: '12670',
    strDrink: 'Fruit Cooler',
    strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/i3tfn31484430499.jpg',
    genre: 'Acoustic',
    emoji: '🪕',
    color: '#4A90D9',
    vibe: 'Laid-back, beachy and unplugged.',
    barName: 'Manhattan Bar (Conrad Orchard)',
    price: 24,
    glass: 'Highball Glass',
    instructions:
      'Toss citrus fruits into a tall glass with crushed ice. Pour chilled apple juice, orange juice, and ginger ale. Garnish with mint.',
    ingredients: ['Apple juice (3 oz)', 'Orange juice (3 oz)', 'Sparkling ginger ale (2 oz)', 'Fresh mint (3 sprigs)'],
  },
  'rich-brian': {
    idDrink: '12564',
    strDrink: 'Apple Karate',
    strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/syusvw1468876634.jpg',
    genre: 'Hip-Hop',
    emoji: '🧢',
    color: '#F2A007',
    vibe: 'Sharp, zesty and full of attitude.',
    barName: 'Jigger & Pony (Amara Singapore)',
    price: 24,
    glass: 'Highball Glass',
    instructions:
      'Shake crisp apple juice and fresh lemonade with cracked ice for 10 seconds. Strain over ice and top with a dash of ginger ade.',
    ingredients: ['Crisp apple juice (4 oz)', 'Lemonade (3 oz)', 'Ginger ale (1 oz)'],
  },
};
