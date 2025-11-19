"use client";

import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { MapPin, Heart, Eye, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface NFTCardProps {
  id?: string;
  image: string;
  title: string;
  location: string;
  date: string;
  verified: boolean;
  likes: number;
  views: number;
  price?: string;
  owner?: string;
  className?: string;
}

export function NFTCard({
  id,
  image,
  title,
  location,
  date,
  verified,
  likes,
  views,
  price,
  owner,
  className,
}: NFTCardProps) {
  const nftId = id || title.toLowerCase().replace(/\s+/g, "-");

  return (
    <Link href={`/nft/${nftId}`}>
      <Card
        variant="glass"
        hover
        className={cn("p-0 overflow-hidden group cursor-pointer", className)}
      >
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <div className="text-white">
              <p className="text-sm font-medium">View Details</p>
            </div>
          </div>

          {/* Trending badge */}
          {verified && (
            <div className="absolute top-3 right-3">
              <Badge variant="success" className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Trending
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Title & Location */}
          <div>
            <h3 className="font-semibold text-white text-lg mb-1">{title}</h3>
            <div className="flex items-center gap-1.5 text-slate-400 text-sm">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
          </div>

          {/* Date */}
          <p className="text-xs text-slate-500">{date}</p>

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <div className="flex items-center gap-1.5">
              <Heart className="w-4 h-4" />
              <span>{likes}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Eye className="w-4 h-4" />
              <span>{views}</span>
            </div>
          </div>

          {/* Price & Owner */}
          {price && (
            <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
              <div>
                <p className="text-xs text-slate-500">Price</p>
                <p className="font-semibold text-cyan-400">{price} SUI</p>
              </div>
              {owner && (
                <div className="text-right">
                  <p className="text-xs text-slate-500">Owner</p>
                  <p className="text-sm text-white">{owner}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}
