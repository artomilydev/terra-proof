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
    console.log(`📤 Converting file to buffer...`);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log(`📤 Uploading ${file.name} to IPFS via server...`);
    const result = await uploadFileToIPFS(buffer, file.name);
    console.log(`✅ Upload successful: ${result.url}`);

    return result;
  } catch (error) {
    console.error("Error uploading file to IPFS:", error);
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
