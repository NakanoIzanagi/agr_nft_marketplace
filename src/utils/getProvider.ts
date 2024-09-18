// utils/getProvider.ts
import { AnchorProvider, Wallet, web3 } from '@project-serum/anchor';
import { Connection } from '@solana/web3.js';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

export const getProvider = (connection: Connection) => {
  const wallet = useWallet();
  return new AnchorProvider(connection, wallet, { preflightCommitment: 'processed' });
};
