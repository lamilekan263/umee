'use client'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod'

import { useToast } from "@/components/ui/use-toast"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToastAction } from '@/components/ui/toast';

import { chains, tokens } from '@/config';
import { transferCosmosTokens, transferEVMTokens } from '@/util/transfer';


// form schema
const formSchema = z.object({
    chain: z.enum(['ux', 'osmosis', 'ethereum', 'polygon']),
    token: z.enum(["UX", "ATOM", "OSMO", "ETH", "USDC", "USDT", "MATIC", "WETH"]),
    recipientAddress: z.string().min(5, "Recipient address should be greater than 5"),
    amount: z.string({
        required_error: "amount is required",
        invalid_type_error: "Amount must be a string",
    }).min(1, 'amount must be greate than zero'),

})



const TokenTransferForm = () => {
    const { toast } = useToast()
    const [loading, setIsLoading] = useState(false)

    const handleTransfer = async (data: any) => {
        const { chain, token, recipientAddress, amount } = data
        try {
            if (chain === "osmosis" || chain === "ux") {
                const { keplr } = window
                if (!keplr) {
                    return toast({
                        variant: "destructive",
                        title: "Keplr Wallet Not Found",
                        description: "Click the link to download wallet",
                        action: <ToastAction onClick={() => window?.open('https://metamask.io/download/', '_blank')} altText="Download">Download</ToastAction>,
                    })
                }
                setIsLoading(true)
                const result = await transferCosmosTokens({ chain, token, to: recipientAddress, amount })

                toast({
                    title: "Success",
                    description: `Your Transaction was successfully sent on ${result}`,

                })

            } else {

                if (!window.ethereum) {
                    return toast({
                        variant: "destructive",
                        title: "Metamask Wallet Not Found",
                        description: "Click the link to download wallet",
                        action: <ToastAction onClick={() => window?.open('https://metamask.io/download/', '_blank')} altText="Download">Download</ToastAction>,
                    })
                }
                setIsLoading(true)
                const result = await transferEVMTokens({ chain, token, to: recipientAddress, amount })
                toast({
                    title: "Success",
                    description: `Your Transaction was successfully sent on ${result}`,

                })
            }

        } catch (err) {
            toast({
                variant: "destructive",
                title: "Transaction failed",
                description: (err as Error).message,
            })
        } finally {
            setIsLoading(false);
        }
    };


    // form details
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            chain: '',
            token: '',
            recipientAddress: '',
            amount: ''
        },
    })


    return (
        <Card className='w-full md:w-3/6'>
            <CardHeader>
                <CardTitle className='text-center font-bold'>Transfer Token</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(handleTransfer)} >

                        <FormField

                            control={form.control}
                            name="chain"
                            render={({ field }) => (
                                <FormItem className='mb-1'>
                                    <FormLabel>Chain</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Chain" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {chains.map(chain => <SelectItem key={chain.id} value={chain.id}>{chain.name}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage className='text-xs' />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="token"
                            render={({ field }) => (
                                <FormItem className='mb-1'>
                                    <FormLabel>Token</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value} >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Token" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>

                                            {tokens[form.watch().chain]?.map((token, i) => <SelectItem key={`${token.address} + ${i}`} value={token.symbol}>{token.symbol}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage className='text-xs' />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="recipientAddress"
                            render={({ field }) => (
                                <FormItem className='mb-1'>
                                    <FormLabel>Recipient Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter Recipient's address" {...field} />
                                    </FormControl>
                                    <FormMessage className='text-xs' />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem className='mb-1'>
                                    <FormLabel>Token Amount</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Enter Token Amount' {...field} />
                                    </FormControl>
                                    <FormMessage className='text-xs' />
                                </FormItem>
                            )}
                        />
                        <Button className='w-full my-2' type='submit'>{loading ? "Transferring" : "Transfer"}</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default TokenTransferForm;