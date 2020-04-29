import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

export const FormInput = props => {
  const { option, handleChange } = props;
  return (
    <FormGroup key={option} className="dropin-option-container">
      <Label for={option}>{option}</Label>
      <Input name={option} type='text' onChange={handleChange} required/>
    </FormGroup>
  );
};
