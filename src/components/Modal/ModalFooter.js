import React from 'react';
/* eslint-disable react/destructuring-assignment */

export default function ModalFooter(props) {
  return (
    <div className="modal-footer">
      { props.children }
    </div>
  );
}
