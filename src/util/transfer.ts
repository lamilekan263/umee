import { ethers } from 'ethers';
import { coins, MsgSendEncodeObject } from '@cosmjs/stargate';
import { MsgSend } from 'cosmjs-types/cosmos/bank/v1beta1/tx';

import { Token, TransferInterface } from '../types';
import { getKeplrSigningClientAndAddress } from './keplrUtil';
import { getMetamaskSigner } from './metamaskUtil';
import { erc20ABi, getToken } from '@/config';


export const transferCosmosTokens = async (
  { chain,
    token,
    to,
    amount }: TransferInterface
) => {

  const { client, address } = await getKeplrSigningClientAndAddress(chain);

  const fetchedToken = getToken({ chainId: chain, tokenSymbol: token })
  const amountInSmallestUnit = Math.floor(parseFloat(amount) * Math.pow(10, fetchedToken.decimals));

  const msg: MsgSendEncodeObject = {
    typeUrl: "/cosmos.bank.v1beta1.MsgSend",
    value: MsgSend.fromPartial({
      fromAddress: address,
      toAddress: to,
      amount: coins(amountInSmallestUnit.toString(), fetchedToken.address),
    }),
  };

  const fee = {
    amount: coins(5000, fetchedToken.address),
    gas: '200000',
  };
  // const fee = calculateFee(80000, GasPrice.fromString('0.025uosmo'));

  const result = await client.signAndBroadcast(address, [msg], fee);
  if (result.code !== 0) {
    throw new Error(`Transaction failed: ${result.rawLog}`);
  }
  return result.transactionHash;
};





export const transferEVMTokens = async (
  { chain, token, to, amount }: TransferInterface
) => {
  try {

    const fetchedToken = getToken({ chainId: chain, tokenSymbol: token })
    const signer = await getMetamaskSigner();
    const amountInWei = ethers.parseUnits(amount, fetchedToken.decimals);

    if (fetchedToken.address === 'native') {
      const tx = await signer.sendTransaction({
        to,
        value: amountInWei,
      });
      await tx.wait();
      return tx.hash;
    } else {
      if (!ethers.isAddress(fetchedToken.address)) {
        throw new Error(`Invalid token address: ${fetchedToken.address}`);
      }


      const contract = new ethers.Contract(fetchedToken.address, erc20ABi, signer);

      const tx = await contract.transfer(to, amountInWei);
      await tx.wait();
      return tx.hash;
    }
  } catch (error) {
    console.error('Error in transferEVMTokens:', error);
    throw error;
  }
};