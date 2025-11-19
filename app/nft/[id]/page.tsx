"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  MapPin,
  Calendar,
  TrendingUp,
  Heart,
  Eye,
  Share2,
  ShoppingCart,
  ExternalLink,
  User,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function NFTDetailPage({ params }: { params: { id: string } }) {
  const [liked, setLiked] = useState(false);

  // Mock data - in real app, fetch based on params.id
  const nft = {
    id: params.id,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    title: "Mount Fuji Sunrise",
    description:
      "Captured this breathtaking moment at the summit of Mount Fuji during sunrise. The view was absolutely spectacular with clouds below and the first rays of sunlight painting the sky.",
    location: "Mount Fuji, Japan",
    coordinates: "35.3606° N, 138.7278° E",
    date: "March 15, 2025",
    verified: true,
    likes: 234,
    views: 1520,
    price: "12.5",
    owner: "0x742d...4a3b",
    ownerName: "Travel Explorer",
    minter: "0x742d...4a3b",
    mintDate: "March 16, 2025",
    tokenId: "#1234",
    blockchain: "Sui",
    category: "Mountain",
    verificationScore: 95,
    attributes: [
      { trait: "Category", value: "Mountain" },
      { trait: "Country", value: "Japan" },
      { trait: "Season", value: "Spring" },
      { trait: "Time of Day", value: "Sunrise" },
      { trait: "Verification Score", value: "95/100" },
    ],
  };

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />

      <main className="flex-1 lg:ml-64 mt-16 lg:mt-0 p-4 sm:p-6 lg:p-8">
        {/* Back Button */}
        <Link href="/marketplace">
          <Button variant="ghost" className="mb-4 sm:mb-6 text-sm sm:text-base">
            ← Back to Marketplace
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Left: Image */}
          <div className="space-y-4 sm:space-y-6">
            <Card variant="glass" className="p-0 overflow-hidden">
              <div className="relative aspect-square">
                <img
                  src={nft.image}
                  alt={nft.title}
                  className="w-full h-full object-cover"
                />
                {nft.verified && (
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                    <Badge
                      variant="success"
                      className="flex items-center gap-1"
                    >
                      <TrendingUp className="w-3 h-3" />
                      Trending
                    </Badge>
                  </div>
                )}
              </div>
            </Card>

            {/* Stats */}
            <Card variant="glass" className="p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
                Statistics
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Heart
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${
                      liked ? "text-red-400 fill-red-400" : "text-slate-400"
                    }`}
                  />
                  <div>
                    <p className="text-xs sm:text-sm text-slate-400">Likes</p>
                    <p className="text-lg sm:text-xl font-bold text-white">{nft.likes}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                  <div>
                    <p className="text-xs sm:text-sm text-slate-400">Views</p>
                    <p className="text-lg sm:text-xl font-bold text-white">{nft.views}</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right: Details */}
          <div className="space-y-4 sm:space-y-6">
            {/* Title & Actions */}
            <div>
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">
                    {nft.title}
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-400">{nft.tokenId}</p>
                </div>
                <div className="flex gap-1 sm:gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setLiked(!liked)}
                  >
                    <Heart
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${
                        liked ? "fill-red-400 text-red-400" : ""
                      }`}
                    />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-300 mb-4 sm:mb-6">{nft.description}</p>

              {/* Location & Date */}
              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                <div className="flex items-center gap-2 text-sm sm:text-base text-slate-300">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                  <span>{nft.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm sm:text-base text-slate-300">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                  <span>{nft.date}</span>
                </div>
              </div>
            </div>

            {/* Price & Buy */}
            <Card variant="gradient" className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div>
                  <p className="text-xs sm:text-sm text-slate-400 mb-1">Current Price</p>
                  <p className="text-2xl sm:text-3xl font-bold text-white">
                    {nft.price} SUI
                  </p>
                  <p className="text-xs sm:text-sm text-slate-500">≈ $42.50 USD</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Button variant="primary" size="lg" className="flex-1 w-full">
                  <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Buy Now
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Make Offer
                </Button>
              </div>
            </Card>

            {/* Owner Info */}
            <Card variant="glass" className="p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Owner</h3>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base font-semibold text-white truncate">{nft.ownerName}</p>
                  <p className="text-xs sm:text-sm text-slate-400 font-mono truncate">
                    {nft.owner}
                  </p>
                </div>
                <Link href="/profile">
                  <Button variant="ghost" size="sm">
                    <User className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">View Profile</span>
                    <span className="sm:hidden">View</span>
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Verification Details */}
            <Card variant="glass" className="p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
                Verification Details
              </h3>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                  <span className="text-xs sm:text-sm text-slate-400">Verification Score</span>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <div className="w-full sm:w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-linear-to-r from-cyan-500 to-emerald-500"
                        style={{ width: `${nft.verificationScore}%` }}
                      />
                    </div>
                    <span className="text-sm sm:text-base text-white font-semibold">
                      {nft.verificationScore}/100
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
                  <span className="text-slate-300">
                    GPS Coordinates Verified
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
                  <span className="text-slate-300">Timestamp Validated</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
                  <span className="text-slate-300">EXIF Data Verified</span>
                </div>
              </div>
            </Card>

            {/* Attributes */}
            <Card variant="glass" className="p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
                Attributes
              </h3>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {nft.attributes.map((attr, i) => (
                  <div
                    key={i}
                    className="p-2 sm:p-3 rounded-xl bg-slate-800/50 border border-slate-700"
                  >
                    <p className="text-xs text-slate-500 mb-1">{attr.trait}</p>
                    <p className="text-xs sm:text-sm font-semibold text-white">
                      {attr.value}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Blockchain Info */}
            <Card variant="glass" className="p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
                Blockchain Details
              </h3>
              <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Blockchain</span>
                  <span className="text-white font-medium">
                    {nft.blockchain}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Minted</span>
                  <span className="text-white">{nft.mintDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Minter</span>
                  <span className="text-white font-mono truncate max-w-[150px]">{nft.minter}</span>
                </div>
                <Button variant="ghost" size="sm" className="w-full mt-2 text-xs sm:text-sm">
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  View on Explorer
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
