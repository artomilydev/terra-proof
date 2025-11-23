// Unified Storage Interface
// Support multiple storage backends: Walrus, IPFS, etc.

import { uploadToWalrus, uploadMetadataWalrus } from "./walrus-client";
import { uploadToIPFS, uploadMetadataIPFS } from "./ipfs-client";
import { testPinataConnection as testPinata } from "./ipfs";
import type { WalrusUploadResponse, NFTMetadata } from "./walrus";
import type { IPFSUploadResponse } from "./ipfs";

export type StorageProvider = "walrus" | "ipfs";

export interface StorageUploadResponse {
  id: string; // blob ID or IPFS hash
  url: string;
  size: number;
  provider: StorageProvider;
}

// Tentukan storage provider dari environment variable
const STORAGE_PROVIDER: StorageProvider =
  (process.env.NEXT_PUBLIC_STORAGE_PROVIDER as StorageProvider) || "ipfs";

/**
 * Upload file ke storage (auto-detect provider)
 */
export async function uploadFile(file: File): Promise<StorageUploadResponse> {
  console.log(`📤 Uploading file to ${STORAGE_PROVIDER}...`);

  try {
    if (STORAGE_PROVIDER === "walrus") {
      const result = await uploadToWalrus(file);
      return {
        id: result.blobId,
        url: result.url,
        size: result.size,
        provider: "walrus",
      };
    } else {
      // Default: IPFS
      const result = await uploadToIPFS(file);
      return {
        id: result.ipfsHash,
        url: result.url,
        size: result.size,
        provider: "ipfs",
      };
    }
  } catch (error) {
    console.error(`❌ Failed to upload to ${STORAGE_PROVIDER}:`, error);
    throw error;
  }
}

/**
 * Upload metadata ke storage
 */
export async function uploadMetadata(
  metadata: NFTMetadata
): Promise<StorageUploadResponse> {
  console.log(`📤 Uploading metadata to ${STORAGE_PROVIDER}...`);

  try {
    if (STORAGE_PROVIDER === "walrus") {
      const result = await uploadMetadataWalrus(metadata);
      return {
        id: result.blobId,
        url: result.url,
        size: result.size,
        provider: "walrus",
      };
    } else {
      // Default: IPFS
      const result = await uploadMetadataIPFS(metadata);
      return {
        id: result.ipfsHash,
        url: result.url,
        size: result.size,
        provider: "ipfs",
      };
    }
  } catch (error) {
    console.error(`❌ Failed to upload metadata to ${STORAGE_PROVIDER}:`, error);
    throw error;
  }
}

/**
 * Get storage provider name
 */
export function getStorageProvider(): StorageProvider {
  return STORAGE_PROVIDER;
}

/**
 * Check if storage is available
 */
export async function checkStorageAvailability(): Promise<boolean> {
  try {
    if (STORAGE_PROVIDER === "ipfs") {
      const result = await testPinata();
      return result.success;
    }
    // For Walrus, just return true (will fail on actual upload if unavailable)
    return true;
  } catch (error) {
    console.error("Storage check failed:", error);
    return false;
  }
}
