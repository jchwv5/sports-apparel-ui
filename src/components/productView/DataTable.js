import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import styles from '../product-page/ProductPage.module.css';
import Constants from '../../utils/constants';
import fetchProducts from '../product-page/ProductPageService';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  table: {
    width: '100%'
  },
  tableContainer: {
    borderRadius: 15,
    margin: '10px 10px'

    // maxWidth: 1500
  },
  tableHeadCell: {
    fontWeight: 'bold',
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark),
    width: '10%'
  },
  tableBodyCell: {
    fontWeight: 'bold',
    // width: '0.8%',
    tableLayout: 'auto'
  }
}));

const DataTable = () => {
  const classes = useStyles();
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
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead className={classes.tableHeadCell}>
            <TableRow>
              {/* <TableCell className={classes.tableHeadCell}>Id</TableCell> */}
              <TableCell className={classes.tableHeadCell}>Product</TableCell>
              <TableCell className={classes.tableHeadCell}>
                Description
              </TableCell>
              <TableCell className={classes.tableHeadCell}>Category</TableCell>
              <TableCell className={classes.tableHeadCell}>
                Demographic
              </TableCell>
              <TableCell className={classes.tableHeadCell}>Type</TableCell>
              <TableCell className={classes.tableHeadCell}>
                ReleaseDate
              </TableCell>
              <TableCell className={classes.tableHeadCell}>
                PrimaryColorCode
              </TableCell>
              <TableCell className={classes.tableHeadCell}>
                SecondaryColorCode
              </TableCell>
              <TableCell className={classes.tableHeadCell}>
                StyleNumber
              </TableCell>
              <TableCell className={classes.tableHeadCell}>
                GlobalProductCode
              </TableCell>
              <TableCell className={classes.tableHeadCell}>Brand</TableCell>
              <TableCell className={classes.tableHeadCell}>Material</TableCell>
              <TableCell className={classes.tableHeadCell}>Price</TableCell>
              <TableCell className={classes.tableHeadCell}>Quantity</TableCell>
              <TableCell className={classes.tableHeadCell}>ImageSrc</TableCell>
              <TableCell className={classes.tableHeadCell}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell align="left">{product.name}</TableCell>
                <TableCell align="left">{product.description}</TableCell>
                <TableCell align="left">{product.category}</TableCell>
                <TableCell align="left">{product.demographic}</TableCell>
                <TableCell align="left">{product.type}</TableCell>
                <TableCell align="left">{product.releaseDate}</TableCell>
                <TableCell align="left">{product.primaryColorCode}</TableCell>
                <TableCell align="left">{product.secondaryColorCode}</TableCell>
                <TableCell align="left">{product.styleNumber}</TableCell>
                <TableCell align="left">{product.globalProductCode}</TableCell>
                <TableCell align="left">{product.brand}</TableCell>
                <TableCell align="left">{product.material}</TableCell>
                <TableCell align="left">{product.price}</TableCell>
                <TableCell align="left">{product.quantity}</TableCell>
                <TableCell align="left">{product.imageSrc}</TableCell>
                <TableCell align="left">{product.active}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default DataTable;
