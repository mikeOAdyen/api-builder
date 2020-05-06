import React, { useState } from 'react';
import { map } from 'lodash';
import {
  Row,
  Col,
  Form,
  Button,
  Container,
} from 'reactstrap';
import Checkout from '../checkout/Checkout';
import { FormInput } from '../../form/FormInput';
import { ResultsCarousel } from '../results/ResultsCarousel';
import { useGetPaymentOpts } from '../../../hooks';
import './Dropin.css';

const paymentOpts = [
  'channel',
  'countryCode',
  'merchantAccount',
  'merchantReference'
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
  const [amount, setAmount] = useState({});
  const [payOpts, setPayOpts] = useState({});
  const [account, setAccount] = useState({});
  const [paymentMethods, setPaymentMethods, getPaymentMethods] = useGetPaymentOpts(null);
    
  const handleChange = e => {
    const { name, value } = e.target;
    if (amountOpts.includes(name)) {
      setAmount(Object.assign({}, amount, { 
        // convert string from input to number
        [name]: name === 'value' ? Number(value) : value 
      }));
    } else if (accountInfo.includes(name)) {
      setAccount(Object.assign({}, account, { [name]: value }));
    } else {
      setPayOpts(Object.assign({}, payOpts, { [name]: value }));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    getPaymentMethods({...payOpts, amount});
  }

  const resetForm = () => {
    setPaymentMethods(null);
  };

  if (paymentMethods) {
    return (
      <Container id="dropin-container">
        <Row xs={1} sm={1} md={2}>
          <Col>
            <ResultsCarousel baseUrl={account.baseApiUrl} path="/paymentMethods" reqData={payOpts} responseData={paymentMethods}/>
          </Col>
          <Col>
            <Checkout
              type="dropin"
              config={paymentMethods}
              account={account}
              paymentOpts={payOpts}
            />
          </Col>
        </Row>
        <Button onClick={resetForm}>Reset</Button>
      </Container>
    )
  }

  return (
    <Container id="dropin-form-container">      
      <Form id="dropin-form" onSubmit={handleSubmit}>
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