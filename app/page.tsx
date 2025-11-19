"use client";

import Link from "next/link";
import {
  Globe,
  Shield,
  ArrowRight,
  MapPin,
  CheckCircle,
  Zap,
  TrendingUp,
  Lock,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/Lamp";
import { HoverEffect } from "@/components/ui/CardHoverEffect";
import { BackgroundGradient } from "@/components/ui/BackgroundGradient";
import { SparklesCore } from "@/components/ui/SparklesCore";
import {
  GlowingStarsBackgroundCard,
  GlowingStarsDescription,
  GlowingStarsTitle,
} from "@/components/ui/GlowingStars";
import { DraggableCardStack } from "@/components/ui/DraggableCards";
import Image from "next/image";

export default function Home() {
  const trendingNFTs = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      title: "Mount Fuji Sunrise",
      location: "Japan",
      owner: "@traveler_01",
      price: "12.5",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
      title: "Eiffel Tower Night",
      location: "Paris, France",
      owner: "@explorer_42",
      price: "8.3",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9",
      title: "Bali Beach Sunset",
      location: "Bali, Indonesia",
      owner: "@wanderlust",
      price: "15.2",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
      title: "New York Skyline",
      location: "New York, USA",
      owner: "@citylights",
      price: "10.8",
    },
  ];

  const features = [
    {
      title: "Blockchain Verified",
      description:
        "Every travel proof is permanently stored on Sui blockchain with cryptographic verification.",
      icon: <Shield className="w-6 h-6" />,
    },
    {
      title: "GPS Authentication",
      description:
        "Automatic location verification using GPS coordinates and EXIF data from your photos.",
      icon: <MapPin className="w-6 h-6" />,
    },
    {
      title: "Instant Minting",
      description:
        "Mint your travel NFTs in seconds with our streamlined process and low gas fees.",
      icon: <Zap className="w-6 h-6" />,
    },
    {
      title: "Trending Proofs",
      description:
        "Showcase verified travels, gain recognition, and trade your unique experiences.",
      icon: <TrendingUp className="w-6 h-6" />,
    },
    {
      title: "Decentralized Storage",
      description:
        "Photos stored permanently on Walrus, ensuring your memories are never lost.",
      icon: <Lock className="w-6 h-6" />,
    },
    {
      title: "Smart Verification",
      description:
        "AI-powered verification system scores your proof authenticity from 0-100.",
      icon: <Sparkles className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-slate-900/50 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/50">
              <Image
                src="/logo.svg"
                alt="TerraProof Logo"
                width={32}
                height={32}
              />
            </div>
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              TerraProof
            </span>
          </Link>
          <Link
            href="/dashboard"
            className="px-4 py-2 sm:px-6 text-sm sm:text-base bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
          >
            Launch App
          </Link>
        </div>
      </header>

      {/* Hero Section with Lamp Effect */}
      <div className="mt-20">
        <LampContainer>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-cyan-500/30 rounded-full mb-8 backdrop-blur-sm">
              <span className="text-xs sm:text-sm font-medium text-cyan-400">
                Built on Sui & Walrus • Trending Travel Proofs
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Your Journey,
              <br />
              Permanently Proven
            </h1>

            <p className="text-base sm:text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto px-4">
              Turn your travel moments into verifiable digital assets. Mint,
              trade, and collect authenticated travel proofs on the blockchain.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link
                href="/dashboard"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl text-base sm:text-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 inline-flex items-center justify-center gap-2"
              >
                Start Minting
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
              <Link
                href="/marketplace"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-slate-800/50 border border-slate-700 text-cyan-400 rounded-xl text-base sm:text-lg font-semibold hover:border-cyan-500/50 transition-all duration-300 inline-flex items-center justify-center gap-2 backdrop-blur-sm"
              >
                Explore Marketplace
              </Link>
            </div>
          </motion.div>
        </LampContainer>
      </div>

      {/* Features Section with Hover Effect */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 relative">
        <div className="absolute inset-0 w-full h-full">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={50}
            className="w-full h-full"
            particleColor="#06b6d4"
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Why TerraProof?
            </h2>
            <p className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto px-4">
              Cutting-edge technology meets authentic travel experiences
            </p>
          </motion.div>

          <HoverEffect items={features} className="gap-4 sm:gap-6" />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto px-4">
              Three simple steps to turn your travel moments into trending
              digital assets
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Step 1 */}
            <GlowingStarsBackgroundCard className="p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gradient-to-br from-cyan-500 to-blue-500 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/50">
                  <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <span className="text-3xl sm:text-4xl font-bold text-cyan-400">
                  01
                </span>
              </div>
              <GlowingStarsTitle className="mb-3 sm:mb-4">
                Upload Your Proof
              </GlowingStarsTitle>
              <GlowingStarsDescription>
                Take a photo of your boarding pass, hotel confirmation, or
                capture a geo-tagged moment from your mobile device.
              </GlowingStarsDescription>
            </GlowingStarsBackgroundCard>

            {/* Step 2 */}
            <GlowingStarsBackgroundCard className="p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/50">
                  <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <span className="text-3xl sm:text-4xl font-bold text-blue-400">
                  02
                </span>
              </div>
              <GlowingStarsTitle className="mb-3 sm:mb-4">
                Verify Authenticity
              </GlowingStarsTitle>
              <GlowingStarsDescription>
                Our system automatically extracts GPS, timestamp, and EXIF data
                to calculate a verification score (0-100).
              </GlowingStarsDescription>
            </GlowingStarsBackgroundCard>

            {/* Step 3 */}
            <GlowingStarsBackgroundCard className="p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gradient-to-br from-purple-500 to-cyan-500 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/50">
                  <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <span className="text-3xl sm:text-4xl font-bold text-purple-400">
                  03
                </span>
              </div>
              <GlowingStarsTitle className="mb-3 sm:mb-4">
                Mint as NFT
              </GlowingStarsTitle>
              <GlowingStarsDescription>
                Your proof is minted on Sui blockchain, stored permanently on
                Walrus, and ready to trade or showcase.
              </GlowingStarsDescription>
            </GlowingStarsBackgroundCard>
          </div>
        </div>
      </section>

      {/* Trending NFTs - Draggable Cards */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <SparklesCore
            id="tsparticles-trending"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={30}
            className="w-full h-full"
            particleColor="#06b6d4"
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Trending Travel Proofs
            </h2>
            <p className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto px-4">
              Drag to explore verified NFTs from our community. Swipe away to
              see the next!
            </p>
          </motion.div>

          <div className="flex items-center justify-center mb-8">
            <DraggableCardStack items={trendingNFTs} />
          </div>

          <div className="text-center">
            <Link
              href="/marketplace"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-slate-800/50 border border-slate-700 text-cyan-400 rounded-xl text-base sm:text-lg font-semibold hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 backdrop-blur-sm"
            >
              View All NFTs
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl text-center"
            >
              <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                1,234
              </div>
              <div className="text-sm sm:text-base text-slate-400">
                Proofs Minted
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl text-center"
            >
              <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                567
              </div>
              <div className="text-sm sm:text-base text-slate-400">
                Active Travelers
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl text-center"
            >
              <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                89
              </div>
              <div className="text-sm sm:text-base text-slate-400">
                Countries Covered
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_50%)]" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 sm:mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-base sm:text-xl text-slate-400 mb-6 sm:mb-8 px-4">
            Join thousands of travelers turning their adventures into trending
            digital assets
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl text-base sm:text-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
          >
            Mint Your First Proof
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 border-t border-slate-800 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* About */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  TerraProof
                </span>
              </div>
              <p className="text-sm text-slate-400">
                Turn your travel moments into verifiable digital assets on the
                blockchain.
              </p>
            </div>

            {/* Product */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold text-sm">Product</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/marketplace"
                    className="text-slate-400 hover:text-cyan-400 text-sm transition-colors"
                  >
                    Marketplace
                  </Link>
                </li>
                <li>
                  <Link
                    href="/mint"
                    className="text-slate-400 hover:text-cyan-400 text-sm transition-colors"
                  >
                    Mint NFT
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard"
                    className="text-slate-400 hover:text-cyan-400 text-sm transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold text-sm">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-cyan-400 text-sm transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-cyan-400 text-sm transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-cyan-400 text-sm transition-colors"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* Community */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold text-sm">Community</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-cyan-400 text-sm transition-colors"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-cyan-400 text-sm transition-colors"
                  >
                    Discord
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-slate-800 text-center">
            <p className="text-sm text-slate-500">
              © 2025 TerraProof. Built on Sui & Walrus. All rights reserved.
            </p>
          </div>
        </div>

        {/* Large TERRA Text with Outline */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 pointer-events-none">
          <h2
            className="text-[12rem] sm:text-[16rem] md:text-[20rem] lg:text-[24rem] font-bold text-transparent select-none"
            style={{
              WebkitTextStroke: "2px rgba(6, 182, 212, 0.1)",
            }}
          >
            TERRA
          </h2>
        </div>
      </footer>
    </div>
  );
}
