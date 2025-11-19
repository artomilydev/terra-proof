"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { NFTCard } from "@/components/nft/NFTCard";
import { TrendingUp, MapPin, Users, Award } from "lucide-react";

export default function DashboardPage() {
  const stats = [
    { label: "Total NFTs", value: "24", icon: Award, color: "cyan" },
    { label: "Places Visited", value: "12", icon: MapPin, color: "blue" },
    { label: "Followers", value: "1.2K", icon: Users, color: "purple" },
    { label: "Total Value", value: "45.8", icon: TrendingUp, color: "emerald" },
  ];

  const mockNFTs = [
    {
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      title: "Mount Fuji Sunrise",
      location: "Japan",
      date: "March 15, 2025",
      verified: true,
      likes: 234,
      views: 1520,
    },
    {
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
      title: "Paris Eiffel Tower",
      location: "France",
      date: "February 28, 2025",
      verified: true,
      likes: 189,
      views: 980,
    },
    {
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

      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-slate-400">Welcome back to your travel journey</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label} variant="glass" className="!p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-400 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl bg-${stat.color}-500/20`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8 flex gap-4">
          <Button variant="primary" size="lg">
            Mint New NFT
          </Button>
          <Button variant="outline" size="lg">
            Explore Marketplace
          </Button>
        </div>

        {/* NFT Grid */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">
            Your NFT Collection
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockNFTs.map((nft, index) => (
              <NFTCard key={index} {...nft} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
