export interface Chain {
  id: string;
  name: string;
  rpcUrl: string;
  chainId: string;
  bech32Prefix?: string;
}

export interface Token {
  symbol: string;
  address: string;
  decimals: number;
}

export interface CosmosTransferInterface {
    chain: string,
    token: Token,
    to: string,
    amount: string
}

export interface EVMTransferInterface {
  
    token: Token,
    to: string,
    amount: string
}