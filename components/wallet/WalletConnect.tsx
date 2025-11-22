"use client";

import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import { Button } from "../ui/Button";
import { Wallet } from "lucide-react";

export function WalletConnect() {
  const account = useCurrentAccount();

  return (
    <div className="wallet-connect">
      <ConnectButton
        connectText={
          <Button variant="primary" size="sm" className="w-full">
            <Wallet className="w-4 h-4 mr-2" />
            Connect Wallet
          </Button>
        }
      />
      {account && (
        <div className="text-xs text-slate-400 mt-2 text-center font-mono">
          {account.address.slice(0, 6)}...{account.address.slice(-4)}
        </div>
      )}
    </div>
  );
}
