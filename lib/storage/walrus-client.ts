/**
 * Client-side wrapper untuk Walrus upload
 * Converts File to Buffer dan memanggil server action
 */

import {
  uploadFileToWalrus,
  uploadMetadataToWalrus,
  type WalrusUploadResponse,
} from "./walrus";

/**
 * Client-side: Upload file ke Walrus
 * 
 * @param file - File object dari input[type="file"]
 * @returns Promise<WalrusUploadResponse> - { blobId, url, size }
 * 
 * @example
 * const file = event.target.files[0];
 * const result = await uploadToWalrus(file);
 * console.log(result.url); // https://aggregator.../v1/abc123
 */
export async function uploadToWalrus(
  file: File
): Promise<WalrusUploadResponse> {
  try {
    console.log(`📤 [Walrus] Converting ${file.name} to buffer...`);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log(`📤 [Walrus] Uploading to Walrus via server action...`);
    const result = await uploadFileToWalrus(buffer, file.name);

    console.log(`✅ [Walrus] Upload successful!`);
    console.log(`   Blob ID: ${result.blobId}`);
    console.log(`   URL: ${result.url}`);

    return result;
  } catch (error) {
    console.error("❌ [Walrus] Upload failed:", error);
    throw new Error(
      `Failed to upload file to Walrus: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

/**
 * Client-side: Upload metadata JSON ke Walrus
 * 
 * @param metadata - Object metadata (akan di-stringify)
 * @returns Promise<WalrusUploadResponse> - { blobId, url, size }
 * 
 * @example
 * const metadata = {
 *   name: "Bali Beach",
 *   description: "Sunset photo",
 *   image: "walrus://abc123",
 *   attributes: [...]
 * };
 * const result = await uploadMetadataWalrus(metadata);
 */
export async function uploadMetadataWalrus(
  metadata: Record<string, any>
): Promise<WalrusUploadResponse> {
  try {
    console.log(`📤 [Walrus] Uploading metadata...`);
    const result = await uploadMetadataToWalrus(metadata);

    console.log(`✅ [Walrus] Metadata upload successful!`);
    console.log(`   Blob ID: ${result.blobId}`);

    return result;
  } catch (error) {
    console.error("❌ [Walrus] Metadata upload failed:", error);
    throw new Error(
      `Failed to upload metadata to Walrus: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

export type { WalrusUploadResponse };
