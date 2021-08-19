import React from 'react';
import Modal from './Modal';
import ModalBody from './ModalBody';
import ModalHeader from './ModalHeader';
import ModalFooter from './ModalFooter';
/* eslint-disable react/destructuring-assignment */
export default function ProductModal(props) {
  return (
    <Modal data-toggle="modal">
      <ModalHeader>
        <button data-dismiss="modal" type="button">X</button>
      </ModalHeader>
      <ModalBody>
        <p>{props.children}</p>
      </ModalBody>
      <ModalFooter>
        <button type="button">Add to Cart</button>
      </ModalFooter>
    </Modal>
  );
}
