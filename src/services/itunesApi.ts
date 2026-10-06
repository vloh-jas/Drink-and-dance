import { ItunesAlbum, ItunesTrack } from '../types';

// Fallback albums for instant offline/sandbox reliability
const FALLBACK_ALBUMS: Record<string, ItunesAlbum[]> = {
  'jack johnson': [
    {
      collectionId: 101,
      collectionName: 'In Between Dreams',
      artistName: 'Jack Johnson',
      artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/bf/16/a6/bf16a695-1f9e-6479-ca0a-9d95f87b8f9e/00602498801452.rgb.jpg/200x200bb.jpg',
      releaseDate: '2005-03-01',
      primaryGenreName: 'Singer/Songwriter',
      trackCount: 14,
    },
    {
      collectionId: 102,
      collectionName: 'Meet the Moonlight',
      artistName: 'Jack Johnson',
      artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/4a/1b/27/4a1b2792-5645-a764-4e2b-2a29cfc58bc3/22UMGIM34388.rgb.jpg/200x200bb.jpg',
      releaseDate: '2022-06-24',
      primaryGenreName: 'Rock',
      trackCount: 10,
    },
    {
      collectionId: 103,
      collectionName: 'Brushfire Fairytales',
      artistName: 'Jack Johnson',
      artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/ec/3b/b7/ec3bb748-0c67-640a-ca31-ef05a1d7c34b/00602498627885.rgb.jpg/200x200bb.jpg',
      releaseDate: '2001-02-01',
      primaryGenreName: 'Rock',
      trackCount: 13,
    },
  ],
  coldplay: [
    {
      collectionId: 201,
      collectionName: 'Music of the Spheres',
      artistName: 'Coldplay',
      artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/05/88/44/0588448f-bbab-4e31-54aa-115f02c61314/190296637402.jpg/200x200bb.jpg',
      releaseDate: '2021-10-15',
      primaryGenreName: 'Alternative',
      trackCount: 12,
    },
    {
      collectionId: 202,
      collectionName: 'A Rush of Blood to the Head',
      artistName: 'Coldplay',
      artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/2b/ef/11/2bef1156-f4f7-c932-d8f8-b3f54d193ef2/0724354050458.jpg/200x200bb.jpg',
      releaseDate: '2002-08-26',
      primaryGenreName: 'Alternative',
      trackCount: 11,
    },
    {
      collectionId: 203,
      collectionName: 'Viva La Vida or Death and All His Friends',
      artistName: 'Coldplay',
      artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/b8/b5/02/b8b50259-7ffc-5ae7-1a48-4e892c5ecbfa/5099921211451.jpg/200x200bb.jpg',
      releaseDate: '2008-06-12',
      primaryGenreName: 'Alternative',
      trackCount: 10,
    },
  ],
  'jj lin': [
    {
      collectionId: 301,
      collectionName: 'Drifter · Like You Do',
      artistName: 'JJ Lin',
      artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/a5/cb/a0/a5cba028-c104-58e1-5db0-b0b30eb6ea9d/190295147575.jpg/200x200bb.jpg',
      releaseDate: '2020-10-20',
      primaryGenreName: 'Mandopop',
      trackCount: 14,
    },
    {
      collectionId: 302,
      collectionName: 'Message In A Bottle',
      artistName: 'JJ Lin',
      artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/e5/22/e4/e522e430-b352-89b1-dae9-53e30f1469e3/190295738872.jpg/200x200bb.jpg',
      releaseDate: '2017-12-29',
      primaryGenreName: 'Mandopop',
      trackCount: 11,
    },
  ],
  'olivia rodrigo': [
    {
      collectionId: 401,
      collectionName: 'GUTS',
      artistName: 'Olivia Rodrigo',
      artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/58/b6/2a/58b62a42-7df8-c4dc-ebfa-ee2ba27c0903/23UM1IM02206.rgb.jpg/200x200bb.jpg',
      releaseDate: '2023-09-08',
      primaryGenreName: 'Pop',
      trackCount: 12,
    },
    {
      collectionId: 402,
      collectionName: 'SOUR',
      artistName: 'Olivia Rodrigo',
      artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/80/e5/e7/80e5e79d-3f0e-e5cf-255e-2b508f7ce011/21UMGIM33182.rgb.jpg/200x200bb.jpg',
      releaseDate: '2021-05-21',
      primaryGenreName: 'Pop',
      trackCount: 11,
    },
  ],
  yoasobi: [
    {
      collectionId: 501,
      collectionName: 'THE BOOK',
      artistName: 'YOASOBI',
      artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/05/92/ff/0592ff33-28c0-3b49-410a-e32560beee9b/195497678512.jpg/200x200bb.jpg',
      releaseDate: '2021-01-06',
      primaryGenreName: 'J-Pop',
      trackCount: 9,
    },
    {
      collectionId: 502,
      collectionName: 'THE BOOK 2',
      artistName: 'YOASOBI',
      artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/fa/5f/f0/fa5ff0a3-35fb-f73d-82d8-2b8bf5ce989c/196589078696.jpg/200x200bb.jpg',
      releaseDate: '2021-12-01',
      primaryGenreName: 'J-Pop',
      trackCount: 8,
    },
  ],
  'hans zimmer': [
    {
      collectionId: 601,
      collectionName: 'Interstellar (Original Motion Picture Soundtrack)',
      artistName: 'Hans Zimmer',
      artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/e0/75/eb/e075ebf9-8d77-d5d3-847e-976451e089d8/0794043180295.jpg/200x200bb.jpg',
      releaseDate: '2014-11-17',
      primaryGenreName: 'Soundtrack',
      trackCount: 16,
    },
    {
      collectionId: 602,
      collectionName: 'Dune (Original Motion Picture Soundtrack)',
      artistName: 'Hans Zimmer',
      artworkUrl100: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/5a/2a/3b/5a2a3b04-43cb-b09e-761a-0df0443c7b39/794043206230.jpg/200x200bb.jpg',
      releaseDate: '2021-09-17',
      primaryGenreName: 'Soundtrack',
      trackCount: 22,
    },
  ],
};

