# TerraProof 🌍✈️

**Blockchain-verified travel authenticity**

TerraProof is a Web3 platform where travelers can mint verifiable travel moments as NFTs. Each proof is timestamped, geo-tagged, and stored on-chain, creating an immutable record of authentic travel experiences.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![Base](https://img.shields.io/badge/Base-Ethereum%20L2-blue)](https://base.org/)

---

## 🎯 What is TerraProof?

TerraProof transforms travel moments into composable digital assets:

- ✈️ **Mint travel proofs** - Boarding passes, hotel check-ins, visa stamps, geo-logs
- 🔐 **Blockchain verification** - GPS + EXIF + timestamp validation (0-100 score)
- 🏪 **Trade on marketplace** - Buy, sell, collect unique travel moments
- 📱 **Mobile-first** - Seamless minting via Farcaster/Warpcast
- 🌐 **On-chain provenance** - Immutable, portable, composable

**Category:** Data Economy & Marketplaces (Web3)

---

## 🚀 Features (v1)

### NFT Minting

- Upload travel proof (image/text)
- Automatic metadata extraction (GPS, timestamp, location)
- Verification scoring algorithm
- IPFS permanent storage
- Base blockchain (low fees, fast)

### Proof Authenticity

- **GPS Verification** (0-30 pts)
- **EXIF Metadata** (0-30 pts)
- **Timestamp Verification** (0-20 pts)
- **Manual Review** (optional, +20 pts)
- **Trust Score:** High (80-100) | Medium (50-79) | Low (0-49)

### Marketplace

- Browse all travel proofs
- Filter by location, date, category, score
- List NFTs for sale
- Buy with wallet
- 2.5% marketplace fee + 5% royalty to minter

### Farcaster Integration

- Sign in with Farcaster
- Mobile minting in Warpcast
- Auto-generate Frames
- Post proofs to feed
- One-click sharing

---

## 📚 Documentation

Comprehensive guides in `/docs`:

- **[PRD.md](./docs/PRD.md)** - Product requirements, user flows, features
- **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - Tech stack, system design, data flow
- **[NFT_SCHEMA.md](./docs/NFT_SCHEMA.md)** - Metadata structure, attributes, storage
- **[CONTRACTS.md](./docs/CONTRACTS.md)** - Smart contract specs, deployment
- **[FARCASTER.md](./docs/FARCASTER.md)** - Auth, Frames, mobile UX
- **[ROADMAP.md](./docs/ROADMAP.md)** - 7-week implementation plan
- **[RISKS.md](./docs/RISKS.md)** - Risk analysis & mitigation strategies

---

## 🛠️ Tech Stack

**Frontend:**

- Next.js 14 (App Router)
- React 19
- TypeScript
- TailwindCSS 4
- shadcn/ui

**Blockchain:**

- Base (Ethereum L2)
- Solidity (OpenZeppelin contracts)
- wagmi + viem
- Foundry (contract development)

**Backend:**

- Next.js API Routes
- PostgreSQL (Supabase)
- Prisma ORM
- IPFS (Pinata)

**Auth:**

- Farcaster Auth Kit
- WalletConnect v2

**Deployment:**

- Vercel (frontend)
- Base Mainnet (contracts)
- Supabase (database)

---

## 🏁 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (or npm/yarn)
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/terra-proof.git
cd terra-proof

# Install dependencies
pnpm install

# Setup environment variables
cp .env.local.example .env.local
# Edit .env.local with your API keys

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

### Environment Variables

```env
# Database
DATABASE_URL=postgresql://...

# IPFS
PINATA_API_KEY=
PINATA_SECRET_KEY=

# Blockchain
NEXT_PUBLIC_BASE_RPC=
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=

# Farcaster
NEXT_PUBLIC_FARCASTER_CLIENT_ID=
FARCASTER_CLIENT_SECRET=

# Optional
NEYNAR_API_KEY=
SENTRY_DSN=
```

---

## 📦 Project Structure

```
terra-proof/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Protected routes
│   ├── (public)/          # Public routes
│   ├── api/               # API endpoints
│   └── globals.css
├── components/            # React components
│   ├── ui/               # Base UI (shadcn)
│   ├── features/         # Feature components
│   └── layout/           # Layout components
├── lib/                   # Utilities
│   ├── blockchain/       # Web3 logic
│   ├── ipfs/            # IPFS uploads
│   ├── verification/     # Proof validation
│   └── farcaster/       # Farcaster integration
├── contracts/            # Smart contracts (Foundry)
│   ├── src/
│   ├── test/
│   └── script/
├── prisma/               # Database schema
├── docs/                 # Documentation
└── public/               # Static assets
```

---

## 🧪 Development

### Run Tests

```bash
# Frontend tests
pnpm test

# Smart contract tests
cd contracts
forge test -vvv

# E2E tests
pnpm test:e2e
```

### Build for Production

```bash
pnpm build
pnpm start
```

### Deploy Contracts

```bash
cd contracts
forge script script/Deploy.s.sol --rpc-url $BASE_RPC --broadcast --verify
```

---

## 🎨 Design Philosophy

1. **Mobile-First** - Optimized for Warpcast/Farcaster users
2. **Verification-Focused** - Trust through transparency
3. **Simple & Fast** - Ship MVP, iterate based on feedback
4. **Decentralized** - User-owned data, on-chain proofs
5. **Composable** - NFTs work across apps/platforms

---

## 🗺️ Roadmap

### ✅ Phase 1: Foundation (Week 1)

- Project setup
- Database schema
- Base UI components

### ⏳ Phase 2: Smart Contracts (Week 2-3)

- NFT contract
- Marketplace contract
- Testnet deployment

### ⏳ Phase 3: Minting (Week 3-4)

- Upload & validation
- IPFS integration
- Verification scoring

### ⏳ Phase 4: Marketplace (Week 4-5)

- Browse & filter
- Listing/buying flows
- Indexer

### ⏳ Phase 5: Farcaster (Week 5-6)

- Auth integration
- Frame generation
- Mobile optimization

### ⏳ Phase 6: Launch (Week 6-7)

- Security audit
- Production deployment
- Soft launch

See [ROADMAP.md](./docs/ROADMAP.md) for detailed timeline.

---

## 🤝 Contributing

Contributions welcome! Please read our contributing guidelines.

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

---

## 📄 License

MIT License - see [LICENSE](./LICENSE)

---

## 🔗 Links

- **Website:** https://terraproof.xyz (coming soon)
- **Farcaster:** [@terraproof](https://warpcast.com/terraproof)
- **Twitter:** [@TerraProofXYZ](https://twitter.com/TerraProofXYZ)
- **Discord:** [Join our community](https://discord.gg/terraproof)

---

## 💬 Support

- 📧 Email: hello@terraproof.xyz
- 💬 Discord: [TerraProof Community](https://discord.gg/terraproof)
- 🐦 Twitter: [@TerraProofXYZ](https://twitter.com/TerraProofXYZ)

---

## 🙏 Acknowledgments

Built with:

- [Next.js](https://nextjs.org/)
- [Base](https://base.org/)
- [Farcaster](https://farcaster.xyz/)
- [OpenZeppelin](https://openzeppelin.com/)
- [shadcn/ui](https://ui.shadcn.com/)

---

**Made with ❤️ by the TerraProof team**

_Transforming travel moments into verifiable digital assets._
