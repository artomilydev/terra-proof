"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Upload,
  MapPin,
  Calendar,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { useCurrentAccount, useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { mintNFT } from "@/lib/sui/nft";
import { useRouter } from "next/navigation";

export default function MintPage() {
  const account = useCurrentAccount();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();
  const router = useRouter();

  const [score, setScore] = useState(85);
  const [isMinting, setIsMinting] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  // Form states
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    category: "Beach",
    price: "",
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      // Update verification score based on file
      const newScore = Math.floor(Math.random() * 15) + 85;
      setScore(newScore);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleMint = async () => {
    if (!account) {
      alert("Please connect your Sui wallet first!");
      return;
    }

    if (!uploadedFile) {
      alert("Please upload an image!");
      return;
    }

    if (!formData.title || !formData.description || !formData.location || !formData.date || !formData.price) {
      alert("Please fill all required fields!");
      return;
    }

    setIsMinting(true);

    try {
      const txDigest = await mintNFT(
        {
          name: formData.title,
          description: formData.description,
          imageFile: uploadedFile,
          location: formData.location,
          date: formData.date,
          category: formData.category,
          price: parseFloat(formData.price),
          verificationScore: score,
        },
        signAndExecute
      );

      alert(`NFT minted successfully! Transaction: ${txDigest}`);
      
      // Redirect to profile or marketplace
      router.push("/profile");
    } catch (error) {
      console.error("Error minting NFT:", error);
      alert("Failed to mint NFT. Please try again.");
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />

      <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 lg:mb-8 mt-16 lg:mt-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Mint Travel Proof NFT
          </h1>
          <p className="text-sm sm:text-base text-slate-400">
            Upload your travel photo and create a trending NFT
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Upload & Form */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Upload Area */}
            <Card variant="glass" className="p-4 sm:p-6 lg:p-8">
              <label
                htmlFor="file-upload"
                className="border-2 border-dashed border-slate-700 rounded-2xl p-6 sm:p-8 lg:p-12 text-center hover:border-cyan-500/50 transition-colors cursor-pointer block"
              >
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-cyan-500/20 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                  {uploadedFile ? uploadedFile.name : "Upload Travel Photo"}
                </h3>
                <p className="text-sm sm:text-base text-slate-400 mb-3 sm:mb-4">
                  Drag and drop or click to browse
                </p>
                <p className="text-xs sm:text-sm text-slate-500">
                  Supported: JPG, PNG, GIF (Max 10MB)
                </p>
              </label>
            </Card>

            {/* Metadata Form */}
            <Card variant="glass" className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">
                NFT Details
              </h3>

              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2">
                    Title
                  </label>
                  <Input
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Mount Fuji Sunrise"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none text-sm sm:text-base"
                    rows={4}
                    placeholder="Describe your travel experience..."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                      Location
                    </label>
                    <Input
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="e.g., Tokyo, Japan"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                      Date
                    </label>
                    <Input
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      type="date"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 text-white rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm sm:text-base"
                  >
                    <option>Beach</option>
                    <option>Mountain</option>
                    <option>City</option>
                    <option>Forest</option>
                    <option>Desert</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2">
                    Price (SUI)
                  </label>
                  <Input
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    type="number"
                    placeholder="0.00"
                    step="0.1"
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Verification Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Verification Score */}
            <Card variant="gradient" className="p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-4">
                Verification Score
              </h3>

              <div className="relative mb-4 sm:mb-6">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 sm:border-8 border-slate-700 mx-auto flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-3xl sm:text-4xl font-bold text-cyan-400">
                      {score}
                    </p>
                    <p className="text-xs text-slate-400">/ 100</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
                  <span className="text-slate-300">Location trending</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
                  <span className="text-slate-300">Timestamp validated</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400" />
                  <span className="text-slate-300">Image quality check</span>
                </div>
              </div>
            </Card>

            {/* Preview */}
            <Card variant="glass" className="p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-4">
                <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
                Preview
              </h3>

              <div className="aspect-square rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-4 overflow-hidden">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <p className="text-sm sm:text-base text-slate-500">
                    No image uploaded
                  </p>
                )}
              </div>

              {previewUrl ? (
                <Badge
                  variant="success"
                  className="w-full justify-center text-xs sm:text-sm"
                >
                  Ready to mint
                </Badge>
              ) : (
                <Badge
                  variant="info"
                  className="w-full justify-center text-xs sm:text-sm"
                >
                  Upload photo to preview
                </Badge>
              )}
            </Card>

            {/* Mint Button */}
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={handleMint}
              disabled={isMinting || !account || !uploadedFile}
            >
              {isMinting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Minting...
                </>
              ) : account ? (
                "Mint NFT"
              ) : (
                "Connect Wallet to Mint"
              )}
            </Button>

            <p className="text-xs text-slate-500 text-center">
              {account
                ? "By minting, you agree to our terms and conditions"
                : "Connect your Sui wallet to start minting"}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
