
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function SearchBar() {
  const [word, setWord] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSearch = async () => {
    if (!word) return;
    
    try {
      const res = await fetch(`/api/dictionary?word=${word}`);
      const data = await res.json();

      if (res.ok) {
        router.push(`/dictionary/results?word=${word}`);
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Failed to fetch data');
    }
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-lg p-2 bg-white w-full max-w-md">
      <button onClick={handleSearch} style={{ cursor: 'pointer' }}>
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 ml-1" />
      </button>

      <input
        type="text"
        placeholder="Search..."
        value={word}
        onChange={(e) => setWord(e.target.value)}
        className="flex-grow outline-none border-none text-gray-600 ml-2"
      />

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}