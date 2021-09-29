/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DeleteDialog from './DeleteDialog';
import fetchPurchaseInfo from './DeleteDialogService';
import deleteProductById from './DeleteProductService';
import styles from '../product-page/ProductPage.module.css';

const HandleDeleteCheck = (cellInfo) => {
  const [open, setOpen] = useState(false);
  const [purchases, setPurchases] = useState([]);
  const [apiError, setApiError] = useState([]);
  const product = cellInfo.row;

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    fetchPurchaseInfo(setPurchases, setApiError, cellInfo.row.id);
  }, [cellInfo.row.id]);

  if (cellInfo !== undefined) {
    if (cellInfo.row.reviews.length === 0) {
      return (
        <div className={styles.delete}>
          {apiError}
          <ButtonGroup className={styles.buttons}>
            <Button
              className={styles.deleteButton}
              variant="contained"
              onClick={() => {
                if (purchases.length > 0) {
                  handleClickOpen();
                } else if (purchases.length === 0) {
                  deleteProductById(setApiError, cellInfo.row.id);
                }
              }}
            >
              <DeleteIcon />
            </Button>
          </ButtonGroup>
          <DeleteDialog open={open} handleClose={handleClose} product={product} />
        </div>
      );
    }
  } return '';
};

export default HandleDeleteCheck;
