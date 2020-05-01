import React from 'react';
import { useCheckout } from '../../../hooks/useCheckout';
import './Checkout.css';

export const Checkout = ({ config, type, paymentOpts, account }) => {
  const [loaded, error] = useCheckout(config, type, paymentOpts, account);

  if (loaded){
    return (
      <div id="checkout">
      </div>
    );
  }
  return <div id="checkout">{error}</div>
};