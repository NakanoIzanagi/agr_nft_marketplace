// Next, React
import { FC, useEffect, useState } from 'react';
import Moralis from 'moralis';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import NFT1 from './nft1';
const clientId = process.env.NEXT_PUBLIC_CLIENT_ID || 'e4bf25023bdf97e6e26fb1939e9ae03d';
const apiKey = process.env.NEXT_PUBLIC_MORALIS_API_KEY || 'your-moralis-api-key';

type NtfType = {
  associatedTokenAddress: string;
  mint: string;
  name: string;
  symbol: string;
  metadata?: any;
};
export const UsernftsView: FC = ({ }) => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [nfts, setNfts] = useState<NtfType[]>([]);


  // React-spring animation

  const fetchNftGallery = async () => {
    try {
      await Moralis.start({ apiKey });

      const response = await Moralis.SolApi.account.getNFTs({
        network: 'devnet',
        address: wallet.publicKey?.toBase58() || '',
      });
      console.log(wallet.publicKey?.toBase58() );
      
      // if (response.raw.length > 0) {
      //   const results = await Promise.all(
      //     response.raw.map(async (nft) => {
      //       const nftInfo = await Moralis.SolApi.nft.getNFTMetadata({
      //         network: 'devnet',
      //         address: nft.mint,
      //       });

      //       try {
      //         const res = await storage.download(nftInfo.toJSON().metaplex.metadataUri);
      //         const metaData = await res.json();
      //         return { ...nftInfo.toJSON(), metaData };
      //       } catch (error) {
      //         console.error('Error downloading metadata:', error);
      //         return { ...nftInfo.toJSON() };
      //       }
      //     })
      //   );
      //   console.log(results);
        
      //   setNfts(results);
      // }
        setNfts(response.raw);

    } catch (error) {
      console.error('Error fetching NFTs:', error);
    }
  };

  // Fetch user balance when wallet is connected
  useEffect(() => {
    if (wallet.publicKey) {
      fetchNftGallery(); // Fetch NFTs after wallet is connected
    }
  }, [wallet.publicKey, connection]);

  return (

    <div className="flex flex-col items-center w-full px-6 py-12 pb-40 mt-10 bg-gradient-to-b from-transparent via-black/50 to-black/20">
      <div className="container px-6 mx-auto text-center">
        <h1 className="mb-12 text-5xl font-bold">NFTs</h1>
        <div className="grid grid-cols-1 gap-8 mt-10 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">

        {nfts.map((nft) => (
          <NFT1 key={nft.associatedTokenAddress} title={nft.name} imgUrl={nft.symbol} />
        ))}
        </div>

      </div>
    </div>

  );
};
