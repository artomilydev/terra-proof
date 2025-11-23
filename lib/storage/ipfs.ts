"use server";

// Server-side Pinata IPFS integration (moved to server action)
// Ini harus di server karena Pinata SDK menggunakan Node.js 'fs' module

import pinataSDK from "@pinata/sdk";
import { Readable } from "stream";

// Initialize Pinata (hanya di server)
const pinata = new pinataSDK({
  pinataApiKey: process.env.PINATA_API_KEY,
  pinataSecretApiKey: process.env.PINATA_SECRET_KEY,
});

export interface IPFSUploadResponse {
  ipfsHash: string;
  hash: string; // Alias for unified interface
  url: string;
  size: number;
}

/**
 * Server Action: Upload file ke IPFS via Pinata
 */
export async function uploadFileToIPFS(
  fileData: ArrayBuffer | Uint8Array | number[],
  fileName: string
): Promise<IPFSUploadResponse> {
  try {
    if (!process.env.PINATA_API_KEY || !process.env.PINATA_SECRET_KEY) {
      throw new Error("Pinata API keys not configured. Please add PINATA_API_KEY and PINATA_SECRET_KEY to your environment variables.");
    }

    // Convert to Buffer properly with better error handling
    let buffer: Buffer;
    try {
      if (Array.isArray(fileData)) {
        buffer = Buffer.from(fileData);
      } else if (fileData instanceof ArrayBuffer) {
        buffer = Buffer.from(fileData);
      } else if (fileData instanceof Uint8Array) {
        buffer = Buffer.from(fileData);
      } else {
        // Fallback: convert object to array
        buffer = Buffer.from(Object.values(fileData));
      }
    } catch (conversionError) {
      console.error("❌ [IPFS Server] Error converting file data:", conversionError);
      throw new Error("Failed to convert file data to buffer. The file may be corrupted or in an unsupported format.");
    }

    // Validate buffer size
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (buffer.length > maxSize) {
      throw new Error(`File size ${(buffer.length / 1024 / 1024).toFixed(2)}MB exceeds maximum allowed size of 10MB`);
    }

    if (buffer.length === 0) {
      throw new Error("File data is empty");
    }

    console.log(`📤 [IPFS Server] Uploading ${fileName} (${(buffer.length / 1024).toFixed(2)}KB)`);

    // Create readable stream from Buffer
    const readableStream = Readable.from(buffer);

    // Upload to IPFS with timeout
    const uploadPromise = pinata.pinFileToIPFS(readableStream, {
      pinataMetadata: {
        name: fileName,
      },
      pinataOptions: {
        cidVersion: 1,
      },
    });

    // Add timeout (30 seconds)
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error("Upload timeout after 30 seconds")), 30000);
    });

    const result = await Promise.race([uploadPromise, timeoutPromise]);

    if (!result.IpfsHash) {
      throw new Error("Failed to upload to IPFS - no hash returned");
    }

    console.log(`✅ [IPFS Server] Upload successful!`);
    console.log(`   Hash: ${result.IpfsHash}`);
    console.log(`   Size: ${(result.PinSize / 1024).toFixed(2)}KB`);

    return {
      ipfsHash: result.IpfsHash,
      hash: result.IpfsHash, // Alias for unified interface
      url: `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`,
      size: result.PinSize,
    };
  } catch (error) {
    console.error("❌ [IPFS Server] Error uploading to IPFS:", error);
    
    // Provide more detailed error messages
    if (error instanceof Error) {
      if (error.message.includes("timeout")) {
        throw new Error("Upload timeout: The file upload took too long. Please try a smaller file or check your connection.");
      }
      if (error.message.includes("API key")) {
        throw new Error("IPFS service not configured. Please contact administrator.");
      }
      throw error;
    }
    
    throw new Error("Failed to upload file to IPFS. Please try again.");
  }
}

/**
 * Server Action: Upload JSON metadata ke IPFS
 */
export async function uploadMetadataToIPFS(
  metadata: any
): Promise<IPFSUploadResponse> {
  try {
    if (!process.env.PINATA_API_KEY || !process.env.PINATA_SECRET_KEY) {
      throw new Error("Pinata API keys not configured");
    }

    const result = await pinata.pinJSONToIPFS(metadata, {
      pinataMetadata: {
        name: `${metadata.name}-metadata`,
      },
      pinataOptions: {
        cidVersion: 1,
      },
    });

    if (!result.IpfsHash) {
      throw new Error("Failed to upload metadata to IPFS - no hash returned");
    }

    return {
      ipfsHash: result.IpfsHash,
      hash: result.IpfsHash, // Alias for unified interface
      url: `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`,
      size: result.PinSize || 0,
    };
  } catch (error) {
    console.error("❌ Error uploading metadata to IPFS:", error);
    throw error;
  }
}

/**
 * Server Action: Test connection ke Pinata
 */
export async function testPinataConnection(): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    if (!process.env.PINATA_API_KEY || !process.env.PINATA_SECRET_KEY) {
      return {
        success: false,
        message: "Pinata API keys not configured",
      };
    }

    await pinata.testAuthentication();
    return {
      success: true,
      message: "✅ Pinata connection successful",
    };
  } catch (error) {
    console.error("❌ Pinata connection failed:", error);
    return {
      success: false,
      message: `❌ Pinata connection failed: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}

/**
 * Get IPFS URL dari hash
 * (Utility function - doesn't need to be async)
 */
export async function getIPFSUrl(ipfsHash: string): Promise<string> {
  return `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
}
