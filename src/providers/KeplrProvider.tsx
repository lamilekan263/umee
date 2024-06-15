'use client'
import { ChainProvider, defaultModalViews } from '@cosmos-kit/react';
import { wallets  } from "@cosmos-kit/keplr";
import { assets, chains } from 'chain-registry';
import "@interchain-ui/react/styles";

interface ProviderProps {
    children: React.ReactNode
}


export const KeplrContextProvider = ({ children }: ProviderProps) => (
    <ChainProvider chains={chains}
        wallets={wallets}
        assetLists={assets}
        modalViews={{
            ...defaultModalViews
        }}
        // walletConnectOptions={...}
    >
        {children}
    </ChainProvider>
);