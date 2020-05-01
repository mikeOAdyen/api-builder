import { useState, useEffect } from 'react';
import {checkoutInit} from '../components/adyen/checkout/checkoutInit';

const cachedScripts = [];

export const useCheckout = (config, type, paymentOpts, account) => {
  console.log('called with', config, account);
  const [state, setState] = useState({
    loaded: false,
    error: false
  });

  const dropinScriptUrl = 'https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/3.0.0/adyen.js';

  useEffect(() => {
      if (cachedScripts.includes(dropinScriptUrl)) {
          setState({
            loaded: true,
            error: false
          });
  
        checkoutInit(config, type, paymentOpts, account);
      } else {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = 'https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/3.0.0/adyen.css';
        document.head.appendChild(link);
        
        let script = document.createElement('script');
        script.src = dropinScriptUrl;
        script.async = true;

        const onScriptLoad = () => {
          setState({
            loaded: true,
            error: false
          });
          cachedScripts.push(dropinScriptUrl);
          checkoutInit(config, type, paymentOpts, account);
        };

        const onScriptError = () => {
          setState({
            loaded: true,
            error: true
          });
        };

        script.addEventListener('load', onScriptLoad);
        script.addEventListener('error', onScriptError);

        document.body.appendChild(script);
        return () => {
          script.removeEventListener('load', onScriptLoad);
          script.removeEventListener('error', onScriptError);
        };
      }
    },
    [config]
  );

  return [state.loaded, state.error];
}