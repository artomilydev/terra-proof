"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { Card } from "@/components/ui/Card";
import { NFTCard } from "@/components/nft/NFTCard";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { Award, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const account = useCurrentAccount();
  const [nfts, setNfts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserNFTs() {
      if (!account?.address) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // TODO: Implement getOwnedNFTs from @/lib/sui/nft
        // const userNFTs = await getOwnedNFTs(account.address);
        // setNfts(userNFTs);
        
        // Temporary: empty array until blockchain integration
        setNfts([]);
      } catch (error) {
        console.error("Error fetching NFTs:", error);
        setNfts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchUserNFTs();
  }, [account?.address]);

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />

      <main className="flex-1 lg:ml-64 mt-16 lg:mt-0 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            My NFT Collection
          </h1>
          <p className="text-sm sm:text-base text-slate-400">
            {account ? (
              <span className="font-mono">
                {account.address.slice(0, 6)}...{account.address.slice(-4)}
              </span>
            ) : (
              "Connect wallet to view your NFTs"
            )}
          </p>
        </div>

        {/* Stats Card */}
        {account && (
          <Card variant="glass" className="p-6 mb-6 sm:mb-8">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-cyan-500/20">
                <Award className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Total NFTs Owned</p>
                <p className="text-3xl font-bold text-white">{nfts.length}</p>
              </div>
            </div>
          </Card>
        )}

        {/* NFT Collection */}
        {!account ? (
          <Card variant="glass" className="p-8 text-center">
            <p className="text-slate-400 mb-4">
              Please connect your Sui wallet to view your NFT collection
            </p>
          </Card>
        ) : loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
          </div>
        ) : nfts.length === 0 ? (
          <Card variant="glass" className="p-8 text-center">
            <p className="text-slate-400 mb-4">
              You don't have any NFTs yet
            </p>
            <p className="text-sm text-slate-500">
              Start minting your travel proofs to build your collection
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {nfts.map((nft, index) => (
              <NFTCard key={index} {...nft} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
