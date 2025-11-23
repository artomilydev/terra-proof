# 📋 Vercel Deployment Checklist

## ✅ Pre-Deployment Checklist

### 1. Environment Variables
Pastikan semua environment variables sudah diset di Vercel Dashboard:

**Required Variables:**
```env
✅ PINATA_API_KEY
✅ PINATA_SECRET_KEY
✅ NEXT_PUBLIC_STORAGE_PROVIDER=ipfs
✅ NEXT_PUBLIC_NFT_PACKAGE_ID=0x5eafb2aedb4d3d97ff47f2a2b13bcbc2b8c2d1c86db45fd114bb2b10250b4394
✅ NEXT_PUBLIC_SUI_NETWORK=testnet
```

**Cara Set di Vercel:**
1. Buka project di Vercel Dashboard
2. Settings > Environment Variables
3. Add variable satu per satu
4. ⚠️ PENTING: Redeploy setelah menambah env vars!

---

## 🐛 Debugging Mint Issues

### Error yang biasa terjadi:

#### 1. "Server Action payload too large"
**Penyebab:** File image terlalu besar dikirim ke Server Action

**Solusi:**
- ✅ Fixed di `next.config.ts` dengan `bodySizeLimit: '10mb'`
- Pastikan file < 10MB
- Redeploy jika baru update config

#### 2. "Pinata API keys not configured"
**Penyebab:** Environment variables tidak tersedia

**Solusi:**
1. Check Vercel Dashboard > Settings > Environment Variables
2. Pastikan `PINATA_API_KEY` dan `PINATA_SECRET_KEY` ada
3. Redeploy setelah menambah env vars

#### 3. "Upload timeout"
**Penyebab:** Network issue atau file terlalu besar

**Solusi:**
- Compress image sebelum upload
- Check internet connection
- Retry (sudah ada automatic retry 3x)

---

## 🚀 Deployment Steps

### Step 1: Push to GitHub
```bash
git add .
git commit -m "fix: Add Vercel configuration for file uploads"
git push origin main
```

### Step 2: Verify Environment Variables
1. Buka Vercel Dashboard
2. Settings > Environment Variables
3. Pastikan semua variable ada untuk **Production**

### Step 3: Redeploy
```bash
# Via Dashboard: Deployments > ⋮ > Redeploy
# Or force redeploy via CLI:
vercel deploy --prod --force
```

---

**Last Updated:** November 24, 2025
