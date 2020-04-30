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
import { checkSetupOption } from '../../helpers';
import '../../styles/Form.css';

export const OptionsForm = props => {
  const [toTest, setToTest] = useState({});

  const handleChange = e => {
    const newOptions = Object.assign({}, toTest, {
      [e.target.name]: e.target.value
    });

    setToTest(newOptions);
  };

  let additionalDetails;

  if(props.type === 'component' && toTest.component && toTest.component === 'Cards') {
    additionalDetails = checkSetupOption(toTest.component);
  };

  console.log(toTest);
  return (
    <Container>
      <Form onChange={handleChange}>
        {checkSetupOption(props.type)}
        {additionalDetails}
        <div id="form-button-container">
          <Button id="clear-form" className="form-button" color="secondary">Clear</Button>
          <Button id="submit-form" className="form-button" color="success">Submit</Button>
        </div>
      </Form>
    </Container>
  );
};