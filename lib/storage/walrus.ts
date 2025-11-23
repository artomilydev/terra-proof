"use server";

/**
 * Walrus Storage Integration (Server Actions)
 * Walrus adalah decentralized storage network dari Sui ecosystem
 * 
 * Docs: https://docs.walrus.site/
 * Testnet Publisher: https://publisher.walrus-testnet.walrus.space
 * Testnet Aggregator: https://aggregator.walrus-testnet.walrus.space
 */

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

/**
 * Server Action: Upload file ke Walrus storage
 */
export async function uploadFileToWalrus(
  fileData: Buffer,
  fileName: string
): Promise<WalrusUploadResponse> {
  try {
    const publisherUrl = process.env.NEXT_PUBLIC_WALRUS_PUBLISHER_URL ||
      "https://publisher.walrus-testnet.walrus.space";
    const aggregatorUrl = process.env.NEXT_PUBLIC_WALRUS_AGGREGATOR_URL ||
      "https://aggregator.walrus-testnet.walrus.space";

    console.log(`📤 [Walrus] Uploading ${fileName} to Walrus...`);

    const response = await fetch(`${publisherUrl}/v1/store`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/octet-stream",
      },
      body: fileData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Walrus upload failed (${response.status}): ${errorText}`
      );
    }

    const data = await response.json();
    const blobInfo = data.newlyCreated || data.alreadyCertified;

    if (!blobInfo || !blobInfo.blobObject?.blobId) {
      throw new Error("Invalid response from Walrus");
    }

    const blobId = blobInfo.blobObject.blobId;
    const url = `${aggregatorUrl}/v1/${blobId}`;

    console.log(`✅ [Walrus] Upload successful!`);
    console.log(`   Blob ID: ${blobId}`);
    console.log(`   URL: ${url}`);

    return {
      blobId,
      url,
      size: blobInfo.blobObject.size || fileData.length,
    };
  } catch (error) {
    console.error("❌ [Walrus] Upload failed:", error);
    throw error;
  }
}

/**
 * Server Action: Upload NFT metadata ke Walrus
 */
export async function uploadMetadataToWalrus(
  metadata: NFTMetadata | Record<string, any>
): Promise<WalrusUploadResponse> {
  try {
    console.log(`📤 [Walrus] Uploading metadata to Walrus...`);

    const metadataString = JSON.stringify(metadata, null, 2);
    const buffer = Buffer.from(metadataString, "utf-8");

    const result = await uploadFileToWalrus(buffer, "metadata.json");

    console.log(`✅ [Walrus] Metadata uploaded successfully!`);
    return result;
  } catch (error) {
    console.error("❌ [Walrus] Metadata upload failed:", error);
    throw error;
  }
}

/**
 * Server Action: Retrieve file dari Walrus storage
 */
export async function retrieveFromWalrus(blobId: string): Promise<Buffer> {
  try {
    const aggregatorUrl = process.env.NEXT_PUBLIC_WALRUS_AGGREGATOR_URL ||
      "https://aggregator.walrus-testnet.walrus.space";

    console.log(`📥 [Walrus] Retrieving blob ${blobId}...`);

    const response = await fetch(`${aggregatorUrl}/v1/${blobId}`);

    if (!response.ok) {
      throw new Error(`Failed to retrieve from Walrus: ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log(`✅ [Walrus] Retrieved ${buffer.length} bytes`);
    return buffer;
  } catch (error) {
    console.error("❌ [Walrus] Retrieval failed:", error);
    throw error;
  }
}

/**
 * Get Walrus URL dari blob ID
 */
export async function getWalrusUrl(blobId: string): Promise<string> {
  const aggregatorUrl = process.env.NEXT_PUBLIC_WALRUS_AGGREGATOR_URL ||
    "https://aggregator.walrus-testnet.walrus.space";

  return `${aggregatorUrl}/v1/${blobId}`;
}
