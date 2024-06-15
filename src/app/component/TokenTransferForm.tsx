'use client'
import React from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from "@/components/ui/use-toast"
import { z } from 'zod'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { Window as KeplrWindow } from "@keplr-wallet/types";
import { ToastAction } from '@/components/ui/toast';

const formSchema = z.object({
    chain: z.enum(["Osmosis", "UX Chain", "Ethereum", 'Polygon'], {
        required_error: 'Invalid  Chain',
        invalid_type_error: "Amount must be a string",

    }),
    token: z.enum(["OSMO", "UX", "ATOM", "ETH", "USDC", "USDT"], {
        required_error: 'Invalid  Token'
    }),
    recipientAddress: z.string().min(5, "Recipient address should be greater than 5"),
    amount: z.string({
        required_error: "amount is required",
        invalid_type_error: "Amount must be a string",
    }).min(1, 'amount must be greate than zero')
})


// export type TokenTransferParam = z.infer<typeof formSchema>

declare global {
    interface Window extends KeplrWindow { }
}

const TokenTransferForm = () => {
    const { toast } = useToast()
    const handleTransfer = (data: any) => {
        const { chain, token, recipientAddress, amount } = data
        if (token === "OSMO" || token === "UX" || token === "ATOM") {
            if (!window.keplr) {
                toast({
                    title: "Keplr Wallet Not Found",
                    description: "Click the link to download wallet",
                    action: <ToastAction onClick={() => window?.open('https://www.keplr.app/download', '_blank')} altText="Try again">Download</ToastAction>,
                })

            }
            
        }


    };
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
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Chain" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Osmosis">Osmosis</SelectItem>
                                            <SelectItem value="UX Chain">UX Chain</SelectItem>
                                            <SelectItem value="Ethereum">Ethereum</SelectItem>
                                            <SelectItem value="Polygon">Polygon</SelectItem>

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
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Token" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="OSMO">OSMO</SelectItem>
                                            <SelectItem value="UX">UX</SelectItem>
                                            <SelectItem value="ATOM">ATOM</SelectItem>
                                            <SelectItem value="ETH">ETH</SelectItem>
                                            <SelectItem value="USDC">USDC</SelectItem>
                                            <SelectItem value="USDT">USDT</SelectItem>
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
                        <Button className='w-full my-2' type='submit'>Send</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default TokenTransferForm;
