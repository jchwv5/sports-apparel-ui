import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useCart } from './CartContext';
// import { styles } from './OrderItem.module.css';

const OrderItemModal = (props) => {
  const {
    title, onClose, open
  } = props;
  const { dispatch } = useCart();
  const onDelete = () => {
    dispatch({
      type: 'delete',
      product: {
        title
      }
    });
  };
  const onReset = () => {
    dispatch({
      type: 'reset',
      product: {
        title
      }
    });
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You have set the quantity to zero.
            <br />
            Are you sure you want to remove this item from the cart?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            onReset();
            onClose();
          }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              onDelete();
              onClose();
            }}
            autoFocus
          >
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default OrderItemModal;
