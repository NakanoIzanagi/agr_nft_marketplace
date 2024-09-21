// api/nfts.ts
import { NextApiRequest, NextApiResponse } from 'next';
import Moralis from 'moralis';

const apiKey = process.env.NEXT_PUBLIC_MORALIS_API_KEY || 'your-moralis-api-key';

// Initialize Moralis once

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
 await Moralis.start({ apiKey });

  if (req.method === 'POST') {
    const { walletAddress } = req.body;

    if (!walletAddress) {
      return res.status(400).json({ error: 'Wallet address is required' });
    }

    try {
      const response = await Moralis.SolApi.account.getNFTs({
        network: 'devnet',
        address: walletAddress,
      });

      // Optionally, fetch additional metadata for NFTs here if needed
      const nfts = response.raw;
      return res.status(200).json({ nfts });
    } catch (error) {
      console.error('Error fetching NFTs:', error);
      return res.status(500).json({ error: 'Failed to fetch NFTs' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
