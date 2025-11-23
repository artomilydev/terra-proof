"use client";

import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import { Wallet } from "lucide-react";

export function WalletConnect() {
  const account = useCurrentAccount();

  return (
    <div className="wallet-connect">
      <ConnectButton 
        className="bg-linear-to-r! from-cyan-500! to-blue-500! text-white! font-semibold! px-6! py-3! rounded-xl! hover:from-cyan-600! hover:to-blue-600! transition-all! duration-200! border-0! shadow-lg! shadow-cyan-500/20!"
        connectText="Connect Wallet"
      />
      {account && (
        <div className="text-xs text-slate-400 mt-2 text-center font-mono">
          {account.address.slice(0, 6)}...{account.address.slice(-4)}
        </div>
      )}
    </div>
  );
}
