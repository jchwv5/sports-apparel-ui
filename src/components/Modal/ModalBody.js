import React from 'react';
/* eslint-disable react/destructuring-assignment */

export default function ModalBody(props) {
  return (
    <div className="modal-body">
      { props.children }
    </div>
  );
}
