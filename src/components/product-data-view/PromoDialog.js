import React from 'react';
import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  underline: {
    '&&&:before': {
      borderBottom: 'none'
    },
    '&&:after': {
      borderBottom: 'none'
    }
  },
  field: {
    width: '400px',
    margin: '20px'
  }
});

const PromoDialog = (props) => {
  const classes = useStyles();
  const { handleClose, open } = props;
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [codeError, setCodeError] = useState(false);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTitleError(false);
    setCodeError(false);
    if (title == '') {
      setTitleError(true);
    }
    if (code == '') {
      setCodeError(true);
    }
    if (title & code) {
      console.log('you');
    }
  };

  const handleCancel = () => {
    console.log('call');
    debugger;
    setTitle('00');
    setCode('');
    // setOpen(false)
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="promo-dialog-title">Create a Promo</DialogTitle>
        <form noValidate autoComplete="off">
          <div>
            <TextField
              label="Promotion Title"
              // disableUnderline="true"
              className={classes.field}
              required
              varian="standard"
              helperText="Must be filled out"
              onChange={handleTitleChange}
              error={titleError}
            />
          </div>
          <div>
            <TextField
              label="Promotion Code"
              // disableUnderline="true"
              className={classes.field}
              required
              varian="standard"
              helperText="Must be filled out"
              onChange={handleCodeChange}
              error={codeError}
            />
          </div>

          <DialogActions>
            <Button onClick={handleCancel} color="primary" variant="contained">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary" variant="contained">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default PromoDialog;
