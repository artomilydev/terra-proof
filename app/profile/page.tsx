"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { NFTCard } from "@/components/nft/NFTCard";
import { MapPin, Award, Heart, Settings, Share2 } from "lucide-react";

export default function ProfilePage() {
  const stats = [
    { label: "NFTs Owned", value: "24", icon: Award },
    { label: "Places Visited", value: "12", icon: MapPin },
    { label: "Total Likes", value: "2.4K", icon: Heart },
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
        {/* Profile Header */}
        <Card variant="gradient" className="mb-8">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-500" />

            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-white mb-1">
                    Travel Explorer
                  </h1>
                  <p className="text-slate-400 font-mono text-sm">
                    0x742d...4a3b
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="secondary" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                </div>
              </div>

              <p className="text-slate-300 mb-4">
                Passionate traveler collecting memories from around the world 🌍
              </p>

              <div className="flex gap-2">
                <Badge variant="info">Level 5 Explorer</Badge>
                <Badge variant="success">Verified</Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label} variant="glass" className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-cyan-500/20">
                  <stat.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* NFT Collection */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">My Collection</h2>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm">
                All
              </Button>
              <Button variant="ghost" size="sm">
                On Sale
              </Button>
              <Button variant="ghost" size="sm">
                Favorites
              </Button>
            </div>
          </div>

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
