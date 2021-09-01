import React from 'react';
import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl } from '@material-ui/core';
import { Radio } from '@material-ui/core';
import postPromotions from './PromoDialogService';
import { RadioGroup } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import FormHelperText from '@material-ui/core/FormHelperText';

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
  button: {
    position: 'absolute',
    right: theme.spacing(1),
    top: '20px',
    color: theme.palette.grey[500]
  },
  amountLabel: {
    '& .MuiFormLabel-root': {
      fontSize: '16px'
    }
  }
}));

const PromoDialog = ({ open, handleClose }) => {
  const classes = useStyles();
  const [code, setCode] = useState('');
  const [type, setType] = useState('');
  const [percentage, setPercentage] = useState('');
  const [flat, setFlat] = useState('');

  const [percentIsVisible, setPercentIsVisible] = useState(false);
  const [flatIsVisible, setFlatIsVisible] = useState(false);
  const [codeError, setCodeError] = useState(false);
  const [typeError, setTypeError] = useState(false);
  const [percentageError, setPercentageError] = useState(false);
  const [flatError, setFlatError] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [helperText, setHelperText] = useState('Must select a type!');

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
    if (event.target.value === 'Percentage') {
      setFlatIsVisible(false);
      setPercentIsVisible(true);
    } else {
      setPercentIsVisible(false);
      setFlatIsVisible(true);
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
    setPercentIsVisible(false);
    setFlatIsVisible(false);
  };

  const handleSubmit = (event) => {
    handleReset();
    event.preventDefault();
    setCodeError(false);
    setTypeError(false);
    setPercentageError(false);
    setFlatError(false);
    if ((code && type && percentage) || (code && type && flat)) {
      postPromotions(code, type, percentage, flat, setApiError);
      handleClose();
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} className={classes.root}>
        <DialogTitle>Create a Promo</DialogTitle>
        <div>
          <IconButton onClick={handleClose} className={classes.button}>
            <CloseIcon />
          </IconButton>
        </div>
        <form noValidate autoComplete="off">
          <FormControl>
            <div className={classes.field}>
              <TextField
                label="Promotion Code"
                required
                varian="standard"
                value={code}
                helperText="Must be filled out"
                onChange={handleCodeChange}
                error={codeError}
                InputProps={{ disableUnderline: true }}
              />
            </div>
            <div className={classes.field}>
              <FormLabel>Discount Type</FormLabel>
              <RadioGroup
                name="discount type"
                value={type}
                onChange={handleTypeChange}
                error={typeError}>
                <FormControlLabel value="Percentage" control={<Radio />} label="Percentage" />
                <FormControlLabel value="Flat" control={<Radio />} label="Flat Dollar Amount" />
              </RadioGroup>
              <FormHelperText>{helperText}</FormHelperText>
            </div>
            {percentIsVisible && (
              <div className={classes.field}>
                <TextField
                  label="Discount Amount %"
                  required
                  varian="standard"
                  value={percentage}
                  type="number"
                  helperText="Must be filled out"
                  onChange={handlePercentageChange}
                  error={percentageError}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    disableUnderline: true
                  }}
                />
              </div>
            )}
            {flatIsVisible && (
              <div className={classes.field}>
                <TextField
                  label="Discount Amount $"
                  required
                  varian="standard"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    disableUnderline: true
                  }}
                  value={flat}
                  type="number"
                  helperText="Must be filled out"
                  onChange={handleFlatChange}
                  error={flatError}
                />
              </div>
            )}
            <DialogActions>
              <Button onClick={handleReset} color="primary" variant="contained">
                Reset
              </Button>
              <Button onClick={handleSubmit} color="primary" variant="contained">
                Submit
              </Button>
            </DialogActions>
          </FormControl>
        </form>
      </Dialog>
    </div>
  );
};

export default PromoDialog;
