import React from 'react';
import './Checkout.css';
import { checkoutInit } from './checkoutInit';

const Checkout = props => {
  console.log(props);
  return (
    <div id="checkout">
      <h3 id="rendered-result-title">Rendered Result</h3>
    </div>
  )
};

export default React.memo(checkoutInit(Checkout))