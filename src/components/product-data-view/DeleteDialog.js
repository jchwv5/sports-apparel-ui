import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import notify from '../Toast/Toast';
import updateProducts from './ProductEditInfoService';

/**
 * @name PromoDialog
 * @description create a dialog for entering promotion disoucnt
 * @return component
 */
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiPaper-root': {
      backgroundColor: '#F8F8FF',
      display: 'flex',
      flexWrap: 'wrap'
    }
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(0),
    top: '5px',
    color: theme.palette.grey[1000]
  },
  submitButton: {
    '& .MuiButton-root': {
      background: '#666666',
      borderRadius: '20px',
      cursor: 'pointer',
      height: '3em',
      marginBottom: '10px'
    }
  },
  cancelButton: {
    '& .MuiButton-root': {
      background: '#f50057',
      borderRadius: '20px',
      cursor: 'pointer',
      height: '3em',
      marginBottom: '10px'
    }
  },
  info: {
    paddingLeft: '.8em',
    paddingRight: '.6em',
    height: '5em',
    width: '25em',
    fontSize: '16px'
  },
  buttonLabel: {
    '& .MuiButton-label': {
      color: '#EEEEEE'
    }
  }
}));

const DeleteDialog = ({ open, handleClose, product }) => {
  const classes = useStyles();
  const updatedProduct = [];

  //  eslint-disable-next-line no-unused-vars
  const [apiError, setApiError] = useState(false);

  const handleCancel = () => {
    handleClose();
  };

  const handleSetInactive = () => {
    updatedProduct.push({
      id: product.id,
      description: product.description,
      category: product.category,
      demographic: product.demographic,
      type: product.type,
      releaseDate: product.releaseDate,
      primaryColorCode: product.primaryColorCode,
      secondaryColorCode: product.secondaryColorCode,
      styleNumber: product.styleNumber,
      globalProductCode: product.globalProductCode,
      brand: product.brand,
      material: product.material,
      price: product.price,
      quantity: product.quantity,
      imageSrc: product.imageSrc,
      name: product.name,
      active: false
    });
    notify('success', 'Product successfully updated');
    updateProducts(updatedProduct, setApiError);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSetInactive();
    handleCancel();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} className={classes.root}>
        <DialogTitle>
          Delete Product
        </DialogTitle>
        <div>
          <IconButton onClick={handleClose} className={classes.closeButton}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className={classes.info}>
          This product currently has purchases in the database, would you like to mark it
          as inactive instead?
        </div>
        <DialogActions>
          <div className={classes.cancelButton}>
            <Button onClick={handleCancel} className={classes.buttonLabel} variant="contained">
              No
            </Button>
          </div>
          <div className={classes.submitButton}>
            <Button onClick={handleSubmit} className={classes.buttonLabel} variant="contained">
              Yes
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteDialog;
