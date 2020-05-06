export const createResults = (path, endpoint, request, response) => {
  const reqToServer = {
    url: `${path}${endpoint}`,
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: request
  };

  const reqToAdyen = {
    url: `https://checkout-test.adyen.com/v51${endpoint}`,
    method: 'POST',
    headers: {
      'X-API-key': '<YOUR KEY HERE>',
      'Content-type': 'application/json'
    },
    body: request
  };

  return [
    {title: 'Request to your Server', body: JSON.stringify(reqToServer, null, 2)},
    {title: 'Request to Adyen', body: JSON.stringify(reqToAdyen, null ,2)},
    {title: 'Response from Adyen', body: JSON.stringify(response, null, 2)}
  ];
};
