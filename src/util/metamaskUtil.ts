import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';



export const getMetamaskSigner = async () => {
  const provider = await detectEthereumProvider();
  await (provider as any).request({ method: 'eth_requestAccounts' });
  const ethersProvider = new ethers.BrowserProvider(provider as any);
  return ethersProvider.getSigner();
};