# TerraProof - Implementation Guide

## ✅ Implementasi yang Sudah Selesai

### 1. Sui Wallet Integration
- ✅ Install dependencies: `@mysten/sui`, `@mysten/dapp-kit`, `@mysten/wallet-standard`, `@tanstack/react-query`
- ✅ Setup SuiProvider dengan QueryClient
- ✅ Konfigurasi network (devnet, testnet, mainnet)
- ✅ WalletConnect component untuk connect/disconnect wallet
- ✅ Update Sidebar untuk menampilkan wallet address

### 2. Storage Integration (Walrus/IPFS)
- ✅ Upload file ke Walrus (`uploadToWalrus`)
- ✅ Upload metadata JSON ke Walrus (`uploadMetadataToWalrus`)
- ✅ **ALTERNATIVE**: IPFS integration via Pinata (`uploadToIPFS`)
- ✅ Unified storage interface (`/lib/storage/index.ts`)
- ✅ Auto-switch between Walrus/IPFS based on config
- ✅ Helper function untuk generate URLs

**⚠️ IMPORTANT**: Jika Walrus link not found, gunakan IPFS:
- See: `QUICK_SETUP.md` untuk setup Pinata (5 menit)
- See: `WALRUS_SETUP.md` untuk detail Walrus status

### 3. Smart Contract (Move)
- ✅ Buat `terra_proof_nft.move` dengan struct:
  - `TerraProofNFT`: Main NFT object
  - `Listing`: Marketplace listing
- ✅ Functions:
  - `mint`: Mint NFT baru
  - `list_for_sale`: List NFT di marketplace
  - `buy_nft`: Buy NFT dari marketplace
  - `delist`: Remove dari listing
  - `update_price`: Update harga NFT
- ✅ Events untuk tracking (NFTMinted, NFTListed, NFTSold)

### 4. NFT Functions
- ✅ `mintNFT`: Upload image & metadata ke storage (Walrus/IPFS), mint di blockchain
- ✅ `buyNFT`: Buy NFT dengan SUI tokens
- ✅ `listNFT`: List NFT untuk dijual
- ✅ `getNFTDetails`: Get NFT data dari blockchain
- ✅ `getOwnedNFTs`: Get semua NFT milik user
- ✅ Flexible storage backend (auto-detect Walrus or IPFS)

### 5. UI Components
- ✅ Update Mint Page:
  - File upload dengan preview
  - Form untuk metadata (title, description, location, date, category, price)
  - Verification score display
  - Mint button dengan loading state
  - Wallet connection check
- ✅ Update NFTCard:
  - Buy button dengan loading state
  - Integration dengan buyNFT function
  - Wallet address check (tidak bisa buy NFT sendiri)

## 📋 Langkah Deployment

### 1. Setup Environment Variables

**PILIHAN A: Gunakan IPFS (Recommended untuk Development)**

Lihat `QUICK_SETUP.md` untuk setup Pinata dalam 5 menit.

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
# Storage - Gunakan IPFS
NEXT_PUBLIC_STORAGE_PROVIDER=ipfs

# Pinata Keys (daftar di https://pinata.cloud)
PINATA_API_KEY=your_key_here
PINATA_SECRET_KEY=your_secret_here

# Sui Config
NEXT_PUBLIC_SUI_NETWORK=testnet
```

**PILIHAN B: Gunakan Walrus (Jika Sudah Tersedia)**

```env
# Storage - Gunakan Walrus
NEXT_PUBLIC_STORAGE_PROVIDER=walrus

# Walrus URLs (check WALRUS_SETUP.md untuk status terkini)
NEXT_PUBLIC_WALRUS_PUBLISHER_URL=https://publisher.walrus-testnet.walrus.space
NEXT_PUBLIC_WALRUS_AGGREGATOR_URL=https://aggregator.walrus-testnet.walrus.space
```

### 2. Deploy Smart Contract ke Sui

**Install Sui CLI:**
```bash
cargo install --locked --git https://github.com/MystenLabs/sui.git --branch testnet sui
```

**Setup Sui wallet:**
```bash
sui client
# Ikuti instruksi untuk create/import wallet
```

**Get testnet SUI tokens:**
- Join Discord Sui: https://discord.gg/sui
- Request faucet di channel #testnet-faucet
- Atau gunakan: `sui client faucet`

**Publish smart contract:**
```bash
cd move
sui client publish --gas-budget 100000000
```

**Simpan Package ID** yang muncul setelah publish, masukkan ke `.env.local`:
```
NEXT_PUBLIC_NFT_PACKAGE_ID=0xabc123...
```

### 3. Test Storage

**Test IPFS:**
```bash
# Jalankan dev server
bun dev

