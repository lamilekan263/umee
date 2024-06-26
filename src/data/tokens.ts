import { Chain, Token } from '../types';



export const tokens: { [chainId: string]: Token[] } = {
    'ux': [
        { symbol: 'UX', address: 'uux', decimals: 6 },
        { symbol: 'USDC', address: 'uusdc', decimals: 6 },
        { symbol: 'ATOM', address: 'uatom', decimals: 6 },
    ],
    'osmosis': [
        { symbol: 'OSMO', address: 'uosmo', decimals: 6 },
        { symbol: 'ATOM', address: 'uatom', decimals: 6 },
        { symbol: 'AKT', address: 'uakt', decimals: 6 },
    ],
    'ethereum': [
        { symbol: 'ETH', address: 'native', decimals: 18 },
        { symbol: 'USDC', address: '0x07865c6E87B9F70255377e024ace6630C1Eaa37F', decimals: 6 },
        { symbol: 'USDT', address: '0x509Ee0d083DdF8AC028f2a56731412edD63223B9', decimals: 6 },
    ],
    'polygon': [
        { symbol: 'MATIC', address: 'native', decimals: 18 },
        { symbol: 'USDC', address: '0x0FA8781a83E46826621b3BC094Ea2A0212e71B23', decimals: 6 },
        { symbol: 'WETH', address: '0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa', decimals: 18 },
    ],
};


interface GetTokenParams {
    chainId: string;
    tokenSymbol: string;
}

export const getToken = ({ chainId, tokenSymbol }: GetTokenParams): Token => {
    const token = tokens[chainId]?.find(token => token.symbol === tokenSymbol);
    if (!token) {
        throw new Error(`Token not found for chainId: ${chainId} and tokenSymbol: ${tokenSymbol}`);
    }
    return token;
};

// getTokenInterface

export const erc20ABi = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "to",
                "type": "address"
            },
            {
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "spender",
                "type": "address"
            },
            {
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "owner",
                "type": "address"
            },
            {
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "remaining",
                "type": "uint256"
            }
        ],
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    }
];