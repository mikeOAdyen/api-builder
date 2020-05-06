const { API_BASE_URL } = require('../config');

export const makePaymentReq = async details => {
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-type':'application/json'
      },
      body: JSON.stringify(details),
      json: true
    };

    return await fetch(`${API_BASE_URL}/checkout/payments`, options);
  } catch (err) {
    console.error('Failed to get payment methods', err);
  }
};