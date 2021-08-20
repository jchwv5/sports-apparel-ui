import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
// import { Link } from 'react-router-dom';
import styles from '../product-page/ProductPage.module.css';
import Constants from '../../utils/constants';
import fetchProducts from './DataViewService';

const useStyles = makeStyles({
  root: {
    '& .table-header': {
      backgroundColor: '#add8e6',
      fontWeight: 'bold',
      fontSize: '20px'
      // padding: '1000px'
    },
    '& .MuiDataGrid-root .MuiDataGrid-cell': {
      fontSize: '17px'
    }
  },
  button: {
    position: 'relative',
    bottom: '10px'
  }
});

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    headerClassName: 'table-header',
    hide: true
  },
  {
    field: 'name',
    headerName: 'Product',
    headerClassName: 'table-header',
    width: 300
  },
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
    width: 250
  },
  {
    field: 'type',
    headerName: 'Type',
    headerClassName: 'table-header',
    width: 150
  },
  {
    field: 'releaseDate',
    headerName: 'ReleaseDate',
    headerClassName: 'table-header',
    width: 250
  },
  {
    field: 'primaryColorCode',
    headerName: 'PrimaryColorCode',
    headerClassName: 'table-header',
    width: 290
  },
  {
    field: 'secondaryColorCode',
    headerName: 'SecondaryColorCode',
    headerClassName: 'table-header',
    width: 290
  },
  {
    field: 'styleNumber',
    headerName: 'StyleNumber',
    headerClassName: 'table-header',
    width: 250
  },
  {
    field: 'globalProductCode',
    headerName: 'GlobalProductCode',
    headerClassName: 'table-header',
    width: 270
  },
  {
    field: 'brand',
    headerName: 'Brand',
    headerClassName: 'table-header',
    width: 200
  },
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
    width: 150
  },
  {
    field: 'quantity',
    type: 'number',
    headerName: 'Quantity',
    headerClassName: 'table-header',
    width: 150
  },
  {
    field: 'imageSrc',
    headerName: 'ImageSrc',
    headerClassName: 'table-header',
    width: 700
  },
  {
    field: 'active',
    headerName: 'Status',
    headerClassName: 'table-header',
    width: 150
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
    <div style={{ display: 'flex', height: 700, width: '100%' }} className={classes.root}>
      {apiError && (
        <p className={styles.errMsg} data-testid="errMsg">
          {Constants.API_ERROR}
        </p>
      )}
      <div style={{ flexGrow: 1 }}>
        <DataGrid rows={products} columns={columns} rowsPerPageOptions={[20]} />
      </div>
      <div className={classes.button}>
        <Button component="Link" to="/maintenace/create" color="primary">
          Create
        </Button>
      </div>
    </div>
  );
};
export default DataTable;
