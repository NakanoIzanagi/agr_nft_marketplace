import { FC } from 'react';
import { FaSearch, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
interface SearchBarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
  }
  
  const SearchBar: FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
      const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

    return (
        <div className="flex items-center mb-6">
        <input
          type="text"
          placeholder="Search NFTs..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <FaSearch className="ml-2 text-gray-500" />
      </div>
    );
  };
  
  export default SearchBar;
  