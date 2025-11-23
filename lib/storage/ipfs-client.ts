// Client-side wrapper untuk IPFS upload
// Converts File to Buffer dan memanggil server action

import {
  uploadFileToIPFS,
  uploadMetadataToIPFS,
  type IPFSUploadResponse,
} from "./ipfs";

/**
 * Client-side: Upload file ke IPFS
 * Converts File to Buffer dan memanggil server action
 */
export async function uploadToIPFS(file: File): Promise<IPFSUploadResponse> {
  try {
    // Validate file size (max 10MB untuk testing)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      throw new Error(`File too large: ${(file.size / 1024 / 1024).toFixed(2)}MB (max 10MB)`);
    }

    console.log(`📤 [Client] Converting file to array...`);
    console.log(`   File: ${file.name}`);
    console.log(`   Size: ${(file.size / 1024).toFixed(2)}KB`);
    
    // Convert to ArrayBuffer then to Array (for serialization)
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    const byteArray = Array.from(uint8Array);

    console.log(`📤 [Client] Uploading to IPFS via server action...`);
    const result = await uploadFileToIPFS(byteArray, file.name);
    console.log(`✅ [Client] Upload successful: ${result.url}`);

    return result;
  } catch (error) {
    console.error("❌ [Client] Error uploading file to IPFS:", error);
    throw error;
  }
}

/**
 * Client-side: Upload metadata ke IPFS
 */
export async function uploadMetadataIPFS(
  metadata: any
): Promise<IPFSUploadResponse> {
  try {
    console.log(`📤 Uploading metadata to IPFS via server...`);
    const result = await uploadMetadataToIPFS(metadata);
    console.log(`✅ Metadata upload successful: ${result.url}`);

    return result;
  } catch (error) {
    console.error("Error uploading metadata to IPFS:", error);
    throw error;
  }
}

export type { IPFSUploadResponse };
