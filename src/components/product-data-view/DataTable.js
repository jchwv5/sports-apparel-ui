/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import styles from '../product-page/ProductPage.module.css';
import Constants from '../../utils/constants';
import fetchProducts from './DataViewService';
import PromoDialog from './PromoDialog';
import handleDeleteCheck from './HandleDeleteCheck';
import updateProducts from './ProductEditInfoService';
import notify from '../Toast/Toast';

/**
 * @name DataTable
 * @description create a table view of products
 * @return component
 */
const useStyles = makeStyles({
  divButton: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'
  },
  root: {
    '& .table-header': {
      backgroundColor: '#add8e6',
      fontWeight: 'bold',
      fontSize: '20px'
    },
    '& .MuiDataGrid-root .MuiDataGrid-cell': {
      fontSize: '17px'
    }
  },
  button: {
    '& .MuiButton-root': {
      background: '#666666',
      borderRadius: '20px',
      cursor: 'pointer',
      height: '3em',
      marginTop: '2em'
    }
  },
  buttonLabel: {
    '& .MuiButton-label': {
      color: '#EEEEEE',
      fontSize: '100%'
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
    field: 'delete',
    headerName: <DeleteIcon />,
    headerClassName: 'table-header',
    width: 100,
    renderCell:
      handleDeleteCheck
  },
  {
    editable: true,
    field: 'name',
    headerName: 'Product',
    headerClassName: 'table-header',
    width: 300
  },
  {
    editable: true,
    field: 'description',
    headerName: 'Description',
    headerClassName: 'table-header',
    width: 650
  },
  {
    editable: true,
    field: 'category',
    headerName: 'Category',
    headerClassName: 'table-header',
    width: 200
  },
  {
    editable: true,
    field: 'demographic',
    headerName: 'Demographic',
    headerClassName: 'table-header',
    width: 250
  },
  {
    editable: true,
    field: 'type',
    headerName: 'Type',
    headerClassName: 'table-header',
    width: 150
  },
  {
    editable: true,
    field: 'releaseDate',
    headerName: 'ReleaseDate',
    headerClassName: 'table-header',
    width: 250
  },
  {
    editable: true,
    field: 'primaryColorCode',
    headerName: 'PrimaryColorCode',
    headerClassName: 'table-header',
    width: 290
  },
  {
    editable: true,
    field: 'secondaryColorCode',
    headerName: 'SecondaryColorCode',
    headerClassName: 'table-header',
    width: 290
  },
  {
    editable: true,
    field: 'styleNumber',
    headerName: 'StyleNumber',
    headerClassName: 'table-header',
    width: 250
  },
  {
    editable: true,
    field: 'globalProductCode',
    headerName: 'GlobalProductCode',
    headerClassName: 'table-header',
    width: 270
  },
  {
    editable: true,
    field: 'brand',
    headerName: 'Brand',
    headerClassName: 'table-header',
    width: 200
  },
  {
    editable: true,
    field: 'material',
    headerName: 'Material',
    headerClassName: 'table-header',
    width: 200
  },
  {
    editable: true,
    field: 'price',
    type: 'number',
    headerName: 'Price',
    headerClassName: 'table-header',
    width: 150
  },
  {
    editable: true,
    field: 'quantity',
    type: 'number',
    headerName: 'Quantity',
    headerClassName: 'table-header',
    width: 150
  },
  {
    editable: true,
    field: 'imageSrc',
    headerName: 'ImageSrc',
    headerClassName: 'table-header',
    width: 700
  },
  {
    editable: true,
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
  const [open, setOpen] = useState(false);
  const updatedProducts = [];
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    fetchProducts(setProducts, setApiError);
  }, []);

  /**
   * given changed cells save to the product field
   * and the product to a new array to update the product info
   *
   * @param {*} selections - updated cell with product id, field name, and value
   * @returns - nothing if the value is an empty string or null
   */
  const onCellEditCommit = (selections) => {
    if (selections.value === '' || selections.value === null) {
      notify('error', 'Fields can not be left empty');
      return;
    }
    switch (selections.field) {
      case 'name':
        products[selections.id - 1].name = selections.value;
        updatedProducts.push(products[selections.id - 1]);
        break;
      case 'description':
        products[selections.id - 1].description = selections.value;
        updatedProducts.push(products[selections.id - 1]);
        break;
      case 'category':
        products[selections.id - 1].category = selections.value;
        updatedProducts.push(products[selections.id - 1]);
        break;
      case 'demographic':
        products[selections.id - 1].demographic = selections.value;
        updatedProducts.push(products[selections.id - 1]);
        break;
      case 'type':
        products[selections.id - 1].type = selections.value;
        updatedProducts.push(products[selections.id - 1]);
        break;
      case 'releaseDate':
        products[selections.id - 1].releaseDate = selections.value;
        updatedProducts.push(products[selections.id - 1]);
        break;
      case 'primaryColorCode':
        products[selections.id - 1].primaryColorCode = selections.value;
        updatedProducts.push(products[selections.id - 1]);
        break;
      case 'secondaryColorCode':
        products[selections.id - 1].secondaryColorCode = selections.value;
        updatedProducts.push(products[selections.id - 1]);
        break;
      case 'styleNumber':
        products[selections.id - 1].styleNumber = selections.value;
        updatedProducts.push(products[selections.id - 1]);
        break;
      case 'globalProductCode':
        products[selections.id - 1].GlobalProductCode = selections.value;
        updatedProducts.push(products[selections.id - 1]);
        break;
      case 'brand':
        products[selections.id - 1].brand = selections.value;
        updatedProducts.push(products[selections.id - 1]);
        break;
      case 'material':
        products[selections.id - 1].material = selections.value;
        updatedProducts.push(products[selections.id - 1]);
        break;
      case 'price':
        products[selections.id - 1].price = selections.value;
        updatedProducts.push(products[selections.id - 1]);
        break;
      case 'quantity':
        products[selections.id - 1].quantity = selections.value;
        updatedProducts.push(products[selections.id - 1]);
        break;
      case 'imageSrc':
        products[selections.id - 1].imageSrc = selections.value;
        updatedProducts.push(products[selections.id - 1]);
        break;
      case 'active':
        products[selections.id - 1].active = selections.value;
        updatedProducts.push(products[selections.id - 1]);
        break;
      default:
    }
  };

  /**
   * calls the update products
   */
  const handleSubmit = () => {
    updateProducts(updatedProducts, setApiError);
    notify('success', 'Update was Successful');
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
        className={classes.root}
      >
        <DataGrid
          rows={products}
          columns={columns}
          editMode="row"
          onCellEditCommit={onCellEditCommit}
          rowsPerPageOptions={[20]}
        />
      </div>
      <div className={classes.divButton}>
        <ButtonGroup className={classes.button}>
          <Button href="/maintenance/create" variant="contained" className={classes.buttonLabel}>
            Create
          </Button>
          <Button
            className={classes.buttonLabel}
            style={{ marginLeft: '100px' }}
            variant="contained"
            onClick={handleClickOpen}
          >
            Create Promo
          </Button>
          <Button
            className={classes.buttonLabel}
            style={{ marginLeft: '100px' }}
            variant="contained"
            onClick={handleSubmit}
          >
            Update
          </Button>
        </ButtonGroup>
        <PromoDialog open={open} handleClose={handleClose} />

      </div>
    </div>
  );
};
export default DataTable;
