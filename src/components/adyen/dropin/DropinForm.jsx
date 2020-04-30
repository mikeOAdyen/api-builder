import React, { useState } from 'react';
import { map } from 'lodash';
import {
  Form,
  Button,
  Container,
} from 'reactstrap';
import { Dropin } from './Dropin';
import { FormInput } from '../../form/FormInput';
import { ResultsModal } from '../results/ResultsModal';
import { createResults } from '../../../helpers/createResults';
import { getPaymentMethods } from './config';
import '../../../styles/DropinForm.css';

const paymentOpts = [
  'channel',
  'countryCode',
  'merchantAccount'
];

const amountOpts = [
  'value',
  'currency'
];

const accountInfo = [
  'baseApiUrl'
];

const allOpts = [...accountInfo, ...paymentOpts, ...amountOpts];

export const DropinForm = () => {
  const [modal, setModal] = useState(false);
  const [payOpts, setPayOpts] = useState({
    amount: {}
  });
  const [account, setAccount] = useState({})
  const [results, setResults] = useState({});
  const [dropinConfig, setDropinConfig] = useState(null);
  
  const toggle = () => setModal(!modal);
  
  const handleChange = e => {
    const { name, value } = e.target;
    if (amountOpts.includes(name)) {
      const newAmount = Object.assign({}, payOpts.amount, { 
        // convert string from input to number
        [name]: name === 'value' ? Number(value) : value 
      });
      setPayOpts({...payOpts, amount: newAmount});
    } else if (accountInfo.includes(name)) {
      setAccount({ [name]: value });
    } else {
      setPayOpts(Object.assign({}, payOpts, { [name]: value }));
    }
  };

  const getPaymentOpts = async e => {
    e.preventDefault();
    try {
      const response = await getPaymentMethods(payOpts);
      const config = await response.json();
      const dropInRes = createResults('Drop-in Initialization', account.baseApiUrl, '/paymentMethods', payOpts, config);

      setResults(dropInRes);
      setDropinConfig(config);
    } catch (err) {
      console.error('error retrieving payment options', err);
    }
  };

  const resetForm = () => {
    setDropinConfig(null);
  };

  if (dropinConfig) {
    return (
      <Container id="dropin-container">
        <ResultsModal modal={modal} toggle={toggle} results={results} />
        <Dropin config={dropinConfig} />
        <Button onClick={resetForm}>Reset</Button>
      </Container>
    )
  }

  return (
    <Container id="dropin-form-container">      
      <Form id="dropin-form" onSubmit={getPaymentOpts}>
        {map(allOpts, option => {
          return (
            <FormInput key={option} option={option} handleChange={handleChange} />
          )
        })}
        <Button type="submit" color="success">Submit</Button>
      </Form>
    </Container>
  )
};