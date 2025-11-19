"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Upload,
  MapPin,
  Calendar,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";

export default function MintPage() {
  const [score, setScore] = useState(85);

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />

      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 lg:mb-8 mt-16 lg:mt-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Mint Travel Proof NFT
          </h1>
          <p className="text-sm sm:text-base text-slate-400">
            Upload your travel photo and create a trending NFT
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Upload & Form */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Upload Area */}
            <Card variant="glass" className="p-4 sm:p-6 lg:p-8">
              <div className="border-2 border-dashed border-slate-700 rounded-2xl p-6 sm:p-8 lg:p-12 text-center hover:border-cyan-500/50 transition-colors cursor-pointer">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-cyan-500/20 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                  Upload Travel Photo
                </h3>
                <p className="text-sm sm:text-base text-slate-400 mb-3 sm:mb-4">
                  Drag and drop or click to browse
                </p>
                <p className="text-xs sm:text-sm text-slate-500">
                  Supported: JPG, PNG, GIF (Max 10MB)
                </p>
              </div>
            </Card>

            {/* Metadata Form */}
            <Card variant="glass" className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">
                NFT Details
              </h3>

              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2">
                    Title
                  </label>
                  <Input placeholder="e.g., Mount Fuji Sunrise" />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2">
                    Description
                  </label>
                  <textarea
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none text-sm sm:text-base"
                    rows={4}
                    placeholder="Describe your travel experience..."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                      Location
                    </label>
                    <Input placeholder="e.g., Tokyo, Japan" />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                      Date
                    </label>
                    <Input type="date" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2">
                    Category
                  </label>
                  <select className="w-full px-4 py-3 bg-slate-800 border border-slate-700 text-white rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm sm:text-base">
                    <option>Beach</option>
                    <option>Mountain</option>
                    <option>City</option>
                    <option>Forest</option>
                    <option>Desert</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2">
                    Price (SUI)
                  </label>
                  <Input type="number" placeholder="0.00" step="0.1" />
                </div>
              </div>
            </Card>
          </div>

          {/* Verification Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Verification Score */}
            <Card variant="gradient" className="p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-4">
                Verification Score
              </h3>

              <div className="relative mb-4 sm:mb-6">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 sm:border-8 border-slate-700 mx-auto flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-3xl sm:text-4xl font-bold text-cyan-400">{score}</p>
                    <p className="text-xs text-slate-400">/ 100</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
                  <span className="text-slate-300">Location trending</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
                  <span className="text-slate-300">Timestamp validated</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400" />
                  <span className="text-slate-300">Image quality check</span>
                </div>
              </div>
            </Card>

            {/* Preview */}
            <Card variant="glass" className="p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-4">
                <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
                Preview
              </h3>

              <div className="aspect-square rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-4">
                <p className="text-sm sm:text-base text-slate-500">No image uploaded</p>
              </div>

              <Badge variant="info" className="w-full justify-center text-xs sm:text-sm">
                Upload photo to preview
              </Badge>
            </Card>

            {/* Mint Button */}
            <Button variant="primary" size="lg" className="w-full">
              Mint NFT
            </Button>

            <p className="text-xs text-slate-500 text-center">
              By minting, you agree to our terms and conditions
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
