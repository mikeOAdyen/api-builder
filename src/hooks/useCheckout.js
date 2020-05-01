import { useState, useEffect } from 'react';

const cachedScripts = [];

export const useCheckout = config => {
  console.log('called with', config);
  const [state, setState] = useState({
    loaded: false,
    error: false
  });

  const checkoutScriptUrl = 'https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/3.0.0/adyen.js';

  useEffect(() => {
      if (cachedScripts.includes(checkoutScriptUrl)) {
          setState({
            loaded: true,
            error: false
          });  
      } else {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = 'https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/3.0.0/adyen.css';
        document.head.appendChild(link);
        
        let script = document.createElement('script');
        script.src = checkoutScriptUrl;
        script.async = true;

        const onScriptLoad = () => {
          setState({
            loaded: true,
            error: false
          });
          cachedScripts.push(checkoutScriptUrl);
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