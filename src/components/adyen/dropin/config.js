const { API_BASE_URL } = require('../../../config');

const makePayment = action => {
  console.log('makePayment', action);
  return action;
};

const makeDetailsCall = details => {
  console.log('makeDetailsCall', details);
  return details;
};

export const getPaymentMethods = async details => {
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-type':'application/json'
      },
      body: JSON.stringify(details)
    };

    return await fetch(`${API_BASE_URL}/dropin/paymentMethods`, options);
  } catch (err) {
    console.error('Failed to get payment methods', err);
  }
}

export const dropInInit = async (config) => {
  const dropin = new window.AdyenCheckout(config);
  dropin.create('dropin', {
    onSubmit: async (request, dropin) => {
      try {
        const action = await makePayment(request.data);
        return await dropin.handleAction(action)
      } catch (err) {
        throw Error(err);
      }
    },
    onAdditionalDetails: async (details, dropin) => {
      try {
        const action = await makeDetailsCall(details.data);
        return await dropin.handleAction(action)
      } catch (err) {
        throw Error(err);
      }
    }
  }).mount('#dropin')
};