import React from 'react';
import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Constants from '../../utils/constants';
import MenuItem from '@material-ui/core/MenuItem';
import HttpHelper from '../../utils/HttpHelper';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'white'
  },

  field: {
    width: '400px',
    margin: '20px'
    // display: 'flex'
  },
  li: {
    // float: 'right',
    // clear: 'both'
  }
});

const PromoDialog = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { handleClose, open, setOpen } = props;
  const [id, setId] = useState('1');
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [codeError, setCodeError] = useState(false);

  const handleIdChange = () => {
    setTitle(id++);
  };

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
    if (title === '') {
      setTitleError(true);
    }
    if (code === '') {
      setCodeError(true);
    }
    if (title && code) {
      async function fetchPromotion(setPromotion, setApiError) {
        await HttpHelper(Constants.PRODUCTS_SALE_ENDPOINT, 'POST')
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error(Constants.API_ERROR);
          })
          .then(setPromotion)
          .catch(() => {
            setApiError(true);
          });
      }
    }
  };

  const handleReset = () => {
    setTitle('');
    setCode('');
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a Promo</DialogTitle>
        <form noValidate autoComplete="off">
          <div>
            <TextField
              label="Promotion Title"
              className={classes.field}
              required
              varian="standard"
              value={title}
              helperText="Must be filled out"
              onChange={handleTitleChange}
              error={titleError}
              InputProps={{ disableUnderline: true }}
            />
          </div>
          <div>
            <TextField
              select
              label="Promotion Code"
              className={classes.field}
              required
              value={code}
              helperText="Must be filled out"
              onChange={handleCodeChange}
              error={codeError}>
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'$10'}>$10</MenuItem>
              <MenuItem value={'10%'}>10%</MenuItem>
            </TextField>
          </div>
          <DialogActions>
            <Button onClick={handleReset} color="primary" variant="contained">
              Reset
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
