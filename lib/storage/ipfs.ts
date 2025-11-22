"use server";

// Server-side Pinata IPFS integration (moved to server action)
// Ini harus di server karena Pinata SDK menggunakan Node.js 'fs' module

import pinataSDK from "@pinata/sdk";

// Initialize Pinata (hanya di server)
const pinata = new pinataSDK({
  pinataApiKey: process.env.PINATA_API_KEY,
  pinataSecretApiKey: process.env.PINATA_SECRET_KEY,
});

export interface IPFSUploadResponse {
  ipfsHash: string;
  url: string;
  size: number;
}

/**
 * Server Action: Upload file ke IPFS via Pinata
 */
export async function uploadFileToIPFS(
  fileData: Buffer,
  fileName: string
): Promise<IPFSUploadResponse> {
  try {
    if (!process.env.PINATA_API_KEY || !process.env.PINATA_SECRET_KEY) {
      throw new Error("Pinata API keys not configured");
    }

    // Create a readable stream-like object from Buffer
    const stream = {
      buffer: fileData,
      originalname: fileName,
    };

    // Upload to IPFS
    const result = await pinata.pinFileToIPFS(stream as any, {
      pinataMetadata: {
        name: fileName,
      },
      pinataOptions: {
        cidVersion: 1,
      },
    });

    if (!result.IpfsHash) {
      throw new Error("Failed to upload to IPFS - no hash returned");
    }

    return {
      ipfsHash: result.IpfsHash,
      url: `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`,
      size: result.PinSize || 0,
    };
  } catch (error) {
    console.error("❌ Error uploading to IPFS:", error);
    throw error;
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
