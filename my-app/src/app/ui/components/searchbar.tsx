import { useState } from 'react';

interface SearchBarProps {
  data: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({ data }) => {
  const [query, setQuery] = useState<string>('');
  const [filteredData, setFilteredData] = useState<string[]>(data);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value.toLowerCase();
    setQuery(searchQuery);

    if (searchQuery === '') {
      // setFilteredData(data);  // If search bar is empty, show all data
    } else {
      const filtered = data.filter((item) =>
        item.toLowerCase().includes(searchQuery)
      );
      setFilteredData(filtered);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleSearch}
        style={{ padding: '8px', width: '300px', marginBottom: '20px' }}
      />

      <ul>
        {filteredData.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;