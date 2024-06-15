import React from 'react'
import { KeplrContextProvider } from './KeplrProvider'



interface ProviderProps {
    children: React.ReactNode
}



const Providers = ({ children }: ProviderProps) => {
    return (
        <KeplrContextProvider>{children}</KeplrContextProvider>
    )
}

export default Providers