export async function fetchArtistAlbums(artistName: string): Promise<ItunesAlbum[]> {
  const cleanTerm = artistName.trim().toLowerCase();
  try {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(cleanTerm)}&entity=album&country=sg&limit=16`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);
    if (!res.ok) throw new Error('Network error');
    const data = await res.json();
    if (data.results && data.results.length > 0) {
      return data.results.map((item: any) => ({
        collectionId: item.collectionId,
        collectionName: item.collectionName || 'Untitled Album',
        artistName: item.artistName || artistName,
        artworkUrl100: item.artworkUrl100 || '',
        artworkUrl600: item.artworkUrl100 ? item.artworkUrl100.replace('100x100bb', '600x600bb') : '',
        releaseDate: item.releaseDate,
        primaryGenreName: item.primaryGenreName,
        trackCount: item.trackCount,
        collectionViewUrl: item.collectionViewUrl,
      }));
    }
  } catch (err) {
    console.warn(`iTunes API album search failed for ${cleanTerm}, using curated cache.`, err);
  }

  // Fallback match
  const matchKey = Object.keys(FALLBACK_ALBUMS).find((k) => cleanTerm.includes(k) || k.includes(cleanTerm));
  if (matchKey && FALLBACK_ALBUMS[matchKey]) {
    return FALLBACK_ALBUMS[matchKey];
  }

  return FALLBACK_ALBUMS['jack johnson'];
}

export async function fetchArtistTopTracks(artistName: string): Promise<ItunesTrack[]> {
  const cleanTerm = artistName.trim().toLowerCase();
  try {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(cleanTerm)}&entity=song&country=sg&limit=10`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);
    if (!res.ok) throw new Error('Network error');
    const data = await res.json();
    if (data.results && data.results.length > 0) {
      return data.results
        .filter((t: any) => t.previewUrl)
        .map((t: any) => ({
          trackId: t.trackId,
          trackName: t.trackName,
          artistName: t.artistName,
          collectionName: t.collectionName,
          artworkUrl100: t.artworkUrl100,
          previewUrl: t.previewUrl,
          trackTimeMillis: t.trackTimeMillis,
          primaryGenreName: t.primaryGenreName,
        }));
    }
  } catch (err) {
    console.warn(`iTunes API tracks search failed for ${cleanTerm}.`, err);
  }

  return [];
}
