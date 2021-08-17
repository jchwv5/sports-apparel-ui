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
import { DataGrid } from '@material-ui/data-grid';

// const useStyles = makeStyles((theme) => ({
//   // table: {
//   //   // width: '100%',
//   //   width: 'auto',
//   //   tableLayout: 'auto'
//   // },
//   tableContainer: {
//     borderRadius: 15
//   },
//   tableHeadCell: {
//     fontWeight: 'bold',
//     backgroundColor: theme.palette.primary.dark,
//     color: theme.palette.getContrastText(theme.palette.primary.dark)
//   },
//   tableBodyCell: {
//     align: 'left'
//   }
// }));

const useStyles = makeStyles((theme) => ({
  root: {
    '& .super-app-theme--header': {
      backgroundColor: '#add8e6',
      fontWeight: 'bold'
    }
    // color: theme.palette.type === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.85)'
  }
}));

const columns = [
  { field: 'id', headerName: 'ID', headerClassName: 'super-app-theme--header', hide: true },
  { field: 'name', headerName: 'Product', headerClassName: 'super-app-theme--header', width: 300 },
  {
    field: 'description',
    headerName: 'Description',
    headerClassName: 'super-app-theme--header',
    width: 300
  },
  {
    field: 'category',
    headerName: 'Category',
    headerClassName: 'super-app-theme--header',
    width: 200
  },
  {
    field: 'demographic',
    headerName: 'Demographic',
    headerClassName: 'super-app-theme--header',
    width: 200
  },
  { field: 'type', headerName: 'Type', headerClassName: 'super-app-theme--header', width: 150 },
  {
    field: 'releaseDate',
    headerName: 'ReleaseDate',
    headerClassName: 'super-app-theme--header',
    width: 200
  },
  {
    field: 'primaryColorCode',
    headerName: 'PrimaryColorCode',
    headerClassName: 'super-app-theme--header',
    width: 250
  },
  {
    field: 'secondaryColorCode',
    headerName: 'SecondaryColorCode',
    headerClassName: 'super-app-theme--header',
    width: 280
  },
  {
    field: 'styleNumber',
    headerName: 'StyleNumber',
    headerClassName: 'super-app-theme--header',
    width: 300
  },
  {
    field: 'globalProductCode',
    headerName: 'GlobalProductCode',
    headerClassName: 'super-app-theme--header',
    width: 250
  },
  { field: 'brand', headerName: 'Brand', headerClassName: 'super-app-theme--header', width: 200 },
  {
    field: 'material',
    headerName: 'Material',
    headerClassName: 'super-app-theme--header',
    width: 200
  },
  {
    field: 'price',
    type: 'number',
    headerName: 'Price',
    headerClassName: 'super-app-theme--header',
    width: 200
  },
  {
    field: 'quantity',
    type: 'number',
    headerName: 'Quantity',
    headerClassName: 'super-app-theme--header',
    width: 200
  },
  {
    field: 'imageSrc',
    headerName: 'ImageSrc',
    headerClassName: 'super-app-theme--header',
    width: 200
  },
  { field: 'status', headerName: 'Status', headerClassName: 'super-app-theme--header', width: 200 }
];
const DataTable = () => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    fetchProducts(setProducts, setApiError);
  }, []);

  return (
    <div style={{ display: 'flex', height: 850, width: '100%' }} className={classes.root}>
      {apiError && (
        <p className={styles.errMsg} data-testid="errMsg">
          {Constants.API_ERROR}
        </p>
      )}
      <div style={{ flexGrow: 1 }}>
        <DataGrid rows={products} columns={columns} rowsPerPageOptions={[20]} />
      </div>
      {/* <TableContainer component={Paper} className={classes.tableContainer}>
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
      </TableContainer> */}
    </div>
  );
};
export default DataTable;
