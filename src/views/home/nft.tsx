import { useWallet } from '@solana/wallet-adapter-react';
import { useState } from 'react';
import Image from 'next/image';
import { createNft, mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { createSignerFromKeypair, generateSigner, keypairIdentity, percentAmount } from '@metaplex-foundation/umi';
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { mockStorage } from '@metaplex-foundation/umi-storage-mock';
import secret from '../../components/wallet.json';
import 'react-toastify/dist/ReactToastify.css';
import { notifySuccess, notifyError } from '../../utils/notifications';
// Initialize Umi and Storage
const QUICKNODE_RPC = 'https://practical-cold-shard.solana-devnet.quiknode.pro/5ec27b3bf5cfa0ecd4e39d3f6af6a152198aea7c';
const umi = createUmi(QUICKNODE_RPC);
const clientId = "e4bf25023bdf97e6e26fb1939e9ae03d";
const storage = new ThirdwebStorage({ clientId });
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
  description: 'Pixel infrastructure for everyone!',
  imgType: 'image/png',
  attributes: [
    { trait_type: 'Speed', value: 'Quick' },
  ],
};

interface MintNFTProps {
  title: string;
  imgUrl: string;
}

const MintNFT = ({ title, imgUrl }: MintNFTProps) => {
  const { publicKey } = useWallet();
  const [minting, setMinting] = useState(false);
  const [message, setMessage] = useState('');

  const mintNft = async (metadataUri: string) => {
    try {
      if (!publicKey) {
        notifyError('Please connect your wallet first.');
        return;
      }
      setMinting(true);
      setMessage('');
      const mint = generateSigner(umi);
      await createNft(umi, {
        mint,
        name: nftDetail.name,
        symbol: nftDetail.symbol,
        uri: metadataUri,
        sellerFeeBasisPoints: percentAmount(nftDetail.royalties),
        creators: [{ address: creator.publicKey, verified: true, share: 100 }],
      }).sendAndConfirm(umi);
      notifySuccess('NFT Minted Successfully');
      // setMessage('Minting succeeded!');
      console.log(`Created NFT: ${mint.publicKey.toString()}`);
    } catch (error) {
      notifyError('Failed to mint NFT');
      // setMessage(`Minting failed: ${error.message}`);
    } finally {
      setMinting(false);
    }
  };

  return (
    <div className="p-6 transition-transform duration-300 ease-in-out transform bg-[#192c1a] rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl">
      <div className="relative">
        <Image
          src={imgUrl}
          alt={title}
          width={300} // Adjust the size as needed
          height={300} // Adjust the size as needed
          className="w-full rounded-t-lg"
        />
        <div className="absolute top-0 left-0 right-0 w-full h-full rounded-t-lg bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
      </div>
      <h3 className="mt-4 text-2xl font-bold text-white">{title}</h3>
      <p className="mt-2 text-gray-400">{nftDetail.description}</p>
      <button
        onClick={() => mintNft('ipfs://Qma9RNYhgw3cMS4ResWc5kmV4jvQizuFX1sfvWDQBdYZPG/0')}
        disabled={minting}
        className="px-6 py-3 mt-4 text-lg text-white transition-colors duration-300 bg-[#0a130a] rounded-lg shadow-md hover:bg-[#1a3b1a] disabled:bg-[#656965]"
      >
        {minting ? 'Minting...' : 'Mint NFT'}
      </button>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
};

export default MintNFT;
