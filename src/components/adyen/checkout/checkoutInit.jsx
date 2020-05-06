import React from 'react';
import { createResults } from '../results/createResults';
import { makePaymentReq } from '../../../requests/makePaymentReq';
import { useCheckoutScript } from '../../../hooks/useCheckoutScript';

export const checkoutInit = WrappedComponent => 
  ({ config, type, paymentOpts, account, setResults }) => {
    const [loaded, error] = useCheckoutScript(config);

    const showResult = (response, { account, paymentOpts }) => {
      const newResults = createResults('Make Payment', `${account.baseApiUrl}`, '/payments', paymentOpts, response);
      setResults(newResults);
    };

    const makePayment = ({ paymentMethod }, { amount, merchantAccount, merchantReference: reference }) => {
      const paymentReq = {
        amount,
        reference,
        paymentMethod,
        merchantAccount
      };

      return makePaymentReq(paymentReq);
    };

    const makeDetailsCall = details => {
      console.log('makeDetailsCall', details);
      return details;
    };

    const checkForAction = async (response, checkout, options) => {
      const results = await response.json();
      return results.action 
        ? checkout.handleAction(results.action)
        : showResult(results, options);
    };

    if (loaded) {
      const checkout = new window.AdyenCheckout({
        ...config,
        onSubmit: async (state, checkout) => {
          try {
            const response = await makePayment(state.data, {...paymentOpts });
            return await checkForAction(response, checkout, { paymentOpts, account });
          } catch (err) {
            throw Error(err);
          }
        },
        onAdditionalDetails: async (details, checkout) => {
          try {
            const response = await makeDetailsCall(details.data);
            return await checkForAction(response, checkout, { paymentOpts, account });
          } catch (err) {
            throw Error(err);
          }
        }
      });
      
      checkout.create(type).mount('#checkout');
    } else if (error) {
      setResults({ message: 'Error intializing checkout', error });
    }

    return <WrappedComponent loaded={loaded}/>
  };