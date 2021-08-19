import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
<<<<<<< HEAD
import { DataGrid } from '@material-ui/data-grid';
import styles from '../product-page/ProductPage.module.css';
import Constants from '../../utils/constants';
=======
import styles from '../product-page/ProductPage.module.css';
import Constants from '../../utils/constants';

import { DataGrid } from '@material-ui/data-grid';
>>>>>>> sprint2
import fetchProducts from './DataViewService';

const useStyles = makeStyles({
  root: {
    '& .table-header': {
      backgroundColor: '#add8e6',
      fontWeight: 'bold'
    }
  }
});

const columns = [
<<<<<<< HEAD
  {
    field: 'id', headerName: 'ID', headerClassName: 'table-header', hide: true
  },
  {
    field: 'name', headerName: 'Product', headerClassName: 'table-header', width: 345
  },
=======
  { field: 'id', headerName: 'ID', headerClassName: 'table-header', hide: true },
  { field: 'name', headerName: 'Product', headerClassName: 'table-header', width: 345 },
>>>>>>> sprint2
  {
    field: 'description',
    headerName: 'Description',
    headerClassName: 'table-header',
    width: 650
  },
  {
    field: 'category',
    headerName: 'Category',
    headerClassName: 'table-header',
    width: 200
  },
  {
    field: 'demographic',
    headerName: 'Demographic',
    headerClassName: 'table-header',
    width: 200
  },
<<<<<<< HEAD
  {
    field: 'type', headerName: 'Type', headerClassName: 'table-header', width: 150
  },
=======
  { field: 'type', headerName: 'Type', headerClassName: 'table-header', width: 150 },
>>>>>>> sprint2
  {
    field: 'releaseDate',
    headerName: 'ReleaseDate',
    headerClassName: 'table-header',
    width: 200
  },
  {
    field: 'primaryColorCode',
    headerName: 'PrimaryColorCode',
    headerClassName: 'table-header',
    width: 250
  },
  {
    field: 'secondaryColorCode',
    headerName: 'SecondaryColorCode',
    headerClassName: 'table-header',
    width: 280
  },
  {
    field: 'styleNumber',
    headerName: 'StyleNumber',
    headerClassName: 'table-header',
    width: 300
  },
  {
    field: 'globalProductCode',
    headerName: 'GlobalProductCode',
    headerClassName: 'table-header',
    width: 250
  },
  { field: 'brand', headerName: 'Brand', headerClassName: 'table-header', width: 200 },
  {
    field: 'material',
    headerName: 'Material',
    headerClassName: 'table-header',
    width: 200
  },
  {
    field: 'price',
    type: 'number',
    headerName: 'Price',
    headerClassName: 'table-header',
    width: 200
  },
  {
    field: 'quantity',
    type: 'number',
    headerName: 'Quantity',
    headerClassName: 'table-header',
    width: 200
  },
  {
    field: 'imageSrc',
    headerName: 'ImageSrc',
    headerClassName: 'table-header',
    width: 200
  },
  {
    field: 'active',
    headerName: 'Status',
    headerClassName: 'table-header',
    width: 200
  }
];

const DataTable = () => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    fetchProducts(setProducts, setApiError);
  }, []);

  return (
    <div style={{ display: 'flex', height: 800, width: '100%' }} className={classes.root}>
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
