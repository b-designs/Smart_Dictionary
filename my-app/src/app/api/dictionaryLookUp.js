// components/DictionaryLookup.js
import { useState } from 'react';

export default function DictionaryLookup() {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!word) return;

    try {
      const res = await fetch(`/api/dictionary?word=${word}`);
      const data = await res.json();

      if (res.ok) {
        setDefinition(data);
        setError(null);
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Failed to fetch data');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        placeholder="Enter a word"
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p>{error}</p>}
      {definition && (
        <div>
          <h3>Definition:</h3>
          <pre>{JSON.stringify(definition, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}