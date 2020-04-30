import React from "react";
import {
  Modal,
  Button,
  ModalBody,
  ModalHeader,
  ModalFooter
} from "reactstrap";
import { ResultsCarousel } from "./ResultsCarousel";
import '../../../styles/ResultsModal.css';

export const ResultsModal = ({modal, toggle, results}) => {
  return (
    <div>
      <Button onClick={toggle} color="success">How did we get here?</Button>
      <Modal isOpen={modal} toggle={toggle} size="lg" className="results-mnodal">
        <ModalHeader toggle={toggle}>{results.step}</ModalHeader>
        <ModalBody>
          <ResultsCarousel {...results}/>
        </ModalBody>
        <ModalFooter>
          <Button onClick={toggle} color="danger">Close</Button>
        </ModalFooter>
      </Modal>
    </div>

  )
};