# Buka http://localhost:3000/mint
# Upload foto → akan tersimpan di IPFS via Pinata
# Check console untuk upload logs
```

**Test Walrus (jika menggunakan):**
```bash
# Install Walrus CLI
curl https://install.walrus.site | sh

# Test upload
walrus store test-image.jpg

# Jika error, Walrus testnet mungkin down
# Switch ke IPFS: NEXT_PUBLIC_STORAGE_PROVIDER=ipfs
```

### 4. Run Development Server

```bash
bun dev
```

App akan running di `http://localhost:3000`

## 🔄 Flow Lengkap

### Mint NFT Flow:
1. User connect Sui wallet
2. User upload foto travel
3. Foto di-upload ke Walrus storage → dapat blob ID & URL
4. User isi metadata (title, description, location, dll)
5. Metadata di-upload ke Walrus → dapat metadata URL
6. Transaction dibuat untuk mint NFT di blockchain
7. User sign transaction via wallet
8. NFT ter-mint dengan reference ke Walrus storage
9. NFT muncul di profile user

### Buy NFT Flow:
1. User browse marketplace
2. User klik "Buy Now" di NFT card
3. Transaction dibuat untuk transfer NFT
4. Payment (dalam SUI) otomatis di-split dari gas coin
5. User sign transaction
6. NFT ownership ter-transfer ke buyer
7. SUI ter-transfer ke seller
8. NFT muncul di profile buyer

## 🎯 Storage Architecture

**Walrus digunakan untuk:**
- ✅ Menyimpan **gambar NFT** → permanent, decentralized
- ✅ Menyimpan **metadata JSON** → immutable NFT attributes
- ✅ Ensure data availability tanpa central server
- ✅ Cost-effective storage di Sui ecosystem

**Blockchain (Sui) digunakan untuk:**
- ✅ NFT ownership & transfers
- ✅ Marketplace listings & sales
- ✅ Price management
- ✅ Creator attribution

**Metadata Structure:**
```json
{
  "name": "Mount Fuji Sunrise",
  "description": "Beautiful sunrise view from Mount Fuji...",
  "image": "https://aggregator.walrus-testnet.walrus.space/v1/{blob_id}",
  "location": "Tokyo, Japan",
  "date": "2024-01-15",
  "category": "mountain",
  "attributes": {
    "verificationScore": 95,
    "timestamp": 1705305600000
  }
}
```

## 🔐 Security Notes

1. **Private Keys**: NEVER commit private keys or seed phrases
2. **Environment Variables**: Gunakan `.env.local` untuk sensitive data
3. **Smart Contract**: Audit sebelum deploy ke mainnet
4. **Gas Budget**: Set reasonable gas budget untuk prevent excessive fees
5. **Input Validation**: Validate semua user input di frontend & smart contract

## 🚀 Next Steps (Optional Enhancements)

- [ ] Implement list NFT function di UI
- [ ] Add NFT detail page dengan full metadata
- [ ] Add search & filter di marketplace
- [ ] Implement user profile dengan owned NFTs
- [ ] Add analytics dashboard
- [ ] Implement royalties untuk creators
- [ ] Add social features (like, comment, share)
- [ ] Add geolocation verification
- [ ] Integrate dengan Oracle untuk trending locations
- [ ] Add batch minting

## 📚 Documentation Links

- [Sui Documentation](https://docs.sui.io/)
- [Move Language](https://move-language.github.io/move/)
- [Walrus Storage](https://docs.walrus.site/)
- [@mysten/dapp-kit](https://sdk.mystenlabs.com/dapp-kit)
- [Sui Explorer (Testnet)](https://suiexplorer.com/?network=testnet)
