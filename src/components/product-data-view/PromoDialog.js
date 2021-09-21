import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Radio, RadioGroup } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import postPromotions from './PromoDialogService';

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
  field: {
    width: '400px',
    height: '500x',
    margin: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: '20px',
    color: theme.palette.grey[1000]
  },
  amountLabel: {
    '& .MuiFormLabel-root': {
      fontSize: '16px'
    }
  },
  submitButton: {
    '& .MuiButton-root': {
      background: '#666666',
      borderRadius: '20px',
      cursor: 'pointer',
      height: '3em',
      marginTop: '1em'
    }
  },
  cancelButton: {
    '& .MuiButton-root': {
      background: '#f50057',
      borderRadius: '20px',
      cursor: 'pointer',
      height: '3em',
      marginTop: '1em'

    }
  },
  buttonLabel: {
    '& .MuiButton-label': {
      color: '#EEEEEE'
    }
  }
}));

const PromoDialog = ({ open, handleClose }) => {
  const classes = useStyles();
  const [code, setCode] = useState('');
  const [type, setType] = useState('Percentage');
  const [amountLabel, setAmountLabel] = useState('Discount Amount %');
  const [amount, setAmount] = useState('');
  const [codeError, setCodeError] = useState(false);
  const [amountError, setAmountError] = useState(false);

  //  eslint-disable-next-line no-unused-vars
  const [apiError, setApiError] = useState(false);

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
    setAmount('');
    if (event.target.value === 'Percentage') {
      setAmountLabel('Discount Amount %');
    } if (event.target.value === 'Flat') {
      setAmountLabel('Flat Dollar Amount');
    }
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleCancel = () => {
    setCode('');
    setType('Percentage');
    setAmountLabel('Discount Amount %');
    setCodeError(false);
    setAmount('');
    setAmountError(false);
  };

  useEffect(() => {
    handleCancel();
  }, [handleClose]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (code === '') {
      setCodeError(true);
    }
    if ((type === 'Percentage' && amount === '') || (type === 'Flat' && amount === '')) {
      setAmountError(true);
    }
    if (code && type && amount) {
      postPromotions(code, type, amount, setApiError);
      handleCancel();
      handleClose();
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} className={classes.root}>
        <DialogTitle>Create a Promo</DialogTitle>
        <div>
          <IconButton onClick={handleClose} className={classes.closeButton}>
            <CloseIcon />
          </IconButton>
        </div>
        <form noValidate autoComplete="off">
          <div className={classes.field}>
            <TextField
              label="Promotion Code"
              required
              varian="outlined"
              value={code}
              helperText="Must be filled out"
              onChange={handleCodeChange}
              error={codeError}
              InputProps={{ disableUnderline: true }}
            />
          </div>
          <div className={classes.field}>
            <FormLabel>Discount Type</FormLabel>
            <RadioGroup name="discount type" value={type} onChange={handleTypeChange}>
              <FormControlLabel value="Percentage" control={<Radio />} label="Percentage" />
              <FormControlLabel value="Flat" control={<Radio />} label="Flat Dollar Amount" />
            </RadioGroup>
          </div>
          <div className={classes.field}>
            <TextField
              label={amountLabel}
              required
              varian="outlined"
              value={amount}
              type="number"
              helperText="Must be filled out"
              onChange={handleAmountChange}
              error={amountError}
              InputProps={{
                disableUnderline: true
              }}
            />
          </div>
          <DialogActions>
            <div className={classes.cancelButton}>
              <Button onClick={handleCancel} className={classes.buttonLabel} variant="contained">
                Cancel
              </Button>
            </div>
            <div className={classes.submitButton}>
              <Button onClick={handleSubmit} className={classes.buttonLabel} variant="contained">
                Submit
              </Button>
            </div>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default PromoDialog;
