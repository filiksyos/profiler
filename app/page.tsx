'use client';

import { useState } from 'react';
import SearchBar from '@/components/search-bar';
import WikiProfile from '@/components/wiki-profile';
import LoadingSkeleton from '@/components/loading-skeleton';
import { ProfileData } from '@/lib/types';

export default function Home() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    setProfile(null);

    try {
      // First, search the web for information
      const searchResponse = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      if (!searchResponse.ok) {
        throw new Error('Search failed');
      }

      const searchData = await searchResponse.json();

      // Then, generate profile from search results
      const profileResponse = await fetch('/api/generate-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: query,
          searchResults: searchData.results 
        }),
      });

      if (!profileResponse.ok) {
        throw new Error('Profile generation failed');
      }

      const profileData = await profileResponse.json();
      setProfile(profileData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-2">Profiler</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Generate AI-powered personality wiki profiles
          </p>
          <SearchBar onSearch={handleSearch} isLoading={loading} />
        </div>
      </header>

      <main className="wiki-container">
        {error && (
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading && <LoadingSkeleton />}
        {profile && !loading && <WikiProfile profile={profile} />}
        
        {!loading && !profile && !error && (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Search for someone to generate their personality profile
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
