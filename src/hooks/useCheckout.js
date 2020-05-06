import { useState, useEffect } from 'react';
import { makePaymentReq } from '../requests';

export const useCheckout = (config, loaded) => {
  const [ checkout, setCheckout ] = useState(false);

  const makePayment = ({ paymentMethod }, { amount, merchantAccount, merchantReference: reference }) => {
    const paymentReq = {
      amount,
      reference,
      paymentMethod,
      merchantAccount
    };

    return makePaymentReq(paymentReq);
  };

  useEffect(() => {
    if (loaded) {
      const component = new window.AdyenCheckout({
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

      setCheckout(component);
    }
  }, [config]);

  return [checkout];
};