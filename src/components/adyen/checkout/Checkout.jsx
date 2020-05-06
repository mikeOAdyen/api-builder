import React from 'react';
import { checkoutInit } from './checkoutInit';
import './Checkout.css';

const Checkout = () => {
  return (
    <div id="checkout">
      <h3 id="rendered-result-title">Rendered Result</h3>
    </div>
  )
};

export default React.memo(checkoutInit(Checkout))