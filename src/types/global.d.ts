import { Window as KeplrWindow } from "@keplr-wallet/types";
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window extends KeplrWindow {
    ethereum?: MetaMaskInpageProvider;
    metamask?: MetaMaskInpageProvider; // Add this line if you have a property named 'metamask'
  }
}
