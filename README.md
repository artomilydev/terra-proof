# TerraProof 🌍✈️

**Blockchain-verified travel authenticity on Sui**

> Complete documentation is in the `/docs` folder. Start with [`docs/README.md`](./docs/README.md)

TerraProof is a Web3 platform where travelers can mint verifiable travel moments as NFTs on the **Sui blockchain**. Each proof is timestamped, geo-tagged, and stored using **IPFS/Walrus** decentralized storage.

## 🚀 Quick Links

- **[Complete Documentation](./docs/README.md)** - Full project overview
- **[Implementation Guide](./docs/IMPLEMENTATION.md)** - Setup & deployment steps
- **[Quick Setup (5 min)](./docs/QUICK_SETUP.md)** - Pinata IPFS setup for development
- **[Walrus Guide](./docs/WALRUS_SETUP.md)** - Walrus storage alternatives
- **[IPFS Fix Guide](./docs/IPFS_FIX.md)** - Server Actions pattern explanation
- **[Storage Configuration](./docs/STORAGE_SETUP.md)** - Complete storage setup

## 🛠️ Quick Start

```bash
# Install dependencies
bun install

# Setup environment
cp .env.example .env.local
# Edit .env.local with your configuration

# Run development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📦 Tech Stack

- **Blockchain**: Sui with Move smart contracts
- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Storage**: IPFS (Pinata) or Walrus
- **Wallet**: Sui Wallet, Suiet, Ethos, Martian

## ✨ Features

- ✈️ Mint travel proofs as NFTs
- 🔐 Blockchain verification with scores (0-100)
- 🏪 Marketplace - Buy, sell, collect travel moments
- 💾 Decentralized storage (IPFS/Walrus)
- 🌐 On-chain provenance and ownership

## 📄 License

MIT License

---

**👉 [Go to Full Documentation](./docs/README.md)**
