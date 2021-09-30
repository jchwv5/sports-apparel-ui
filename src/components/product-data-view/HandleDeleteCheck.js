/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DeleteDialog from './DeleteDialog';
import fetchPurchaseInfo from './DeleteDialogService';
import deleteProductById from './DeleteProductService';
import styles from '../product-page/ProductPage.module.css';

/**
 * Checks the row that's being rendered to see if the product in that row has any reviews. If
 * it does not, it renders a delete button and when pressed it does one of two things.
 * 1) If there ARE purchases for that product in the database, it pops up a modal and tells you
 * that there are purchases and asks if you would like to set the product to inactive instead.
 * 2) If there are not purchases for that product, it deletes the product from the database.
 *
 * @param {*} cellInfo - The information for the row that is being checked to see if the
 * product has reviews/purchases
 * @returns
 */

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
