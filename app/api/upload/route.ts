import { NextRequest, NextResponse } from 'next/server';
import pinataSDK from '@pinata/sdk';
import { Readable } from 'stream';

// Initialize Pinata
const pinata = new pinataSDK({
  pinataApiKey: process.env.PINATA_API_KEY,
  pinataSecretApiKey: process.env.PINATA_SECRET_KEY,
});

export const runtime = 'nodejs';
export const maxDuration = 30; // 30 seconds timeout

export async function POST(request: NextRequest) {
  try {
    console.log('📤 [API Route] Upload request received');

    // Check API keys
    if (!process.env.PINATA_API_KEY || !process.env.PINATA_SECRET_KEY) {
      console.error('❌ [API Route] Pinata API keys not configured');
      return NextResponse.json(
        { error: 'IPFS service not configured' },
        { status: 500 }
      );
    }

    // Get FormData
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    console.log(`📤 [API Route] Processing file: ${file.name}`);
    console.log(`   Size: ${(file.size / 1024).toFixed(2)}KB`);
    console.log(`   Type: ${file.type}`);

    // Validate file size
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `File too large: ${(file.size / 1024 / 1024).toFixed(2)}MB (max 10MB)` },
        { status: 400 }
      );
    }

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log(`📤 [API Route] Uploading to IPFS...`);

    // Create readable stream
    const readableStream = Readable.from(buffer);

    // Upload to IPFS with timeout
    const uploadPromise = pinata.pinFileToIPFS(readableStream, {
      pinataMetadata: {
        name: file.name,
      },
      pinataOptions: {
        cidVersion: 1,
      },
    });

    // Add timeout
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Upload timeout after 30 seconds')), 30000);
    });

    const result = await Promise.race([uploadPromise, timeoutPromise]);

    if (!result.IpfsHash) {
      throw new Error('Failed to upload to IPFS - no hash returned');
    }

    console.log(`✅ [API Route] Upload successful!`);
    console.log(`   Hash: ${result.IpfsHash}`);
    console.log(`   Size: ${(result.PinSize / 1024).toFixed(2)}KB`);

    return NextResponse.json({
      success: true,
      ipfsHash: result.IpfsHash,
      hash: result.IpfsHash,
      url: `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`,
      size: result.PinSize,
    });

  } catch (error) {
    console.error('❌ [API Route] Error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json(
      { 
        error: 'Upload failed',
        message: errorMessage,
        details: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

// Metadata upload endpoint
export async function PUT(request: NextRequest) {
  try {
    console.log('📤 [API Route] Metadata upload request received');

    if (!process.env.PINATA_API_KEY || !process.env.PINATA_SECRET_KEY) {
      return NextResponse.json(
        { error: 'IPFS service not configured' },
        { status: 500 }
      );
    }

    const metadata = await request.json();

    console.log(`📤 [API Route] Uploading metadata...`);

    const result = await pinata.pinJSONToIPFS(metadata, {
      pinataMetadata: {
        name: `${metadata.name}-metadata`,
      },
      pinataOptions: {
        cidVersion: 1,
      },
    });

    if (!result.IpfsHash) {
      throw new Error('Failed to upload metadata');
    }

    console.log(`✅ [API Route] Metadata uploaded: ${result.IpfsHash}`);

    return NextResponse.json({
      success: true,
      ipfsHash: result.IpfsHash,
      hash: result.IpfsHash,
      url: `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`,
      size: result.PinSize || 0,
    });

  } catch (error) {
    console.error('❌ [API Route] Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Metadata upload failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
