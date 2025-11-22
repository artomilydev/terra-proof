"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { Award, MapPin, Loader2, PlusCircle, Compass } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardPage() {
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

  // Calculate stats from real NFT data
  const stats = [
    { 
      label: "Total NFTs", 
      value: nfts.length.toString(), 
      icon: Award, 
      color: "cyan" 
    },
    { 
      label: "Places Visited", 
      value: new Set(nfts.map(nft => nft.location)).size.toString(), 
      icon: MapPin, 
      color: "blue" 
    },
  ];

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />

      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 lg:mb-8 mt-16 lg:mt-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Dashboard
          </h1>
          <p className="text-sm sm:text-base text-slate-400">
            {account ? (
              <span className="font-mono">
                {account.address.slice(0, 6)}...{account.address.slice(-4)}
              </span>
            ) : (
              "Connect your wallet to get started"
            )}
          </p>
        </div>

        {!account ? (
          <Card variant="glass" className="p-8 text-center">
            <h2 className="text-xl font-bold text-white mb-4">
              Connect Your Wallet
            </h2>
            <p className="text-slate-400 mb-6">
              Connect your Sui wallet to start minting and managing your travel proof NFTs
            </p>
          </Card>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-6 mb-6 lg:mb-8">
              {stats.map((stat) => (
                <Card key={stat.label} variant="glass" className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-2 sm:gap-0">
                    <div>
                      <p className="text-xs sm:text-sm text-slate-400 mb-1">
                        {stat.label}
                      </p>
                      <p className="text-xl sm:text-3xl font-bold text-white">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`p-2 sm:p-3 rounded-xl bg-${stat.color}-500/20`}>
                      <stat.icon className={`w-4 h-4 sm:w-6 sm:h-6 text-${stat.color}-400`} />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mb-6 lg:mb-8 grid grid-cols-2 gap-3 sm:gap-4">
              <Link href="/mint">
                <Button variant="primary" size="lg" className="w-full">
                  <PlusCircle className="w-5 h-5 mr-2" />
                  Mint New NFT
                </Button>
              </Link>
              <Link href="/marketplace">
                <Button variant="outline" size="lg" className="w-full">
                  <Compass className="w-5 h-5 mr-2" />
                  Explore Marketplace
                </Button>
              </Link>
            </div>

            {/* NFT Collection Preview */}
            <div>
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Your NFT Collection
                </h2>
                <Link href="/profile">
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </Link>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
                </div>
              ) : nfts.length === 0 ? (
                <Card variant="glass" className="p-8 text-center">
                  <p className="text-slate-400 mb-4">
                    You haven't minted any NFTs yet
                  </p>
                  <p className="text-sm text-slate-500 mb-6">
                    Start your journey by minting your first travel proof
                  </p>
                  <Link href="/mint">
                    <Button variant="primary">
                      <PlusCircle className="w-4 h-4 mr-2" />
                      Mint Your First NFT
                    </Button>
                  </Link>
                </Card>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {nfts.slice(0, 3).map((nft, index) => (
                    <Card key={index} variant="glass" className="p-4">
                      <div className="aspect-square bg-slate-800 rounded-lg mb-3">
                        {/* NFT Image will be displayed here */}
                      </div>
                      <h3 className="text-white font-semibold mb-1">{nft.name}</h3>
                      <p className="text-sm text-slate-400">{nft.location}</p>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
