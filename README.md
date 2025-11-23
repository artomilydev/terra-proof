# TerraProof 🌍✈️

**TerraProof - Blockchain-verified travel authenticity on Sui**

TerraProof is a Web3 platform where travelers can mint verifiable travel moments as NFTs on the **Sui blockchain**. Each proof is timestamped, geo-tagged, and stored using **IPFS/Walrus** decentralized storage.

## 🚀 Quick Links

- **[Deployment Guide](./DEPLOYMENT.md)** - Package ID, setup, and troubleshooting

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
