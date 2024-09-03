// Next, React
import { FC, useEffect, useState, useMemo } from 'react';
import SearchBar from './searchBar';
import NFtGallery from 'utils/NftGallery';
import Pagination from './pagination';

type NtfType = {
  associatedTokenAddress: string;
  mint: string;
  name: string;
  symbol: string;
  metadata?: any;
};
export const NftView: FC = ({ }) => {

  const [nfts, setNfts] = useState<NtfType[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Set the number of items per page
  // Search Functionality
  const filteredNfts = useMemo(() => {
    return nfts.filter((nft) =>
      nft.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, nfts]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredNfts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (

    <div className="flex flex-col items-center mt-10 px-4 py-8 pb-20 lg:pb-40 max-w-[1000px] w-full bg-gradient-to-b from-transparent via-black/50 to-black/20">
      {/* <div className="container p-6 mx-auto rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold">NFT</h1>
        <p className="mt-4 text-lg">
          Browse agricultural NFTs.
        </p>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <NFtGallery nfts={currentItems} />
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={filteredNfts.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div> */}
    </div>
  );
};
