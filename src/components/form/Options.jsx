import React from 'react';
import { map } from 'lodash';
import {
  Input,
  Label,
  FormGroup
} from 'reactstrap';

export const Options = props => {
  return (
    <FormGroup>
      <Label for={props.type}>Which {props.type}?</Label>
      <Input type="select" name={props.type} defaultValue=''>
        <option value='' disabled>--Select an option--</option>
        {map(props.list, comp => (
          <option key={comp.name} value={comp.name}>{comp.name}</option>
        ))}
      </Input>
    </FormGroup>
  );
};