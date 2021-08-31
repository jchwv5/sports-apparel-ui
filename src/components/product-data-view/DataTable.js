import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import styles from '../product-page/ProductPage.module.css';
import Constants from '../../utils/constants';
import fetchProducts from './DataViewService';
import PromoDialog from './PromoDialog';

const useStyles = makeStyles({
  root: {
    '& .table-header': {
      backgroundColor: '#add8e6',
      fontWeight: 'bold',
      fontSize: '20px'
    },
    '& .MuiDataGrid-root .MuiDataGrid-cell': {
      fontSize: '17px'
    },

    '& .MuiButton-root': {
      position: 'absolute',
      diplay: 'inline-block',
      bottom: '0.25px',
      left: '60%'
    }
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

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      {apiError && (
        <p className={styles.errMsg} data-testid="errMsg">
          {Constants.API_ERROR}
        </p>
      )}
      <div
        style={{
          flexGrow: 1,
          display: 'flex',
          height: 700,
          width: '100%'
        }}
        className={classes.root}>
        <DataGrid rows={products} columns={columns} rowsPerPageOptions={[20]} />
      </div>
      <div className={classes.root}>
        <Button href="/maintenance/create" color="primary" variant="contained">
          Create
        </Button>
        <Button
          style={{ marginLeft: '130px' }}
          color="primary"
          variant="contained"
          onClick={handleClickOpen}>
          Create Promo
        </Button>
        <PromoDialog open={open} handleClose={handleClose} />
      </div>
    </div>
  );
};
export default DataTable;
