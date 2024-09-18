import type { NextPage } from "next";
import { NftView } from "../../views";
import HeadContent from "components/HeadContent";
const { Connection, PublicKey,clusterApiUrl } = require('@solana/web3.js');
import { Program } from '@project-serum/anchor';
import idl from '../../../public/idl.json';
import { AnchorProvider, web3 } from '@project-serum/anchor';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';




const Whitepaper: NextPage = (props) => {
    async function fetchListedNfts() {
        const wallet = useWallet();
    
        let connection = new Connection(clusterApiUrl("devnet"));
        const provider = new AnchorProvider(connection, wallet, {});
    
    
        // Replace with your program ID
        const programId = new PublicKey('9yAxQ1szpE3ajaYSEtageTaF1bugC5JnT3sa1RNuFZ5y');
        const program = new Program(idl, programId, provider);
    
        // // Fetch all NFT listings
        const listings = await program.account.nftListing.all();
        console.log(listings);
    }
    fetchListedNfts();
    return (
        <div className="w-full h-screen bg-black">
            <HeadContent />
            ss
            <NftView />
        </div>
    );
};

export default Whitepaper;
