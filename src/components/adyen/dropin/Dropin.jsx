import React from 'react';
import { useDropin } from '../../../hooks';
import '../../../styles/Form.css';

export const Dropin = ({ config }) => {
  const [loaded, error] = useDropin(config);

  if (loaded){
    return (
      <div id="dropin">
      </div>
    );
  }
  return <div id="dropin">{error}</div>
};