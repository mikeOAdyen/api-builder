import React, { useState } from 'react';
import {
  Form,
  Input,
  Label,
  Button,
  FormText,
  FormGroup
} from 'reactstrap';

export const OptionsForm = () => {
  const [toTest, setToTest] = useState({});

  const handleChange = e => {
    const newOptions = Object.assign({}, toTest, {
      [e.target.name]: e.target.value
    });

    setToTest(newOptions);
  };

  return (
    <Form onChange={handleChange}>
      <FormGroup>
        <Label for="adyen-setup">What would you like to test?</Label>
        <Input type="select" name="adyenSetup" id="adyen-setup">
          <option value="payByLink">Pay By Link</option>
          <option value="dropIn">Drop-in</option>
          <option value="components">Components</option>
          <option value="apiOnly">API Only</option>
        </Input>
      </FormGroup>
    </Form>
  );
};