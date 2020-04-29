import React from 'react';
import { Container, Row, Col } from 'reactstrap';

export const ResultsField = ({step, requests, response}) => {
  return (
    <Container id="results-field">
      <h2>{step}</h2>
      <Row>
        <Col className="results-field-col">
          <h3 className="results-field-header">Request to your server:</h3>
          <pre>{requests.reqToServer}</pre>
        </Col>
        <Col className="results-field-col">
          <h3 className="results-field-header">Request from server to Adyen:</h3>
          <pre>{requests.reqToAdyen}</pre>
        </Col>
      </Row>
      <Row>
        <Col className="results-field-col">
          <h3 className="results-field-header">Response:</h3>
          <pre>{response}</pre>
        </Col>
      </Row>
    </Container>
  );
};