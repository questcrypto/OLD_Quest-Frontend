import { useEffect } from 'react';

import { useWeb3Context } from 'web3-react';

export default function MyComponent() {
    const context = useWeb3Context()

    useEffect(() => {
        context.setFirstValidConnector(['MetaMask', 'Infura'])
    }, [])

    //  console.log(context,"contextcontext");
    

            if (!context.active && !context.error) {
                // const address = window.ethereum.enable().then((res:any) =>{

                //     console.log(res,"addressaddressaddress");
                // })
                return 
                
                
            } else if (context.error) {
                //error
            } else {
                // success
            }
}

