import Image from 'next/image';
import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { createSignerFromKeypair, keypairIdentity, } from '@metaplex-foundation/umi';
import { mockStorage } from '@metaplex-foundation/umi-storage-mock';
import secret from '../../components/wallet.json';
import 'react-toastify/dist/ReactToastify.css';
// Initialize Umi and Storage
const QUICKNODE_RPC = 'https://practical-cold-shard.solana-devnet.quiknode.pro/5ec27b3bf5cfa0ecd4e39d3f6af6a152198aea7c';
const umi = createUmi(QUICKNODE_RPC);
const creatorWallet = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(secret));
const creator = createSignerFromKeypair(umi, creatorWallet);
umi.use(keypairIdentity(creator));
umi.use(mplTokenMetadata());
umi.use(mockStorage());


// NFT Details
const nftDetail = {
  name: "foodstamp",
  symbol: "20$",
  uri: "IPFS_URL_OF_METADATA",
  royalties: 5.5,
  description: '10$',
  imgType: 'image/png',
  attributes: [
    { trait_type: 'Speed', value: 'Quick' },
  ],
};

interface MintNFTProps {
  title: string;
  imgUrl: string;
}

const NFT1 = ({ title, imgUrl }: MintNFTProps) => {
  return (
    <div className="p-6 w-40 transition-transform duration-300 ease-in-out transform bg-[#192c1a] rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl">
      <div className="relative">
        <Image
          src='https://e4bf25023bdf97e6e26fb1939e9ae03d.ipfscdn.io/ipfs/QmfBxEvLt8iAEFWSkdABfo5RGf9uqJ2FBfV7GdPRCqoEZY/0/'
          alt={title}
          width={300} // Adjust the size as needed
          height={300} // Adjust the size as needed
          className="w-full rounded-t-lg"
        />
        <div className="absolute top-0 left-0 right-0 w-full h-full rounded-t-lg bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
      </div>
      <h3 className="mt-4 text-2xl font-bold text-white">{title}</h3>
      <p className="mt-2 text-gray-400">{nftDetail.description}</p>
      <div className='flex justify-end gap-3 pt-3'>
        <button>list</button>
      </div>
    </div>
  );
};

export default NFT1;
