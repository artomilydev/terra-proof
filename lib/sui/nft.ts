import { Transaction } from "@mysten/sui/transactions";
import { SuiClient } from "@mysten/sui/client";
import { NFTMetadata } from "./walrus";
import { uploadFile, uploadMetadata } from "../storage";

// Package ID dari smart contract NFT yang sudah di-publish di Sui
// Ini perlu diganti dengan package ID yang sebenarnya setelah deploy
export const NFT_PACKAGE_ID =
  process.env.NEXT_PUBLIC_NFT_PACKAGE_ID ||
  "0x0000000000000000000000000000000000000000000000000000000000000000";

export interface MintNFTParams {
  name: string;
  description: string;
  imageFile: File;
  location: string;
  date: string;
  category: string;
  price: number;
  verificationScore: number;
}

export interface BuyNFTParams {
  nftId: string;
  price: number;
  seller: string;
}

/**
 * Mint NFT baru dengan upload ke Walrus
 */
export async function mintNFT(
  params: MintNFTParams,
  signAndExecute: any
): Promise<string> {
  try {
    // 1. Upload image ke storage (Walrus atau IPFS)
    console.log("📤 Uploading image to storage...");
    const imageUpload = await uploadFile(params.imageFile);
    console.log(`✅ Image uploaded: ${imageUpload.url}`);

    // 2. Create metadata
    const metadata: NFTMetadata = {
      name: params.name,
      description: params.description,
      image: imageUpload.url,
      location: params.location,
      date: params.date,
      category: params.category,
      attributes: {
        verificationScore: params.verificationScore,
        timestamp: Date.now(),
      },
    };

    // 3. Upload metadata ke storage
    console.log("📤 Uploading metadata to storage...");
    const metadataUpload = await uploadMetadata(metadata);
    console.log(`✅ Metadata uploaded: ${metadataUpload.url}`);

    // 4. Create transaction untuk mint NFT di Sui
    const tx = new Transaction();

    // Call smart contract function untuk mint NFT
    // Format: package_id::module_name::function_name
    tx.moveCall({
      target: `${NFT_PACKAGE_ID}::terra_proof_nft::mint`,
      arguments: [
        tx.pure.vector("u8", Array.from(new TextEncoder().encode(params.name))),
        tx.pure.vector("u8", Array.from(new TextEncoder().encode(params.description))),
        tx.pure.vector("u8", Array.from(new TextEncoder().encode(metadataUpload.url))),
        tx.pure.vector("u8", Array.from(new TextEncoder().encode(params.location))),
        tx.pure.vector("u8", Array.from(new TextEncoder().encode(params.date))),
        tx.pure.vector("u8", Array.from(new TextEncoder().encode(params.category))),
        tx.pure.u64(Math.floor(params.price * 1_000_000_000)), // Convert to MIST (1 SUI = 1_000_000_000 MIST)
        tx.pure.u8(params.verificationScore),
      ],
    });

    // 5. Sign and execute transaction
    console.log("⛓️  Minting NFT on Sui blockchain...");
    console.log("⏳ Waiting for wallet approval...");
    
    return new Promise((resolve, reject) => {
      signAndExecute(
        {
          transaction: tx,
        },
        {
          onSuccess: (result: any) => {
            console.log("✅ Transaction confirmed!");
            console.log(`🎉 NFT Minted! Transaction: ${result.digest}`);
            console.log(`📦 Storage: ${imageUpload.provider.toUpperCase()}`);
            resolve(result.digest);
          },
          onError: (error: any) => {
            console.error("❌ Transaction failed:", error);
            reject(error);
          },
        }
      );
    });
  } catch (error) {
    console.error("❌ Error in mint process:", error);
    throw error;
  }
}

/**
 * Buy NFT dari marketplace
 */
export async function buyNFT(
  params: BuyNFTParams,
  signAndExecute: any
): Promise<string> {
  try {
    const tx = new Transaction();

    // Split coin untuk payment
    const [coin] = tx.splitCoins(tx.gas, [
      tx.pure.u64(params.price * 1_000_000_000), // Convert to MIST
    ]);

    // Call smart contract function untuk buy NFT
    tx.moveCall({
      target: `${NFT_PACKAGE_ID}::terra_proof_nft::buy_nft`,
      arguments: [
        tx.object(params.nftId), // NFT object ID
        coin, // Payment coin
        tx.pure.address(params.seller), // Seller address
      ],
    });

    // Sign and execute transaction
    console.log("💰 Buying NFT...");
    console.log("⏳ Waiting for wallet approval...");
    
    return new Promise((resolve, reject) => {
      signAndExecute(
        {
          transaction: tx,
        },
        {
          onSuccess: (result: any) => {
            console.log("✅ Transaction confirmed!");
            console.log("🎉 NFT purchased successfully!");
            resolve(result.digest);
          },
          onError: (error: any) => {
            console.error("❌ Transaction failed:", error);
            reject(error);
          },
        }
      );
    });
  } catch (error) {
    console.error("❌ Error buying NFT:", error);
    throw error;
  }
}

/**
 * List NFT di marketplace
 */
export async function listNFT(
  nftId: string,
  price: number,
  signAndExecute: any
): Promise<string> {
  try {
    const tx = new Transaction();

    tx.moveCall({
      target: `${NFT_PACKAGE_ID}::terra_proof_nft::list_for_sale`,
      arguments: [
        tx.object(nftId),
        tx.pure.u64(price * 1_000_000_000), // Convert to MIST
      ],
    });

    console.log("🏷️  Listing NFT...");
    console.log("⏳ Waiting for wallet approval...");
    
    return new Promise((resolve, reject) => {
      signAndExecute(
        {
          transaction: tx,
        },
        {
          onSuccess: (result: any) => {
            console.log("✅ Transaction confirmed!");
            console.log("🎉 NFT listed successfully!");
            resolve(result.digest);
          },
          onError: (error: any) => {
            console.error("❌ Transaction failed:", error);
            reject(error);
          },
        }
      );
    });
  } catch (error) {
    console.error("❌ Error listing NFT:", error);
    throw error;
  }
}

/**
 * Get NFT details dari Sui
 */
export async function getNFTDetails(
  client: SuiClient,
  nftId: string
): Promise<any> {
  try {
    const object = await client.getObject({
      id: nftId,
      options: {
        showContent: true,
        showOwner: true,
        showDisplay: true,
      },
    });

    return object;
  } catch (error) {
    console.error("Error getting NFT details:", error);
    throw error;
  }
}

/**
 * Get all NFTs owned by address
 */
export async function getOwnedNFTs(
  client: SuiClient,
  ownerAddress: string
): Promise<any[]> {
  try {
    const objects = await client.getOwnedObjects({
      owner: ownerAddress,
      filter: {
        StructType: `${NFT_PACKAGE_ID}::terra_proof_nft::TerraProofNFT`,
      },
      options: {
        showContent: true,
        showDisplay: true,
      },
    });

    return objects.data;
  } catch (error) {
    console.error("Error getting owned NFTs:", error);
    throw error;
  }
}
