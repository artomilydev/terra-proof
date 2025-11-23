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

    // Validate file type
    if (!file.type.startsWith('image/')) {
      throw new Error('Only image files are supported');
    }

    console.log(`📤 [Client] Converting file to array...`);
    console.log(`   File: ${file.name}`);
    console.log(`   Type: ${file.type}`);
    console.log(`   Size: ${(file.size / 1024).toFixed(2)}KB`);
    
    // Convert to ArrayBuffer then to Array (for serialization)
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    const byteArray = Array.from(uint8Array);

    console.log(`📤 [Client] Uploading to IPFS via server action...`);
    console.log(`   Payload size: ${(byteArray.length / 1024).toFixed(2)}KB`);
    
    // Add retry logic
    let lastError: Error | null = null;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        console.log(`   Attempt ${attempt}/3...`);
        const result = await uploadFileToIPFS(byteArray, file.name);
        console.log(`✅ [Client] Upload successful: ${result.url}`);
        return result;
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        console.warn(`⚠️  [Client] Attempt ${attempt} failed:`, lastError.message);
        
        if (attempt < 3) {
          // Wait before retry (exponential backoff)
          const waitTime = Math.pow(2, attempt) * 1000;
          console.log(`   Retrying in ${waitTime/1000}s...`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
        }
      }
    }

    // All attempts failed
    throw lastError || new Error('Upload failed after 3 attempts');
  } catch (error) {
    console.error("❌ [Client] Error uploading file to IPFS:", error);
    
    // Provide user-friendly error messages
    if (error instanceof Error) {
      if (error.message.includes('too large')) {
        throw new Error('File is too large. Please use an image smaller than 10MB.');
      }
      if (error.message.includes('Only image')) {
        throw error;
      }
      if (error.message.includes('timeout')) {
        throw new Error('Upload timeout. Please check your internet connection and try again.');
      }
      if (error.message.includes('not configured')) {
        throw new Error('Storage service is not properly configured. Please contact support.');
      }
    }
    
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
