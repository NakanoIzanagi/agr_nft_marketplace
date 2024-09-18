import { Program, AnchorProvider, web3 } from '@project-serum/anchor';
import { Connection, PublicKey, Transaction } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, getAssociatedTokenAddress } from '@solana/spl-token';
import idl from '../../public/idl.json'; // IDL from your marketplace program

const { SystemProgram, Keypair } = web3;

export const listNFT = async (
  connection: Connection,
  wallet: any,
  nftMintAddress: string,
  price: number,
  creator: PublicKey,
  marketplaceProgramId: string
) => {
  const provider = new AnchorProvider(connection, wallet, {});
  const program = new Program(idl, marketplaceProgramId, provider);

  // Define the listing account
  const listingAccount = Keypair.generate();

  const tx = new Transaction();

  try {
    // Call the `list_nft` function from the marketplace program
    const txSignature = await program.methods
      .listNft(new PublicKey(nftMintAddress), price, 5) // royalty percentage is 5% here
      .accounts({
        listing: listingAccount.publicKey,
        seller: wallet.publicKey,
        creator: creator,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        sellerTokenAccount: await getAssociatedTokenAddress(
          new PublicKey(nftMintAddress),
          wallet.publicKey
        ),
        marketplaceEscrowAccount: await getEscrowAccountAddress(), // Optional if using escrow
      })
      .signers([listingAccount])
      .rpc();

    return txSignature;
  } catch (error) {
    console.error('Error listing NFT:', error);
    throw error;
  }
};
