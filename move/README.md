# TerraProof Smart Contract (Move)

## Overview
Smart contract untuk TerraProof NFT di Sui blockchain, menggunakan bahasa Move.

## Struktur

### TerraProofNFT
NFT object yang merepresentasikan travel proof dengan metadata:
- name: Nama NFT
- description: Deskripsi travel experience
- metadata_url: URL ke metadata JSON di Walrus
- location: Lokasi foto diambil
- date: Tanggal foto
- category: Kategori (beach, mountain, city, dll)
- price: Harga dalam MIST (1 SUI = 1_000_000_000 MIST)
- verification_score: Score verifikasi (0-100)
- creator: Address creator
- is_listed: Status listing di marketplace

## Functions

### mint
Mint NFT baru dengan metadata yang di-upload ke Walrus storage.

### list_for_sale
List NFT untuk dijual di marketplace dengan harga tertentu.

### buy_nft
Buy NFT dari marketplace menggunakan SUI tokens.

### delist
Remove NFT dari marketplace listing.

### update_price
Update harga NFT (hanya creator yang bisa).

## Deployment

Untuk deploy smart contract ke Sui testnet:

```bash
# Install Sui CLI
cargo install --locked --git https://github.com/MystenLabs/sui.git --branch testnet sui

# Publish module
sui client publish --gas-budget 100000000

# Simpan Package ID yang dihasilkan ke environment variable
NEXT_PUBLIC_NFT_PACKAGE_ID=<package_id>
```

## Integration dengan Frontend

Frontend menggunakan `@mysten/dapp-kit` untuk:
1. Connect wallet (Sui Wallet, Suiet, Ethos, dll)
2. Sign dan execute transactions
3. Query NFT data dari blockchain
4. Display NFT dengan metadata dari Walrus

## Walrus Storage

Walrus digunakan untuk:
- Menyimpan gambar NFT
- Menyimpan metadata JSON NFT
- Decentralized storage untuk memastikan NFT tetap accessible

Metadata disimpan sebagai JSON dengan struktur:
```json
{
  "name": "Mount Fuji Sunrise",
  "description": "Beautiful sunrise view...",
  "image": "https://aggregator.walrus-testnet.walrus.space/v1/<blob_id>",
  "location": "Tokyo, Japan",
  "date": "2024-01-15",
  "category": "mountain",
  "attributes": {
    "verificationScore": 95,
    "timestamp": 1705305600000
  }
}
```
