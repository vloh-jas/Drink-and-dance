import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  Disc3,
  Search,
  ExternalLink,
  Volume2,
  VolumeX,
  Sparkles,
  Code2,
  Check,
  Music,
} from 'lucide-react';
import { fetchArtistAlbums, fetchArtistTopTracks } from '../services/itunesApi';
import { ItunesAlbum, ItunesTrack } from '../types';

interface MusicPreviewSheetProps {
  initialArtist?: string;
  onClose?: () => void;
}

export const MusicPreviewSheet: React.FC<MusicPreviewSheetProps> = ({
  initialArtist = 'Jack Johnson',
  onClose,
}) => {
  const [selectedArtist, setSelectedArtist] = useState<string>(initialArtist);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [albums, setAlbums] = useState<ItunesAlbum[]>([]);
  const [tracks, setTracks] = useState<ItunesTrack[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPlayingTrack, setCurrentPlayingTrack] = useState<ItunesTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showCodeSnippet, setShowCodeSnippet] = useState<boolean>(false);
  const [codeCopied, setCodeCopied] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const FEATURED_ARTISTS = [
    'Jack Johnson',
    'Coldplay',
    'JJ Lin',
    'Olivia Rodrigo',
    'YOASOBI',
    'Hans Zimmer',
    'A-Mei',
  ];

  // Fetch albums and tracks whenever selectedArtist changes
  useEffect(() => {
    let isCancelled = false;
    async function loadData() {
      setIsLoading(true);
      try {
        const [albumResults, trackResults] = await Promise.all([
          fetchArtistAlbums(selectedArtist),
          fetchArtistTopTracks(selectedArtist),
        ]);
        if (!isCancelled) {
          setAlbums(albumResults);
          setTracks(trackResults);
          // If we had a playing track that belongs to another artist, reset
          if (currentPlayingTrack && currentPlayingTrack.artistName.toLowerCase() !== selectedArtist.toLowerCase()) {
            setIsPlaying(false);
          }
        }
      } catch (err) {
        console.error('Error fetching iTunes data:', err);
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    }

    loadData();
    return () => {
      isCancelled = true;
    };
  }, [selectedArtist]);

  // Audio play/pause handler
  const handleTogglePlay = (track: ItunesTrack) => {
    if (currentPlayingTrack?.trackId === track.trackId) {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play();
        setIsPlaying(true);
      }
    } else {
      setCurrentPlayingTrack(track);
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.src = track.previewUrl;
        audioRef.current.play().catch((e) => console.log('Playback prevented', e));
      }
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const handleCustomSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSelectedArtist(searchQuery.trim());
      setSearchQuery('');
    }
  };

  const codeSnippetText = `// iTunes API React Integration (from prompt image)
const [albums, setAlbums] = useState([]);

useEffect(() => {
  fetch("https://itunes.apple.com/search?term=${encodeURIComponent(selectedArtist)}&entity=album&country=sg")
    .then(res => res.json())
    .then(data => setAlbums(data.results));
}, []);

// Render items with artworkUrl100, collectionName, artistName`;

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(codeSnippetText);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  return (
    <div className="w-full bg-[#131316] text-[#e4e1e6] flex flex-col pb-12">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        onEnded={handleAudioEnded}
        muted={isMuted}
        preload="auto"
      />

      {/* Header Banner */}
      <div className="p-4 sm:p-6 bg-gradient-to-b from-[#1f1f24] to-[#131316] border-b border-[#2a2a2d]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#b41503]/20 text-[#ffb4a7] text-[11px] font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>iTunes Live API Engine (Singapore Store)</span>
            </div>
            <h2 className="font-syne font-bold text-xl sm:text-2xl text-white">
              Artist Discography & Audio Previews
            </h2>
            <p className="text-xs sm:text-sm text-[#c1c6d9] mt-0.5">
              Live album artwork, release metadata, and 30-second studio previews direct from Apple iTunes SG.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowCodeSnippet(!showCodeSnippet)}
              className="px-3 py-1.5 rounded-lg bg-[#1f1f22] hover:bg-[#2a2a2d] border border-[#2a2a2d] text-xs font-medium text-[#c1c6d9] hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <Code2 className="w-4 h-4 text-[#ffb4a7]" />
              <span>{showCodeSnippet ? 'Hide API Code' : 'View iTunes API Code'}</span>
            </button>
          </div>
        </div>

        {/* Code Snippet Box (matching image.png) */}
        {showCodeSnippet && (
          <div className="mb-4 p-3.5 rounded-xl bg-[#0e0e11] border border-[#333545] font-mono text-[11px] relative text-[#c1c6d9] animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#22242a]">
              <span className="text-[#ffb4a7] font-bold uppercase text-[10px]">
                iTunes API Query Implementation (image.png)
              </span>
              <button
                type="button"
                onClick={copyCodeToClipboard}
                className="text-[11px] text-[#c1c6d9] hover:text-white flex items-center gap-1 bg-[#1f1f22] px-2 py-0.5 rounded border border-[#2a2a2d]"
              >
                {codeCopied ? <Check className="w-3 h-3 text-emerald-400" /> : null}
                <span>{codeCopied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="overflow-x-auto text-[#c1c6d9] leading-relaxed">
              {codeSnippetText}
            </pre>
          </div>
        )}

        {/* Artist Filter Buttons */}
        <div className="space-y-2">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#c1c6d9]">
            Select Featured Headliner:
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {FEATURED_ARTISTS.map((artist) => (
              <button
                key={artist}
                type="button"
                onClick={() => setSelectedArtist(artist)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                  selectedArtist.toLowerCase() === artist.toLowerCase()
                    ? 'bg-[#b41503] text-white shadow-[0_0_14px_rgba(180,21,3,0.4)]'
                    : 'bg-[#1f1f22] text-[#c1c6d9] hover:text-white hover:bg-[#2a2a2d]'
                }`}
              >
                {artist}
              </button>
            ))}
          </div>
        </div>

        {/* Search Input for any other artist */}
        <form onSubmit={handleCustomSearch} className="mt-3 relative flex items-center">
          <Search className="w-4 h-4 text-[#c1c6d9] absolute left-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search any artist on iTunes SG (e.g. Coldplay, Taylor Swift, Bruno Mars)..."
            className="w-full bg-[#1b1b1e] border border-[#2a2a2d] text-white text-xs pl-9 pr-24 py-2.5 rounded-xl focus:outline-none focus:border-[#b41503]"
          />
          <button
            type="submit"
            className="absolute right-1.5 px-3 py-1 bg-[#b41503] hover:bg-[#f80824] text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* Floating Active Player Bar if track selected */}
      {currentPlayingTrack && (
        <div className="sticky top-12 z-30 mx-4 mt-3 p-3 rounded-2xl bg-[#1f2533] border border-[#ffb4a7]/40 shadow-xl flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={currentPlayingTrack.artworkUrl100}
              alt={currentPlayingTrack.trackName}
              className="w-11 h-11 rounded-lg object-cover ring-1 ring-[#ffb4a7]"
            />
            <div className="min-w-0 text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#ffb4a7] block">
                30s iTunes Studio Audio Preview
              </span>
              <div className="text-xs sm:text-sm font-bold text-white truncate">
                {currentPlayingTrack.trackName}
              </div>
              <div className="text-[11px] text-[#c1c6d9] truncate">
                {currentPlayingTrack.artistName} · {currentPlayingTrack.collectionName}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-full bg-[#16171d] hover:bg-[#2a2a2d] text-[#c1c6d9] hover:text-white"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={() => handleTogglePlay(currentPlayingTrack)}
              className="w-10 h-10 rounded-full bg-[#b41503] hover:bg-[#f80824] text-white flex items-center justify-center shadow-lg transition-transform active:scale-95"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="p-4 sm:p-6 space-y-6">
        {/* Loading State */}
        {isLoading && (
          <div className="py-16 flex flex-col items-center justify-center gap-3">
            <Disc3 className="w-8 h-8 text-[#ffb4a7] animate-spin" />
            <span className="text-xs text-[#c1c6d9]">
              Querying iTunes API for <strong className="text-white">{selectedArtist}</strong>...
            </span>
          </div>
        )}

        {/* Section 1: Playable Tracks (Audio Previews) */}
        {!isLoading && tracks.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Music className="w-4 h-4 text-[#ffb4a7]" />
                <h3 className="font-syne font-bold text-base text-white">
                  Top Streamable Previews ({tracks.length})
                </h3>
              </div>
              <span className="text-[10px] text-[#c1c6d9] uppercase font-semibold">
                Tap to Play Audio
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {tracks.map((track) => {
                const isCurrent = currentPlayingTrack?.trackId === track.trackId;
                const activePlaying = isCurrent && isPlaying;

                return (
                  <button
                    key={track.trackId}
                    type="button"
                    onClick={() => handleTogglePlay(track)}
                    className={`p-2.5 rounded-xl border text-left flex items-center justify-between gap-3 transition-all ${
                      isCurrent
                        ? 'bg-[#1f2533] border-[#ffb4a7] shadow-md'
                        : 'bg-[#16171d] border-[#2a2a2d] hover:bg-[#1f1f22]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-[#2a2a2d]">
                        <img
                          src={track.artworkUrl100}
                          alt={track.trackName}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          {activePlaying ? (
                            <Pause className="w-4 h-4 text-white" />
                          ) : (
                            <Play className="w-4 h-4 text-white ml-0.5" />
                          )}
                        </div>
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-white truncate">
                          {track.trackName}
                        </div>
                        <div className="text-[11px] text-[#c1c6d9] truncate">
                          {track.collectionName}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[10px] font-mono text-[#ffb4a7] bg-[#b41503]/20 px-2 py-0.5 rounded-full">
                        0:30 Pre
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Section 2: Albums Grid (The exact pattern from image.png) */}
        {!isLoading && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Disc3 className="w-4 h-4 text-[#ffb4a7]" />
                <h3 className="font-syne font-bold text-base text-white">
                  Studio Albums & Collections ({albums.length})
                </h3>
              </div>
              <span className="text-[10px] text-[#c1c6d9]">
                Country: SG
              </span>
            </div>

            {albums.length === 0 ? (
              <div className="py-12 text-center text-xs text-[#c1c6d9] bg-[#16171d] rounded-2xl border border-[#2a2a2d]">
                No albums found for "{selectedArtist}". Try searching another name like "Jack Johnson" or "Coldplay".
              </div>
            ) : (
              <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4">
                {albums.map((album) => (
                  <div
                    key={album.collectionId}
                    className="p-2.5 rounded-xl bg-[#16171d] border border-[#2a2a2d] hover:border-[#3d404d] transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Image Source = {{ uri: item.artworkUrl100 }} */}
                      <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-[#22242a] mb-2 shadow-sm">
                        <img
                          src={album.artworkUrl600 || album.artworkUrl100}
                          alt={album.collectionName}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {album.primaryGenreName && (
                          <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-medium text-[#e4e1e6] backdrop-blur-xs">
                            {album.primaryGenreName}
                          </span>
                        )}
                      </div>

                      {/* Text: {item.collectionName} */}
                      <h4 className="font-syne font-bold text-xs text-white line-clamp-1 group-hover:text-[#ffb4a7] transition-colors">
                        {album.collectionName}
                      </h4>

                      {/* Text: {item.artistName} */}
                      <p className="text-[11px] text-[#c1c6d9] truncate mt-0.5">
                        {album.artistName}
                      </p>
                    </div>

                    <div className="mt-2 pt-2 border-t border-[#2a2a2d] flex items-center justify-between text-[10px] text-[#c1c6d9]">
                      <span>
                        {album.releaseDate
                          ? new Date(album.releaseDate).getFullYear()
                          : 'Album'}
                      </span>
                      {album.trackCount && <span>{album.trackCount} Tracks</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
