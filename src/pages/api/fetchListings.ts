// pages/api/fetchListings.ts
import { NextApiRequest, NextApiResponse } from 'next';
const { Connection, PublicKey,clusterApiUrl } = require('@solana/web3.js');
import { Program } from '@project-serum/anchor';
import idl from '../../../public/idl.json';
import { AnchorProvider, web3 } from '@project-serum/anchor';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

type NftListing = {
  token_id: string;
  price: number;
  creator: string;
  royalty_percentage: number;
  seller: string;
  is_sold: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Connection to Solana Devnet
    const wallet = useWallet();
    
    let connection = new Connection(clusterApiUrl("devnet"));
    const provider = new AnchorProvider(connection, wallet, {});


    // Replace with your program ID
    const programId = new PublicKey('9yAxQ1szpE3ajaYSEtageTaF1bugC5JnT3sa1RNuFZ5y');
    const program = new Program(idl, programId, provider);

    // Fetch all NFT listings
    const listings = await program.account.nftListing.all();

    const formattedListings: NftListing[] = listings.map((listing: any) => ({
      token_id: listing.account.tokenId.toBase58(),
      price: listing.account.price.toNumber(),
      creator: listing.account.creator.toBase58(),
      royalty_percentage: listing.account.royaltyPercentage,
      seller: listing.account.seller.toBase58(),
      is_sold: listing.account.isSold,
    }));

    res.status(200).json({ success: true, data: formattedListings });
  } catch (error) {
    console.error('Error fetching listings:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}
