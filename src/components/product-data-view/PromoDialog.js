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
import FormHelperText from '@material-ui/core/FormHelperText';
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
  const [type, setType] = useState('');
  const [percentage, setPercentage] = useState('');
  const [flat, setFlat] = useState('');
  const [percentageDisabled, setPercentageDisabled] = useState(false);
  const [flatDisabled, setFlatDisabled] = useState(false);

  const [codeError, setCodeError] = useState(false);
  const [percentageError, setPercentageError] = useState(false);
  const [flatError, setFlatError] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [apiError, setApiError] = useState(false);
  const [helperTextError, setHelperTextError] = useState('');

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
    if (event.target.value === 'Percentage') {
      setFlatDisabled(true);
    }
    if (event.target.value === 'Flat') {
      setPercentageDisabled(true);
    }
  };

  const handlePercentageChange = (event) => {
    setPercentage(event.target.value);
  };

  const handleFlatChange = (event) => {
    setFlat(event.target.value);
  };

  const handleReset = () => {
    setCode('');
    setType('');
    setPercentage('');
    setFlat('');
    setCodeError(false);
    setPercentageError(false);
    setFlatError(false);
    setHelperTextError(false);
    setFlatDisabled(false);
    setPercentageDisabled(false);
  };

  useEffect(() => {
    handleReset();
  }, [handleClose]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (code === '') {
      setCodeError(true);
    }
    if (type === '') {
      setHelperTextError(true);
    }

    if (type === 'Percentage' && percentage === '') {
      setPercentageError(true);
    }

    if (type === 'Flat' && percentage === '') {
      setPercentageError(false);
    }

    if (type === 'Flat' && flat === '') {
      setFlatError(true);
    }

    if (type === 'Percentage' && flat === '') {
      setFlatError(false);
    }

    if ((code && type && percentage) || (code && type && flat)) {
      postPromotions(code, type, percentage, flat, setApiError);
      handleReset();
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
            <FormHelperText error={helperTextError}>Must select a type</FormHelperText>
          </div>
          <div className={classes.field}>
            <TextField
              label="Discount Amount %"
              required
              varian="outlined"
              value={percentage}
              type="number"
              helperText="Must be filled out"
              onChange={handlePercentageChange}
              error={percentageError}
              InputProps={{
                disableUnderline: true
              }}
              disabled={percentageDisabled}
            />
          </div>
          <div className={classes.field}>
            <TextField
              label="Discount Amount $"
              required
              varian="outlined"
              value={flat}
              type="number"
              helperText="Must be filled out"
              onChange={handleFlatChange}
              error={flatError}
              InputProps={{
                disableUnderline: true,
                shrink: true
              }}
              disabled={flatDisabled}
            />
          </div>
          <DialogActions>
            <div className={classes.cancelButton}>
              <Button onClick={handleReset} className={classes.buttonLabel} variant="contained">
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
