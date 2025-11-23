# TerraProof 🌍✈️

**TerraProof - Blockchain-verified travel authenticity on Sui**

TerraProof is a Web3 platform where travelers can mint verifiable travel moments as NFTs on the **Sui blockchain**. Each proof is timestamped, geo-tagged, and stored using **IPFS/Walrus** decentralized storage.

## 🚀 Quick Links

- **[Deployment Guide](./DEPLOYMENT.md)** - Package ID, setup, and troubleshooting
- **[Vercel Deployment](./VERCEL_DEPLOYMENT.md)** - Complete Vercel setup and debugging guide

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

## 🔧 Vercel Deployment

### Quick Setup

1. **Set Environment Variables** in Vercel Dashboard:
```env
PINATA_API_KEY=your_key
PINATA_SECRET_KEY=your_secret
NEXT_PUBLIC_STORAGE_PROVIDER=ipfs
NEXT_PUBLIC_NFT_PACKAGE_ID=0x5eafb2aedb4d3d97ff47f2a2b13bcbc2b8c2d1c86db45fd114bb2b10250b4394
NEXT_PUBLIC_SUI_NETWORK=testnet
```

2. **Deploy**:
```bash
git push origin main  # Auto-deploys to Vercel
```

3. **Verify**:
   - Test at your-app.vercel.app/mint
   - Upload test image < 10MB
   - Check Vercel Function Logs if errors occur

### Troubleshooting Mint Issues

If minting fails on Vercel:

✅ **Already Fixed:**
- Server Actions body size increased to 10MB
- Retry logic (3 attempts)
- 30-second timeout
- Better error messages

❗ **Check These:**
1. Environment variables set in Vercel Dashboard
2. Image size < 10MB
3. Pinata API keys are valid
4. Redeploy after env var changes

📖 **Full Guide:** See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)

## 📄 License

MIT License
