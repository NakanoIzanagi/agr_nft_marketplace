import { FC, useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring'; // Import react-spring
import Moralis from 'moralis';
import { ThirdwebStorage } from '@thirdweb-dev/storage';
import Link from 'next/link';
import Head from 'next/head';
import Script from 'next/script';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { RequestAirdrop } from '../../components/RequestAirdrop';
import NftGallery from '../../utils/NftGallery';
import useUserSOLBalanceStore from '../../stores/useUserSOLBalanceStore';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
const clientId = process.env.NEXT_PUBLIC_CLIENT_ID || 'e4bf25023bdf97e6e26fb1939e9ae03d';
const apiKey = process.env.NEXT_PUBLIC_MORALIS_API_KEY || 'your-moralis-api-key';
const storage = new ThirdwebStorage({ clientId });

type NtfType = {
  associatedTokenAddress: string;
  mint: string;
  name: string;
  symbol: string;
  metadata?: any;
};

export const HomeView: FC = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [nfts, setNfts] = useState<NtfType[]>([]);
  const [isVisible, setIsVisible] = useState(false); // State to manage visibility
  const balance = useUserSOLBalanceStore((s) => s.balance);
  const { getUserSOLBalance } = useUserSOLBalanceStore();

  const toggleTerminal = () => setIsVisible(!isVisible);

  // React-spring animation
  const terminalProps = useSpring({
    display: isVisible ? 'block' : 'none',
    opacity: isVisible ? 1 : 0,
    // transform: isVisible ? 'translateX(0%)' : 'translateX(100%)',
  });

  // Fetch NFT metadata
  const fetchNftGallery = async () => {
    try {
      await Moralis.start({ apiKey });

      const response = await Moralis.SolApi.account.getNFTs({
        network: 'devnet',
        address: wallet.publicKey?.toBase58() || '',
      });

      if (response.raw.length > 0) {
        const results = await Promise.all(
          response.raw.map(async (nft) => {
            const nftInfo = await Moralis.SolApi.nft.getNFTMetadata({
              network: 'devnet',
              address: nft.mint,
            });

            try {
              const res = await storage.download(nftInfo.toJSON().metaplex.metadataUri);
              const metaData = await res.json();
              return { ...nftInfo.toJSON(), metaData };
            } catch (error) {
              console.error('Error downloading metadata:', error);
              return { ...nftInfo.toJSON() };
            }
          })
        );

        setNfts(results);
      }
    } catch (error) {
      console.error('Error fetching NFTs:', error);
    }
  };

  // Fetch user balance when wallet is connected
  useEffect(() => {
    if (wallet.publicKey) {
      getUserSOLBalance(wallet.publicKey, connection);
      // fetchNftGallery(); // Fetch NFTs after wallet is connected
    }
  }, [wallet.publicKey, connection, getUserSOLBalance]);

  // Log NFTs when they are updated
  useEffect(() => {
    if (nfts.length) {
      console.log(nfts);
    }
  }, [nfts]);

  // Initialize Jupiter when window is ready
  useEffect(() => {
    if (typeof window !== 'undefined' && window.Jupiter) {
      window.Jupiter.init({
        displayMode: 'integrated',
        integratedTargetId: 'integrated-terminal',
        endpoint: process.env.NEXT_PUBLIC_API_ENDPOINT,
        formProps: {
          fixedOutputMint: false,
        },
      });
    }
  }, [window.Jupiter]);

  return (
    <div className="flex flex-col items-center mt-10 px-4 py-8 pb-20 lg:pb-40 max-w-[1000px] w-full bg-gradient-to-b from-transparent via-black/50 to-black/20">
      <Head>
        <title>Agricultural NFT Marketplace</title>
        <meta name="description" content="Explore, mint, and collect agricultural NFTs on the Solana blockchain." />
      </Head>

      <h2 className="text-2xl font-bold text-center sm:text-3xl lg:text-4xl section-margin-x">
        Welcome to the Agricultural NFT Marketplace
      </h2>
      <p className="mt-2 text-sm text-center sm:mt-4 sm:text-base lg:text-lg section-margin-x">
        Explore, mint, and collect agricultural NFTs on the Solana blockchain.
      </p>
      <NftGallery nfts={nfts} />

      <div className="absolute mb-6 top-24 right-5">
        <button
          onClick={toggleTerminal}
          className="flex items-center justify-center w-12 h-12 transition-transform transform bg-[#242408] rounded-full shadow-lg hover:scale-105 focus:outline-none"
        >
          {isVisible ? (
            <BsChevronRight className="text-2xl text-white" />
          ) : (
            <BsChevronLeft className="text-2xl text-white" />
          )}
        </button>
      </div>

      <animated.div
        style={terminalProps}
        id="integrated-terminal"
        className="absolute z-50 p-4 ml-2 bg-white rounded-lg shadow-lg right-5 top-30">
        <Script src="https://terminal.jup.ag/main-v1.js" strategy="lazyOnload" />
      </animated.div>
      {/* <div className="flex flex-col mt-2">
        <RequestAirdrop />
        <h4 className="my-2 text-2xl md:w-full text-slate-300">
          {wallet &&
            <div className="flex flex-row justify-center">
              <div>{(balance || 0).toLocaleString()}</div>
              <div className="ml-2 text-slate-600">SOL</div>
            </div>
          }
        </h4>
      </div> */}
      <div className="flex flex-col items-center mt-10 text-white sm:mt-20 section-margin-x">
        <div className="w-full sm:w-[650px] text-center">
          <div className="css-1c2fuzs">
            <p className="pb-3 text-sm sm:pb-5 sm:text-xl">
              We are feeding the world, by providing a frictionless food supply chain marketplace that brings together all parties in the agri-food value chain.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
