'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSearch } from '../components/Navbar';

interface Podcast {
  collectionId: string | number;
  trackName: string;
  artistName: string;
  trackViewUrl: string;
  artworkUrl600: string;
  genre?: string;
  releaseDate?: string;
}

function mapTrendingEntry(entry: any): Podcast {
  return {
    collectionId: entry.id?.attributes?.['im:id'] || entry.id?.label || entry.id || Math.random(),
    trackName: entry['im:name']?.label || 'Unknown',
    artistName: entry['im:artist']?.label || 'Unknown',
    trackViewUrl: entry.link?.attributes?.href || entry.link?.[0]?.attributes?.href || '#',
    artworkUrl600: entry['im:image']?.[2]?.label || entry['im:image']?.[0]?.label || '',
    genre: entry.category?.attributes?.label,
    releaseDate: entry['im:releaseDate']?.label,
  };
}

export default function Home() {
  const { searchTerm } = useSearch();
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearching(false);
      setLoading(true);
      fetch('http://localhost:3000/trending')
        .then(res => res.json())
        .then(data => {
          // Map RSS feed entries to Podcast format
          const mapped = Array.isArray(data)
            ? data.map(mapTrendingEntry)
            : Array.isArray(data?.feed?.entry)
              ? data.feed.entry.map(mapTrendingEntry)
              : [];
          setPodcasts(mapped);
          setLoading(false);
        })
        .catch(() => {
          setPodcasts([]);
          setLoading(false);
        });
    } else {
      setLoading(true);
      setSearching(true);
      fetch(`http://localhost:3000/search?term=${encodeURIComponent(searchTerm)}`)
        .then(res => res.json())
        .then(data => {
          setPodcasts(data);
          setLoading(false);
        })
        .catch(() => {
          setPodcasts([]);
          setLoading(false);
        });
    }
  }, [searchTerm]);

  return (
    <div className="space-y-12">
      {/* Trending or Search Results */}
      <section>
        <h2 className="text-2xl font-bold mb-2">
          {searching ? `Results for "${searchTerm}"` : 'Trending podcasts in all genres'}
        </h2>
        <p className="text-gray-400 mb-4 text-sm">
          {searching
            ? 'Showing search results.'
            : 'The most popular podcasts overall now. Last updated 3 hours ago.'}
        </p>
        {loading ? (
          <div className="text-gray-400">Loading...</div>
        ) : podcasts.length === 0 ? (
          <div className="text-gray-400">No podcasts found.</div>
        ) : (
          <div className="flex gap-6 overflow-x-auto pb-2">
            {podcasts.slice(0, 10).map((podcast) => (
              <div key={podcast.collectionId} className="w-48 flex-shrink-0 bg-gray-900 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 w-full relative">
                  <Image
                    src={podcast.artworkUrl600}
                    alt={podcast.trackName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3">
                  <div className="font-semibold text-gray-100 truncate mb-1">{podcast.trackName}</div>
                  <div className="text-xs text-gray-400 truncate">{podcast.artistName}</div>
                  <a
                    href={podcast.trackViewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-blue-400 hover:text-blue-200 underline text-sm"
                  >
                    View Podcast
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Browse by Genre */}
      <section>
        <h2 className="text-2xl font-bold mb-2">Browse by genre</h2>
        <p className="text-gray-400 mb-4 text-sm">The most popular podcasts and episodes now categorized by genre. Last updated 3 hours ago.</p>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {['All genres', 'Arts', 'Comedy', 'Education', 'Kids & Family', 'TV & Film', 'Music'].map((genre) => (
            <div key={genre} className="w-40 h-24 flex-shrink-0 rounded-lg bg-gray-800 flex items-center justify-center text-lg font-semibold text-gray-200 border border-gray-700">
              {genre}
            </div>
          ))}
        </div>
      </section>

      {/* Promoted Podcasts */}
      <section>
        <h2 className="text-2xl font-bold mb-2">Promoted Podcasts</h2>
        <p className="text-gray-400 mb-4 text-sm">These podcasts are promoted by podcasters, listeners, and the Podbay team.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-900 rounded-lg shadow-md h-32 flex items-center justify-center text-gray-400">
              Promoted Podcast #{i + 1}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
