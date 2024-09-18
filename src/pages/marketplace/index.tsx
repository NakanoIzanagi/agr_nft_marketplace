import type { NextPage } from "next";
import { NftView } from "../../views";
import HeadContent from "components/HeadContent";


// type NftListing = {
//     token_id: string;
//     price: number;
//     creator: string;
//     royalty_percentage: number;
//     seller: string;
//     is_sold: boolean;
//   };

const Whitepaper: NextPage = (props) => {
    // async function fetchListedNfts() {
    //     const wallet = useWallet();
    
    //     let connection = new Connection(clusterApiUrl("devnet"));
    //     const provider = new AnchorProvider(connection, wallet, {});
    
    
    //     // Replace with your program ID
    //     const programId = new PublicKey('9yAxQ1szpE3ajaYSEtageTaF1bugC5JnT3sa1RNuFZ5y');
    //     const program = new Program(idl, programId, provider);
    
    //     // // Fetch all NFT listings
    //     const listings = await program.account.nftListing.all();
    //     const formattedListings: NftListing[] = listings.map((listing: any) => ({
    //         token_id: listing.account.tokenId.toBase58(),
    //         price: listing.account.price.toNumber(),
    //         creator: listing.account.creator.toBase58(),
    //         royalty_percentage: listing.account.royaltyPercentage,
    //         seller: listing.account.seller.toBase58(),
    //         is_sold: listing.account.isSold,
    //       }));
    //     console.log(formattedListings);
    // }
    // fetchListedNfts();
    return (
        <div className="w-full h-screen bg-black">
            <HeadContent />
            ss
            <NftView />
        </div>
    );
};

export default Whitepaper;
