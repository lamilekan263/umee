import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';



export const getMetamaskSigner = async () => {
  const provider = await detectEthereumProvider();

  await (provider as any).request({ method: 'eth_requestAccounts' });
  const ethersProvider = new ethers.providers.Web3Provider(provider as any);
  return ethersProvider.getSigner();
};