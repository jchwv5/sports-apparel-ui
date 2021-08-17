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
import { display } from '@material-ui/system';

const useStyles = makeStyles((theme) => ({
  // table: {
  //   // width: '100%',
  //   width: 'auto',
  //   tableLayout: 'auto'
  // },
  tableContainer: {
    borderRadius: 15
  },
  tableHeadCell: {
    fontWeight: 'bold',
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark)
  },
  tableBodyCell: {
    align: 'left'
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
              <TableCell className={classes.tableHeadCell}>Product</TableCell>
              <TableCell className={classes.tableHeadCell}>Description</TableCell>
              <TableCell className={classes.tableHeadCell}>Category</TableCell>
              <TableCell className={classes.tableHeadCell}>Demographic</TableCell>
              <TableCell className={classes.tableHeadCell}>Type</TableCell>
              <TableCell className={classes.tableHeadCell}>ReleaseDate</TableCell>
              <TableCell className={classes.tableHeadCell}>PrimaryColorCode</TableCell>
              <TableCell className={classes.tableHeadCell}>SecondaryColorCode</TableCell>
              <TableCell className={classes.tableHeadCell}>StyleNumber</TableCell>
              <TableCell className={classes.tableHeadCell}>GlobalProductCode</TableCell>
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
                <TableCell>{product.name}</TableCell>

                <TableCell className={classes.tableBodyCell}>{product.description}</TableCell>

                <TableCell className={classes.tableBodyCell}>{product.category}</TableCell>
                <TableCell className={classes.tableBodyCell}>{product.demographic}</TableCell>
                <TableCell className={classes.tableBodyCell}>{product.type}</TableCell>
                <TableCell className={classes.tableBodyCell}>{product.releaseDate}</TableCell>
                <TableCell className={classes.tableBodyCell}>{product.primaryColorCode}</TableCell>
                <TableCell className={classes.tableBodyCell}>
                  {product.secondaryColorCode}
                </TableCell>
                <TableCell className={classes.tableBodyCell}>{product.styleNumber}</TableCell>
                <TableCell className={classes.tableBodyCell}>{product.globalProductCode}</TableCell>
                <TableCell className={classes.tableBodyCell}>{product.brand}</TableCell>
                <TableCell className={classes.tableBodyCell}>{product.material}</TableCell>
                <TableCell className={classes.tableBodyCell}>{product.price}</TableCell>
                <TableCell className={classes.tableBodyCell}>{product.quantity}</TableCell>
                <TableCell className={classes.tableBodyCell}>{product.imageSrc}</TableCell>
                <TableCell className={classes.tableBodyCell}>{product.active}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default DataTable;
