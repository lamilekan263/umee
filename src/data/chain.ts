import { Chain } from "@/types";



export const chains: Chain[] = [
    {
        id: 'ux',
        name: 'UX Chain Testnet',
        rpcUrl: 'https://umee-testnet.rpc.l0vd.com',
        chainId: 'umee-1',
        bech32Prefix: 'ux',
    },
    {
        id: 'osmosis',
        name: 'Osmosis Testnet',
        rpcUrl: "https://osmosis-testnet-rpc.polkachu.com",
        chainId: 'osmo-test-5',
        bech32Prefix: 'osmo',
    },
    {
        id: 'ethereum',
        name: 'Ethereum Sepolia',
        rpcUrl: `https://sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API}`,
        chainId: '11155111',
    },
    {
        id: 'polygon',
        name: 'Polygon Amoy',
        rpcUrl: `https://polygon-amoy.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API}`,
        chainId: '80001',
    },
];

export const getChain = (id: string) => chains.find(chain => chain.id === id)