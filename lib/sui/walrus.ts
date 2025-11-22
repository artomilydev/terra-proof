// Walrus Storage Integration
// Walrus adalah storage layer untuk Sui blockchain

export interface WalrusUploadResponse {
  blobId: string;
  url: string;
  size: number;
}

export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  location: string;
  date: string;
  category: string;
  attributes: {
    verificationScore: number;
    timestamp: number;
  };
}

// Walrus Publisher endpoint (akan berbeda untuk devnet/testnet/mainnet)
const WALRUS_PUBLISHER_URL =
  process.env.NEXT_PUBLIC_WALRUS_PUBLISHER_URL ||
  "https://publisher.walrus-testnet.walrus.space";

const WALRUS_AGGREGATOR_URL =
  process.env.NEXT_PUBLIC_WALRUS_AGGREGATOR_URL ||
  "https://aggregator.walrus-testnet.walrus.space";

/**
 * Upload file ke Walrus storage
 */
export async function uploadToWalrus(file: File): Promise<WalrusUploadResponse> {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${WALRUS_PUBLISHER_URL}/v1/store`, {
      method: "PUT",
      body: file,
    });

    if (!response.ok) {
      throw new Error(`Failed to upload to Walrus: ${response.statusText}`);
    }

    const data = await response.json();

    // Response dari Walrus berisi newlyCreated atau alreadyCertified
    const blobInfo = data.newlyCreated || data.alreadyCertified;

    if (!blobInfo) {
      throw new Error("Invalid response from Walrus");
    }

    return {
      blobId: blobInfo.blobObject.blobId,
      url: `${WALRUS_AGGREGATOR_URL}/v1/${blobInfo.blobObject.blobId}`,
      size: blobInfo.blobObject.size,
    };
  } catch (error) {
    console.error("Error uploading to Walrus:", error);
    throw error;
  }
}

/**
 * Upload NFT metadata ke Walrus
 */
export async function uploadMetadataToWalrus(
  metadata: NFTMetadata
): Promise<WalrusUploadResponse> {
  try {
    const metadataBlob = new Blob([JSON.stringify(metadata)], {
      type: "application/json",
    });

    const response = await fetch(`${WALRUS_PUBLISHER_URL}/v1/store`, {
      method: "PUT",
      body: metadataBlob,
    });

    if (!response.ok) {
      throw new Error(`Failed to upload metadata: ${response.statusText}`);
    }

    const data = await response.json();
    const blobInfo = data.newlyCreated || data.alreadyCertified;

    if (!blobInfo) {
      throw new Error("Invalid response from Walrus");
    }

    return {
      blobId: blobInfo.blobObject.blobId,
      url: `${WALRUS_AGGREGATOR_URL}/v1/${blobInfo.blobObject.blobId}`,
      size: blobInfo.blobObject.size,
    };
  } catch (error) {
    console.error("Error uploading metadata to Walrus:", error);
    throw error;
  }
}

/**
 * Retrieve file dari Walrus storage
 */
export async function retrieveFromWalrus(blobId: string): Promise<Blob> {
  try {
    const response = await fetch(`${WALRUS_AGGREGATOR_URL}/v1/${blobId}`);

    if (!response.ok) {
      throw new Error(`Failed to retrieve from Walrus: ${response.statusText}`);
    }

    return await response.blob();
  } catch (error) {
    console.error("Error retrieving from Walrus:", error);
    throw error;
  }
}

/**
 * Get URL untuk NFT image dari Walrus
 */
export function getWalrusImageUrl(blobId: string): string {
  return `${WALRUS_AGGREGATOR_URL}/v1/${blobId}`;
}
