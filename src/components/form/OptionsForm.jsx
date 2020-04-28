import React, { useState } from 'react';
import {
  Form,
  Input,
  Label,
  Button,
  FormText,
  FormGroup,
  Container
} from 'reactstrap';
import { checkSetupOption } from '../helpers';
import '../../styles/Form.css';

export const OptionsForm = () => {
  const [toTest, setToTest] = useState({});

  const handleChange = e => {
    const newOptions = Object.assign({}, toTest, {
      [e.target.name]: e.target.value
    });

    setToTest(newOptions);
  };

  let additionalDetails;

  if(toTest.adyenSetup === 'component' && toTest.component && toTest.component === 'Cards') {
    additionalDetails = checkSetupOption(toTest.component);
  };

  console.log(toTest);
  return (
    <Container>
      <Form onChange={handleChange}>
        <FormGroup>
          <Label for="adyenSetup">What would you like to test?</Label>
          <Input type="select" name="adyenSetup" id="adyen-setup" defaultValue="">
            <option value="" disabled>---Select One---</option>
            <option value="payByLink">Pay By Link</option>
            <option value="dropIn">Drop-in</option>
            <option value="component">Components</option>
            <option value="apiOnly">API Only</option>
          </Input>
        </FormGroup>
        {checkSetupOption(toTest.adyenSetup)}
        {additionalDetails}
        <div id="form-button-container">
          <Button id="clear-form" className="form-button" color="secondary">Clear</Button>
          <Button id="submit-form" className="form-button" color="success">Submit</Button>
        </div>
      </Form>
    </Container>
  );
};