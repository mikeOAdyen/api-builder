import { makePaymentReq } from './makePaymentReq';
import { createResults } from '../results/createResults';

const showResult = (response, { account, paymentOpts }) => {
  const results = createResults('Make Payment', `${account.baseApiUrl}`, '/payments', paymentOpts, response);
  console.log(results);
};

const makePayment = ({ paymentMethod }, { amount, merchantAccount, reference }) => {
  const paymentReq = {
    merchantAccount,
    amount,
    paymentMethod,
    reference
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
}

export const checkoutInit = (config, type, paymentOpts, account) => {
  console.log('account', account)
  const checkout = new window.AdyenCheckout({
    ...config,
    onSubmit: async (state, checkout) => {
      try {
        const response = await makePayment(state.data, {...paymentOpts, reference: account.shopperReference});
        return await checkForAction(response, checkout, {paymentOpts, account });
      } catch (err) {
        throw Error(err);
      }
    },
    onAdditionalDetails: async (details, checkout) => {
      try {
        const response = await makeDetailsCall(details.data);
        return await checkForAction(response, checkout, {paymentOpts, account });
      } catch (err) {
        throw Error(err);
      }
    }
  });
  checkout.create(type).mount('#checkout');
};