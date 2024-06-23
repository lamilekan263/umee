
import { getChain } from '@/data/chain';
import { SigningStargateClient } from '@cosmjs/stargate';


export const getKeplrSigner = async (chain: string) => {
    if (!window.keplr) {
        throw new Error('Keplr extension not found');
    }

    const offlineSigner = window.getOfflineSigner!(chain);
    return offlineSigner
};

export const getKeplrSigningClientAndAddress = async (chainid: string) => {

    const chain = getChain(chainid)

    const signer = await getKeplrSigner(chain?.chainId || '');
    const client = await SigningStargateClient.connectWithSigner(chain?.rpcUrl || '', signer);
    const accounts = await signer?.getAccounts();
    const address = accounts && accounts[0]?.address;

    return {
        client,
        address
    }
};

