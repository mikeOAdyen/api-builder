import React, { useState } from 'react';
import { map } from 'lodash';
import {
  Form,
  Input,
  Label,
  Button,
  Container,
  FormGroup
} from 'reactstrap';
import { Dropin } from './Dropin';
import { FormInput } from '../../form/FormInput';
import { ResultsField } from '../../form/ResultsField';
import { createResults } from '../../helpers/createResults';
import { getPaymentMethods } from './config';


const paymentOpts = [
  'channel',
  'countryCode',
  'merchantAccount'
];
const amountOpts = [
  'value',
  'currency'
];

const allOpts = [...paymentOpts, ...amountOpts];

export const DropinForm = () => {
  const [amount, setAmount] = useState({});
  const [payOpts, setPayOpts] = useState({});
  const [results, setResults] = useState({});
  const [dropinConfig, setDropinConfig] = useState(null);

  const handleChange = e => {
    const { name, value } = e.target;
    if (amountOpts.includes(name)) {
      setAmount(Object.assign({}, amount, { 
        [name]: name === 'value' ? Number(value) : value 
      }));
    } else {
      setPayOpts(Object.assign({}, payOpts, { [name]: value }));
    }
  };

  const getPaymentOpts = async e => {
    e.preventDefault();
    try {
      const reqObj = Object.assign({}, payOpts, {
        amount
      });
      const response = await getPaymentMethods(reqObj);
      const config = await response.json();
      const dropInRes = createResults('Get Payment Options', 'paymentMethods', reqObj, config);
      console.log(config);
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
      <Container>
        <Dropin config={dropinConfig} />
        <ResultsField {...results} />
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
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  )
};