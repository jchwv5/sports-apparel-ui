import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import ProductPage from '../product-page/ProductPage';
// import ProductPageService from '../product-page/ProductPageService';
import styles from '../product-page/ProductPage.module.css';
import Constants from '../../utils/constants';
import fetchProducts from '../product-page/ProductPageService';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650
  },
  tableContainer: {
    borderRadius: 15,
    margin: '10px 10px',
    maxWidth: 950
  },
  tableHeadCell: {
    fontWeight: 'bold',
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark)
  }
}));

const DataTable = () => {
  const [products, setProducts] = useState([]);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    fetchProducts(setProducts, setApiError);
  }, []);

  return (
    <div>
      {apiError && (
        <p className={styles.errMsg} data-testid="errMsg">
          {Constants.API_ERROR}
        </p>
      )}
      <TableContainer component={Paper} className={useStyles.tableContainer}>
        <Table className={useStyles.table} aria-label="simple table">
          <TableHead className={useStyles.tableHeadCell}>
            <TableRow>
              <TableCell className={useStyles.tableHeadCell}>Id</TableCell>
              <TableCell className={useStyles.tableHeadCell}>Product</TableCell>
              <TableCell className={useStyles.tableHeadCell}>
                Description
              </TableCell>
              <TableCell className={useStyles.tableHeadCell}>
                Category
              </TableCell>
              <TableCell className={useStyles.tableHeadCell}>Type</TableCell>
              <TableCell className={useStyles.tableHeadCell}>
                ReleaseDate
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell component="th" scope="row">
                  {product.id}
                </TableCell>
                <TableCell align="left">{product.name}</TableCell>
                <TableCell align="right">{product.description}</TableCell>
                <TableCell align="right">{product.category}</TableCell>
                <TableCell align="right">{product.type}</TableCell>
                <TableCell align="right">{product.releaseDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default DataTable;
