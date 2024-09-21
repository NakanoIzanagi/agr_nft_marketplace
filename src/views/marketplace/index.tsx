// Next, React
import type { NextPage } from "next";

import { useEffect, useState } from "react";
import { Spinner, Input, Box, Flex, Button, Heading, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
type NftListing = {
  token_id: string;
  price: number;
  creator: string;
  royalty_percentage: number;
  seller: string;
  is_sold: boolean;
};
const NFT_LISTINGS_PER_PAGE = 24; // Adjust number of listings per page
type NtfType = {
  associatedTokenAddress: string;
  mint: string;
  name: string;
  symbol: string;
  metadata?: any;
};
export const UsernftsView: FC = ({ }) => {
  const [listings, setListings] = useState<NftListing[]>([]);
  const [filteredListings, setFilteredListings] = useState<NftListing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);


  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch('/api/fetchListings');
        const data = await res.json();
        if (data.success) {
          setListings(data.data);
          setFilteredListings(data.data);
        } else {
          setError('Failed to fetch listings');
        }
      } catch (err) {
        setError('Error fetching listings');
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);
  useEffect(() => {
    const filtered = listings.filter(
      (listing) =>
        listing.token_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.creator.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.seller.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredListings(filtered);
    setCurrentPage(1); // Reset to the first page when filtering
  }, [searchTerm, listings]);

  // Handle search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Paginate listings
  const totalPages = Math.ceil(filteredListings.length / NFT_LISTINGS_PER_PAGE);
  const currentListings = filteredListings.slice(
    (currentPage - 1) * NFT_LISTINGS_PER_PAGE,
    currentPage * NFT_LISTINGS_PER_PAGE
  );

  const handlePageChange = (direction: "next" | "prev") => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-black ">
        <Spinner size="xl" /> {/* Loading spinner */}
        <p className="ml-4">Loading listings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-black ">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (

    <div className="flex flex-col items-center w-full px-4 py-8 pb-20 mt-10 lg:pb-40 bg-gradient-to-b from-transparent via-black/80 to-black/30">


    <Box w="full" h="full" minH="100vh" bg="gray.900" p={4}>
      <Heading color="white" textAlign="center" mb={4}>
        <h1 className="mb-8 text-4xl font-bold text-center">NFT Listings</h1>
      </Heading>


      <div className="flex rounded-full border-2 border-blue-500 overflow-hidden max-w-md mx-auto font-[sans-serif]">
        <input type="email" onChange={handleSearch} value={searchTerm} placeholder="earch by Token ID, Creator, or Seller"
          className="w-full px-5 py-3 text-sm bg-white outline-none" />
        <button type='button' className="flex items-center justify-center px-6 bg-[#0c3a10] hover:bg-[#193a19]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="18px" className="fill-white">
            <path
              d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
            </path>
          </svg>
        </button>
      </div>
      <div className="container px-4 py-10 mx-auto">
        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {currentListings.map((listing) => (
            <motion.div
              key={listing.token_id}
              className="p-6 transition-all duration-300 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700"
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-lg font-semibold">Token ID: {listing.token_id}</p>
              <p className="text-sm">Price: {listing.price} Lamports</p>
              <p className="text-sm">Creator: {listing.creator}</p>
              <p className="text-sm">Royalty: {listing.royalty_percentage}%</p>
              <p className="text-sm">Seller: {listing.seller}</p>
              <p className={`text-sm ${listing.is_sold ? 'text-red-500' : 'text-green-500'}`}>
                Status: {listing.is_sold ? "Sold" : "Available"}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-l-lg border border-gray-500 transition-colors duration-300 ${currentPage === 1
              ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
              : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
        >
          Previous
        </button>

        <div className="flex items-center px-4 py-2 text-white bg-gray-800">
          Page {currentPage} of {totalPages}
        </div>

        <button
          onClick={() => handlePageChange("next")}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-r-lg border border-gray-500 transition-colors duration-300 ${currentPage === totalPages
              ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
              : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
        >
          Next
        </button>
      </div>

      {/* Include the NftView component for additional content */}
    </Box>
    {/* {nfts.map((nft) => (
            <NFT1 key={nft.associatedTokenAddress} title={nft.name} imgUrl={nft.symbol} />
          ))} */}
  </div>
  );
};
