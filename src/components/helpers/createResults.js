const objectToString = object => {
  console.log(object);
  let string = '{\n';
  const keys = Object.keys(object);
  keys.forEach(key => {
    if(object[key] instanceof Array) {
      string = `${string}\n${key}:${object[key].map(item => objectToString(item)).join(',\n')}`;
    } else if (typeof object[key] === 'object'){
      string = `${string}\n${key}:${objectToString(object[key])}`
    } else {
      string = `${string}\n${key}:${object[key]}`
    }
  })

  return string + '}';
};

export const createResults = (step, path, request, response) => {
  const reqToServer = {
    url: `https://TODO:change-this-to-dynamic/${path}`,
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: request
  };

  const reqToAdyen = {
    url: `https://checkout-test.adyen.com/v51/${path}`,
    method: 'POST',
    headers: {
      'X-API-key': '<YOUR KEY HERE>',
      'Content-type': 'application/json'
    },
    body: request
  };

  return {
    step,
    requests: {
      reqToServer: JSON.stringify(reqToServer, null, 2),
      reqToAdyen: JSON.stringify(reqToAdyen, null ,2)
    },
    response: JSON.stringify(response, null, 2)
  };
};
