/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { TableCell, TableContainer, TableHead } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import { makeStyles } from '@material-ui/core/styles';
import Collapsible from 'react-collapsible';
import { useLocation } from 'react-router-dom';
import Moment from 'moment';
import styles from '../product-page/ProductPage.module.css';
import Constants from '../../utils/constants';
import fetchPurchase from './PurchasesHistoryPageService';

const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  container: {
    border: 'solid 1px black',
    color: 'black',
    fontWeight: 'bold',
    maxHeight: 1000,
    textAlign: 'center'
  },
  trigger: {
    cursor: 'pointer'
  },
  products: {
    border: 'solid 1px black',
    background: 'lightblue',
    color: 'black',
    fontSize: 25,
    height: 60,
    maxWidth: '100%',
    cursor: 'pointer',
    textAlign: 'center'
  },
  productData: {
    border: 'solid 1px black',
    boxSizing: 100,
    color: 'black',
    fontSize: 17,
    height: '100%',
    textAlign: 'center',
    width: '100%'
  },
  th: {
    border: 'solid 1px black',
    background: 'lightblue',
    color: 'black',
    fontSize: 20,
    padding: 10,
    textAlign: 'center',
    width: '1%'
  },
  td: {
    textAlign: 'center',
    border: 'solid 1px black',
    color: 'black',
    fontSize: 17,
    width: '1%'
  },
  Collapsible__trigger: {
    textAlign: 'center'
  }
});

const PurchaseHistoryPage = () => {
  const classes = useStyles();
  const location = useLocation();
  const { email } = location.state;
  const [apiError, setApiError] = useState(false);
  const [purchases, setPurchase] = useState([]);

  useEffect(() => {
    fetchPurchase(setPurchase, setApiError, email);
  }, [setPurchase, setApiError, email]);
  return (
    <div>
      {apiError && (
        <p className={styles.errMsg} data-testid="errMsg">
          {Constants.API_ERROR}
        </p>
      )}
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <tr>
              <th className={classes.th}>
                Date of Purchase
              </th>
              <th className={classes.th}>
                Total
              </th>
              <th className={classes.th}>
                Product List
              </th>
            </tr>
          </TableHead>
          {purchases.map((purchase) => (
            <tr>
              <td className={classes.td}>
                {Moment(purchase.timeStamp).format('MM/DD/YYYY')}
              </td>
              <td className={classes.td}>
                $
                {purchase.total}
              </td>
              <Collapsible className={classes.products} triggerWhenOpen="Click here to close Products List" trigger="Click here to open Products List">
                <TableHead>
                  <tr>
                    <th className={classes.td}>
                      Product Name
                    </th>
                    <th className={classes.td}>
                      Quantity
                    </th>
                  </tr>
                </TableHead>
                <TableCell className={classes.productData}>
                  {purchase.products.map((product) => (
                    <>
                      {product.product.name}
                      <br />
                    </>
                  ))}
                </TableCell>
                <TableCell className={classes.productData}>
                  {purchase.products.map((product) => (
                    <>
                      {product.quantity}
                      <br />
                    </>
                  ))}
                </TableCell>
              </Collapsible>
            </tr>
          ))}
        </Table>
      </TableContainer>
    </div>
  );
};

export default PurchaseHistoryPage;
