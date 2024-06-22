import { ethers } from 'ethers';
import {  coins, MsgSendEncodeObject } from '@cosmjs/stargate';
import { MsgSend } from 'cosmjs-types/cosmos/bank/v1beta1/tx';

import {  CosmosTransferInterface, EVMTransferInterface, Token } from '../types';
import {  getKeplrSigningClientAndAddress } from './keplrUtil';
import { getMetamaskSigner } from './metamaskUtil';
import { erc20ABi, getToken } from '@/config';


export const transferCosmosTokens = async (
    { chain,
        token,
        to,
        amount }: CosmosTransferInterface
) => {
    
     const {client, address} = await getKeplrSigningClientAndAddress(chain);
    
    token = getToken({chainId:chain, tokenSymbol:token} )
     
    const amountInSmallestUnit = Math.floor(parseFloat(amount) * Math.pow(10, token.decimals));

     const msg: MsgSendEncodeObject = {
            typeUrl: "/cosmos.bank.v1beta1.MsgSend",
            value: MsgSend.fromPartial({
                fromAddress: address,
                toAddress: to,
                amount: coins(amountInSmallestUnit.toString(), token.address),
            }),
        };

    const fee = {
        amount: coins(5000, token.address),
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
    { 
        token,
        to,
        amount 
    }: EVMTransferInterface
) => {
    const signer = await getMetamaskSigner();
    const amountInWei = ethers.utils.parseUnits(amount, token.decimals);

    if (token.address === 'native') {
        const tx = await signer.sendTransaction({
            to,
            value: amountInWei,
        });
        await tx.wait();
        return tx.hash;
    } else {
        const erc20Abi = erc20ABi

        const contract = new ethers.Contract(token.address, erc20Abi, signer);
        const tx = await contract.transfer(to, amountInWei);
        await tx.wait();
        return tx.hash;
    }
};