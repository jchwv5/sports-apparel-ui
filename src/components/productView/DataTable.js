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

const useStyles = makeStyles((theme) => ({
  root: {
    '& .super-app-theme--header': {
      backgroundColor: '#add8e6',
      fontWeight: 'bold'
    }
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
    </div>
  );
};
export default DataTable;
