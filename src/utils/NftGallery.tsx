import Head from 'next/head';
import { useState, useEffect } from 'react';
import MintNFT from '../views/home/nft';

export default function NFtGallery() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/getData')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  return (
    <div>

      <div className="container mx-auto mt-10 text-center">

        {/* <div>
          <h1>Data from JSON File</h1>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div> */}
        <div className="grid grid-cols-1 gap-8 mt-10 sm:grid-cols-2 lg:grid-cols-3">
          <MintNFT title="20$" imgUrl='https://e4bf25023bdf97e6e26fb1939e9ae03d.ipfscdn.io/ipfs/QmfBxEvLt8iAEFWSkdABfo5RGf9uqJ2FBfV7GdPRCqoEZY/0/' />
          <MintNFT title="50$" imgUrl='https://e4bf25023bdf97e6e26fb1939e9ae03d.ipfscdn.io/ipfs/QmfBxEvLt8iAEFWSkdABfo5RGf9uqJ2FBfV7GdPRCqoEZY/0/' />
          <MintNFT title="100$" imgUrl='https://e4bf25023bdf97e6e26fb1939e9ae03d.ipfscdn.io/ipfs/QmfBxEvLt8iAEFWSkdABfo5RGf9uqJ2FBfV7GdPRCqoEZY/0/' />
        </div>
      </div>
    </div>
  );
}
