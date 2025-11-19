"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { NFTCard } from "@/components/nft/NFTCard";
import { TrendingUp, MapPin, Users, Award } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const stats = [
    { label: "Total NFTs", value: "24", icon: Award, color: "cyan" },
    { label: "Places Visited", value: "12", icon: MapPin, color: "blue" },
    { label: "Followers", value: "1.2K", icon: Users, color: "purple" },
    { label: "Total Value", value: "45.8", icon: TrendingUp, color: "emerald" },
  ];

  const mockNFTs = [
    {
      id: "mount-fuji-sunrise",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      title: "Mount Fuji Sunrise",
      location: "Japan",
      date: "March 15, 2025",
      verified: true,
      likes: 234,
      views: 1520,
    },
    {
      id: "paris-eiffel-tower",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
      title: "Paris Eiffel Tower",
      location: "France",
      date: "February 28, 2025",
      verified: true,
      likes: 189,
      views: 980,
    },
    {
      id: "bali-beach-sunset",
      image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9",
      title: "Bali Beach Sunset",
      location: "Indonesia",
      date: "January 10, 2025",
      verified: false,
      likes: 156,
      views: 720,
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
            Welcome back to your travel journey
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 lg:mb-8">
          {stats.map((stat) => (
            <Card key={stat.label} variant="glass" className="p-4 sm:!p-6">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-2 sm:gap-0">
                <div>
                  <p className="text-xs sm:text-sm text-slate-400 mb-1">
                    {stat.label}
                  </p>
                  <p className="text-xl sm:text-3xl font-bold text-white">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`p-2 sm:p-3 rounded-xl bg-${stat.color}-500/20`}
                >
                  <stat.icon
                    className={`w-4 h-4 sm:w-6 sm:h-6 text-${stat.color}-400`}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-6 lg:mb-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Link href="/mint" className="flex-1 sm:flex-initial">
            <Button variant="primary" size="lg" className="w-full">
              Mint New NFT
            </Button>
          </Link>
          <Link href="/marketplace" className="flex-1 sm:flex-initial">
            <Button variant="outline" size="lg" className="w-full">
              Explore Marketplace
            </Button>
          </Link>
        </div>

        {/* NFT Grid */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
            Your NFT Collection
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {mockNFTs.map((nft, index) => (
              <NFTCard key={index} {...nft} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
