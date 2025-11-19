import Link from "next/link";
import { Globe, Shield, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Simple Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-card">
        <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-neon-blue to-neon-cyan rounded-2xl flex items-center justify-center glow-blue">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">TerraProof</span>
          </Link>
          <Link
            href="/dashboard"
            className="px-6 py-2 bg-linear-to-r from-neon-blue to-neon-cyan text-white rounded-full font-semibold hover:opacity-90 transition-opacity"
          >
            Launch App
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-neon-blue/10 to-transparent">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full mb-8">
            <span className="text-sm font-medium text-neon-cyan">
              Built on Sui & Walrus • Trending Travel Proofs
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
            Your Journey,
            <br />
            Permanently Proven
          </h1>

          <p className="text-xl md:text-2xl text-text-secondary mb-12 max-w-3xl mx-auto">
            Turn your travel moments into verifiable digital assets. Mint,
            trade, and collect authenticated travel proofs on the blockchain.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-linear-to-r from-neon-blue to-neon-cyan text-white rounded-full text-lg font-semibold hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2 glow-blue"
            >
              Start Minting
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/marketplace"
              className="px-8 py-4 glass-card text-neon-cyan border-2 border-white/10 rounded-full text-lg font-semibold hover:border-neon-blue/40 transition-colors inline-flex items-center justify-center gap-2"
            >
              Explore Marketplace
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="text-3xl font-bold text-indigo-600 mb-2">
                1,234
              </div>
              <div className="text-gray-600">Proofs Minted</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="text-3xl font-bold text-purple-600 mb-2">567</div>
              <div className="text-gray-600">Active Travelers</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="text-3xl font-bold text-pink-600 mb-2">89</div>
              <div className="text-gray-600">Countries Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              How It Works
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Three simple steps to turn your travel moments into trending
              digital assets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="glass-card p-6 rounded-2xl">
              <div className="bg-linear-to-br from-neon-blue to-neon-cyan w-16 h-16 rounded-2xl flex items-center justify-center mb-6 glow-blue">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">1. Upload Your Proof</h3>
              <p className="text-text-secondary">
                Take a photo of your boarding pass, hotel confirmation, or
                capture a geo-tagged moment from your mobile device.
              </p>
            </div>

            {/* Step 2 */}
            <div className="glass-card p-6 rounded-2xl">
              <div className="bg-linear-to-br from-neon-cyan to-neon-purple w-16 h-16 rounded-2xl flex items-center justify-center mb-6 glow-cyan">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">
                2. Verify Authenticity
              </h3>
              <p className="text-text-secondary">
                Our system automatically extracts GPS, timestamp, and EXIF data
                to calculate a verification score (0-100).
              </p>
            </div>

            {/* Step 3 */}
            <div className="glass-card p-6 rounded-2xl">
              <div className="bg-linear-to-br from-neon-purple to-neon-blue w-16 h-16 rounded-2xl flex items-center justify-center mb-6 glow-purple">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">3. Mint as NFT</h3>
              <p className="text-text-secondary">
                Your proof is minted on Base blockchain, stored permanently on
                IPFS, and ready to trade or showcase.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Proof Categories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              What Can You Mint?
            </h2>
            <p className="text-xl text-text-secondary">
              Any authentic travel moment can become a trending proof
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-6 rounded-xl hover:border-neon-blue/40 hover:glow-blue transition-all">
              <Globe className="w-10 h-10 text-neon-blue mb-4" />
              <h3 className="font-bold text-lg mb-2">✈️ Flight Proofs</h3>
              <p className="text-text-secondary text-sm">
                Boarding passes, arrival stamps, flight confirmations
              </p>
            </div>

            <div className="glass-card p-6 rounded-xl hover:border-neon-cyan/40 hover:glow-cyan transition-all">
              <Globe className="w-10 h-10 text-neon-cyan mb-4" />
              <h3 className="font-bold text-lg mb-2">🏨 Hotel Check-ins</h3>
              <p className="text-text-secondary text-sm">
                Hotel keycards, booking confirmations, receipts
              </p>
            </div>

            <div className="glass-card p-6 rounded-xl hover:border-neon-purple/40 hover:glow-purple transition-all">
              <Globe className="w-10 h-10 text-neon-purple mb-4" />
              <h3 className="font-bold text-lg mb-2">📍 Location Milestones</h3>
              <p className="text-text-secondary text-sm">
                Geo-tagged photos from iconic landmarks
              </p>
            </div>

            <div className="glass-card p-6 rounded-xl hover:border-neon-blue/40 hover:glow-blue transition-all">
              <Shield className="w-10 h-10 text-neon-blue mb-4" />
              <h3 className="font-bold text-lg mb-2">🛂 Visa & Permits</h3>
              <p className="text-text-secondary text-sm">
                Entry stamps, travel permits, border crossings
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-r from-neon-blue/30 to-neon-purple/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-text-secondary mb-8">
            Join thousands of travelers turning their adventures into trending
            digital assets
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-neon-blue to-neon-cyan text-white rounded-full text-lg font-semibold hover:opacity-90 transition-opacity glow-blue"
          >
            Mint Your First Proof
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
