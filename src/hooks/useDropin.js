import { useState, useEffect } from 'react';
import {dropInInit} from '../components/adyen/dropin/config';

let cachedScript = false;

export const useDropin = config => {
  const [state, setState] = useState({
    loaded: false,
    error: false
  });

  useEffect(() => {
      if (cachedScript) {
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
        script.src = 'https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/3.0.0/adyen.js';
        script.async = true;

        const onScriptLoad = async () => {
          setState({
            loaded: true,
            error: false
          });

          await dropInInit(config);
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
        cachedScript = true;
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