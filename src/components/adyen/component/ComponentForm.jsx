import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'reactstrap';
import { Options } from '../../form/Options';
import { cardList, componentList } from '../../../helpers';
import '../../../styles/Form.css';

export const ComponentForm = props => {
  const [toTest, setToTest] = useState({});
  const [config, setConfig] = useState({});

  const handleChange = e => {
    const newOptions = Object.assign({}, toTest, {
      [e.target.name]: e.target.value
    });

    setToTest(newOptions);
  };

  let additionalDetails;

  if(toTest.component && toTest.component === 'Cards') {
    additionalDetails = <Options type='card' list={cardList}/>;
  };

  return (
    <Container>
      <Form onChange={handleChange}>
        <Options type='component' list={componentList}/>
        {additionalDetails}
        <div id="form-button-container">
          <Button id="clear-form" className="form-button" color="secondary">Clear</Button>
          <Button id="submit-form" className="form-button" color="success">Submit</Button>
        </div>
      </Form>
    </Container>
  );
};