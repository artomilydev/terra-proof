// Alternative IPFS client using API Routes instead of Server Actions
// This avoids payload size issues with Server Actions on Vercel

export interface IPFSUploadResponse {
  ipfsHash: string;
  hash: string;
  url: string;
  size: number;
}

/**
 * Upload file to IPFS via API Route (recommended for Vercel)
 */
export async function uploadToIPFSViaAPI(file: File): Promise<IPFSUploadResponse> {
  try {
    // Validate file size
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      throw new Error(`File too large: ${(file.size / 1024 / 1024).toFixed(2)}MB (max 10MB)`);
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      throw new Error('Only image files are supported');
    }

    console.log(`📤 [API Client] Uploading file via API route...`);
    console.log(`   File: ${file.name}`);
    console.log(`   Type: ${file.type}`);
    console.log(`   Size: ${(file.size / 1024).toFixed(2)}KB`);

    // Create FormData
    const formData = new FormData();
    formData.append('file', file);

    // Add retry logic
    let lastError: Error | null = null;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        console.log(`   Attempt ${attempt}/3...`);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `Upload failed with status ${response.status}`);
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error(result.message || 'Upload failed');
        }

        console.log(`✅ [API Client] Upload successful: ${result.url}`);

        return {
          ipfsHash: result.ipfsHash,
          hash: result.hash,
          url: result.url,
          size: result.size,
        };

      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        console.warn(`⚠️  [API Client] Attempt ${attempt} failed:`, lastError.message);

        if (attempt < 3) {
          const waitTime = Math.pow(2, attempt) * 1000;
          console.log(`   Retrying in ${waitTime / 1000}s...`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
        }
      }
    }

    throw lastError || new Error('Upload failed after 3 attempts');

  } catch (error) {
    console.error('❌ [API Client] Error:', error);

    if (error instanceof Error) {
      if (error.message.includes('too large')) {
        throw new Error('File is too large. Please use an image smaller than 10MB.');
      }
      if (error.message.includes('Only image')) {
        throw error;
      }
      if (error.message.includes('timeout') || error.message.includes('timed out')) {
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
 * Upload metadata to IPFS via API Route
 */
export async function uploadMetadataViaAPI(metadata: any): Promise<IPFSUploadResponse> {
  try {
    console.log(`📤 [API Client] Uploading metadata via API route...`);

    const response = await fetch('/api/upload', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(metadata),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Metadata upload failed');
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Metadata upload failed');
    }

    console.log(`✅ [API Client] Metadata uploaded: ${result.url}`);

    return {
      ipfsHash: result.ipfsHash,
      hash: result.hash,
      url: result.url,
      size: result.size,
    };

  } catch (error) {
    console.error('❌ [API Client] Metadata upload error:', error);
    throw error;
  }
}
