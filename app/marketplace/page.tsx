"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { NFTCard } from "@/components/nft/NFTCard";
import { Filter, TrendingUp, MapPin } from "lucide-react";

export default function MarketplacePage() {
  const categories = ["All", "Beach", "Mountain", "City", "Forest", "Desert"];

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
      price: "12.5",
      owner: "0x742d...4a3b",
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
      price: "8.3",
      owner: "0x9a2c...7d1e",
    },
    {
      id: "bali-beach-sunset",
      image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9",
      title: "Bali Beach Sunset",
      location: "Indonesia",
      date: "January 10, 2025",
      verified: true,
      likes: 156,
      views: 720,
      price: "5.7",
      owner: "0x3f8b...2c9a",
    },
    {
      id: "swiss-alps",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
      title: "Swiss Alps",
      location: "Switzerland",
      date: "December 5, 2024",
      verified: false,
      likes: 203,
      views: 1120,
      price: "15.2",
      owner: "0x5d1a...8e4f",
    },
    {
      id: "santorini-sunset",
      image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1",
      title: "Santorini Sunset",
      location: "Greece",
      date: "November 20, 2024",
      verified: true,
      likes: 312,
      views: 1890,
      price: "18.9",
      owner: "0x7c3e...9b2d",
    },
    {
      id: "new-zealand-peak",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
      title: "New Zealand Peak",
      location: "New Zealand",
      date: "October 15, 2024",
      verified: true,
      likes: 178,
      views: 920,
      price: "11.4",
      owner: "0x2a9f...6c1b",
    },
  ];

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />

      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 lg:mb-8 mt-16 lg:mt-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Marketplace</h1>
          <p className="text-sm sm:text-base text-slate-400">
            Discover and collect unique travel proof NFTs
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-6 lg:mb-8 space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1">
              <Input
                variant="search"
                icon
                placeholder="Search NFTs by location, title..."
              />
            </div>
            <Button variant="secondary" className="w-full sm:w-auto">
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </Button>
          </div>

          {/* Categories */}
          <div className="flex gap-2 sm:gap-3 flex-wrap">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={category === "All" ? "info" : "default"}
                className="cursor-pointer hover:bg-cyan-500/30 transition-colors text-xs sm:text-sm"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 lg:mb-8">
          <Card variant="glass" className="p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />
              <div>
                <p className="text-xs sm:text-sm text-slate-400">Floor Price</p>
                <p className="text-xl sm:text-2xl font-bold text-white">5.2 SUI</p>
              </div>
            </div>
          </Card>

          <Card variant="glass" className="p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
              <div>
                <p className="text-xs sm:text-sm text-slate-400">Total Listings</p>
                <p className="text-xl sm:text-2xl font-bold text-white">2,847</p>
              </div>
            </div>
          </Card>

          <Card variant="glass" className="p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400" />
              <div>
                <p className="text-xs sm:text-sm text-slate-400">24h Volume</p>
                <p className="text-xl sm:text-2xl font-bold text-white">1,234 SUI</p>
              </div>
            </div>
          </Card>
        </div>

        {/* NFT Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {mockNFTs.map((nft, index) => (
            <NFTCard key={index} {...nft} />
          ))}
        </div>

        {/* Load More */}
        <div className="mt-6 lg:mt-8 text-center">
          <Button variant="outline" size="lg" className="w-full sm:w-auto">
            Load More
          </Button>
        </div>
      </main>
    </div>
  );
}
