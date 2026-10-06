import { NonAlcoholicDrink } from '../types';

const FALLBACK_NON_ALCOHOLIC: NonAlcoholicDrink[] = [
  {
    idDrink: '12560',
    strDrink: 'Afterglow',
    strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/vuqyvr1487603970.jpg',
  },
  {
    idDrink: '12562',
    strDrink: 'Alice Cocktail',
    strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/qyqtpv1468876144.jpg',
  },
  {
    idDrink: '12862',
    strDrink: 'Aloha Fruit punch',
    strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/wsyvrt1468876267.jpg',
  },
  {
    idDrink: '15106',
    strDrink: 'Apello',
    strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/uptxtv1468876415.jpg',
  },
  {
    idDrink: '12710',
    strDrink: 'Apple Berry Smoothie',
    strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/xwqvur1468876473.jpg',
  },
  {
    idDrink: '12572',
    strDrink: 'Bora Bora',
    strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/xwuqvw1473201811.jpg',
  },
  {
    idDrink: '12670',
    strDrink: 'Fruit Cooler',
    strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/i3tfn31484430499.jpg',
  },
  {
    idDrink: '17176',
    strDrink: 'Ipamena',
    strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/yswuwp1469090992.jpg',
  },
  {
    idDrink: '13036',
    strDrink: 'Strawberry Lemonade',
    strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/spvvxp1468924425.jpg',
  },
  {
    idDrink: '12786',
    strDrink: 'Thai Iced Tea',
    strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/trvwpu1441245568.jpg',
  },
];

export async function fetchNonAlcoholicCocktails(): Promise<NonAlcoholicDrink[]> {
  try {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic';
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);

    if (!res.ok) {
      // Try local server proxy fallback
      const proxyRes = await fetch('/api/cocktails/non-alcoholic');
      if (proxyRes.ok) {
        const proxyData = await proxyRes.json();
        if (proxyData.drinks && proxyData.drinks.length > 0) {
          return proxyData.drinks;
        }
      }
      throw new Error(`HTTP error ${res.status}`);
    }

    const data = await res.json();
    if (data.drinks && Array.isArray(data.drinks) && data.drinks.length > 0) {
      return data.drinks;
    }
  } catch (err) {
    console.warn('TheCocktailDB API fetch failed, utilizing fallback dataset:', err);
  }

  return FALLBACK_NON_ALCOHOLIC;
}
