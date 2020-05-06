const { API_BASE_URL } = require('../config');

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