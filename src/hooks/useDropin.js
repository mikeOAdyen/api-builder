import { useState, useEffect } from 'react';
import {dropInInit} from '../components/adyen/dropin/config';

const cachedScripts = [];

export const useDropin = config => {
  console.log('called with config', config);
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
  
        dropInInit(config);
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
          dropInInit(config);
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